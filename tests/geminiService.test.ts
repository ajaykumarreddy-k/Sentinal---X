import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
        removeItem: vi.fn((key: string) => { delete store[key]; }),
        clear: vi.fn(() => { store = {}; }),
    };
})();

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
});

// Import after mocks are set up
import { fetchLiveIntelligence, analyzeUploadedImage } from '../services/geminiService';

describe('geminiService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorageMock.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('fetchLiveIntelligence', () => {
        it('should return mock data when no API key is set', async () => {
            localStorageMock.getItem.mockReturnValue(null);

            const result = await fetchLiveIntelligence();

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(2);
            expect(result[0]).toHaveProperty('id');
            expect(result[0]).toHaveProperty('title');
            expect(result[0]).toHaveProperty('riskScore');
            expect(result[0]).toHaveProperty('type');
        });

        it('should handle API errors gracefully and return mock data', async () => {
            localStorageMock.getItem.mockReturnValue('AIzaSyTestKey');
            mockFetch.mockRejectedValue(new Error('Network error'));

            const result = await fetchLiveIntelligence();

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(2);
        });

        it('should return mock data on 429 rate limit error', async () => {
            localStorageMock.getItem.mockReturnValue('AIzaSyTestKey');
            mockFetch.mockResolvedValue({
                ok: false,
                status: 429,
                statusText: 'Too Many Requests',
            });

            const result = await fetchLiveIntelligence();

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(2);
        });

        it('should parse valid API response correctly', async () => {
            localStorageMock.getItem.mockReturnValue('AIzaSyTestKey');
            const mockIntelData = [
                {
                    id: 'test-1',
                    timestamp: '12:00 UTC',
                    title: 'Test Alert',
                    riskScore: 75,
                    reasoning: 'Test reasoning',
                    type: 'logistics',
                },
                {
                    id: 'test-2',
                    timestamp: '12:05 UTC',
                    title: 'Test Alert 2',
                    riskScore: 60,
                    reasoning: 'Test reasoning 2',
                    type: 'weather',
                },
            ];

            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => ({
                    candidates: [{
                        content: {
                            parts: [{
                                text: JSON.stringify(mockIntelData),
                            }],
                        },
                    }],
                }),
            });

            const result = await fetchLiveIntelligence();

            expect(result).toEqual(mockIntelData);
        });
    });

    describe('analyzeUploadedImage', () => {
        it('should return cached analysis when no API key is set', async () => {
            localStorageMock.getItem.mockReturnValue(null);

            const result = await analyzeUploadedImage('data:image/jpeg;base64,testdata');

            expect(result).toContain('SIMULATION');
            expect(result).toContain('CONTAINER_ID_8832');
        });

        it('should handle API errors and return error message', async () => {
            localStorageMock.getItem.mockReturnValue('AIzaSyTestKey');
            mockFetch.mockRejectedValue(new Error('API Error'));

            const result = await analyzeUploadedImage('data:image/jpeg;base64,testdata');

            expect(result).toContain('Error analyzing image');
        });

        it('should return cached result on 429 rate limit', async () => {
            localStorageMock.getItem.mockReturnValue('AIzaSyTestKey');
            mockFetch.mockResolvedValue({
                ok: false,
                status: 429,
                statusText: 'Too Many Requests',
            });

            const result = await analyzeUploadedImage('data:image/jpeg;base64,testdata');

            expect(result).toContain('SIMULATION');
        });

        it('should return analysis from successful API call', async () => {
            localStorageMock.getItem.mockReturnValue('AIzaSyTestKey');
            const mockAnalysis = 'CONTAINER_ID_1234 DETECTED. RISK: MEDIUM.';

            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => ({
                    candidates: [{
                        content: {
                            parts: [{
                                text: mockAnalysis,
                            }],
                        },
                    }],
                }),
            });

            const result = await analyzeUploadedImage('data:image/jpeg;base64,testdata');

            expect(result).toBe(mockAnalysis);
        });
    });
});
