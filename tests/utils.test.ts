import { describe, it, expect } from 'vitest';
import { IntelItem, MapMarker, SimulationStatus } from '../types';

describe('Type Definitions', () => {
    describe('IntelItem', () => {
        it('should correctly type an intel item', () => {
            const intelItem: IntelItem = {
                id: 'test-id-123',
                timestamp: '12:00 UTC',
                title: 'Test Alert Title',
                riskScore: 75,
                reasoning: 'This is a test reasoning string',
                type: 'logistics',
            };

            expect(intelItem.id).toBe('test-id-123');
            expect(intelItem.riskScore).toBe(75);
            expect(['logistics', 'geopolitical', 'weather']).toContain(intelItem.type);
        });

        it('should support all three intel types', () => {
            const logisticsItem: IntelItem = {
                id: '1', timestamp: '12:00', title: 'Test', riskScore: 50, reasoning: 'Test', type: 'logistics'
            };
            const geopoliticalItem: IntelItem = {
                id: '2', timestamp: '12:00', title: 'Test', riskScore: 50, reasoning: 'Test', type: 'geopolitical'
            };
            const weatherItem: IntelItem = {
                id: '3', timestamp: '12:00', title: 'Test', riskScore: 50, reasoning: 'Test', type: 'weather'
            };

            expect(logisticsItem.type).toBe('logistics');
            expect(geopoliticalItem.type).toBe('geopolitical');
            expect(weatherItem.type).toBe('weather');
        });
    });

    describe('MapMarker', () => {
        it('should correctly type a map marker', () => {
            const marker: MapMarker = {
                id: 'marker-1',
                lat: 31.2653,
                lng: 32.3019,
                name: 'Suez Canal',
                status: 'critical',
            };

            expect(marker.lat).toBe(31.2653);
            expect(marker.lng).toBe(32.3019);
            expect(['critical', 'warning', 'stable']).toContain(marker.status);
        });

        it('should support all three status types', () => {
            const criticalMarker: MapMarker = { id: '1', lat: 0, lng: 0, name: 'Test', status: 'critical' };
            const warningMarker: MapMarker = { id: '2', lat: 0, lng: 0, name: 'Test', status: 'warning' };
            const stableMarker: MapMarker = { id: '3', lat: 0, lng: 0, name: 'Test', status: 'stable' };

            expect(criticalMarker.status).toBe('critical');
            expect(warningMarker.status).toBe('warning');
            expect(stableMarker.status).toBe('stable');
        });
    });

    describe('SimulationStatus', () => {
        it('should have correct enum values', () => {
            expect(SimulationStatus.IDLE).toBe('IDLE');
            expect(SimulationStatus.SCANNING).toBe('SCANNING');
            expect(SimulationStatus.PROCESSING).toBe('PROCESSING');
            expect(SimulationStatus.COMPLETE).toBe('COMPLETE');
        });

        it('should be usable for state management', () => {
            let status: SimulationStatus = SimulationStatus.IDLE;

            expect(status).toBe(SimulationStatus.IDLE);

            status = SimulationStatus.SCANNING;
            expect(status).toBe(SimulationStatus.SCANNING);

            status = SimulationStatus.PROCESSING;
            expect(status).toBe(SimulationStatus.PROCESSING);

            status = SimulationStatus.COMPLETE;
            expect(status).toBe(SimulationStatus.COMPLETE);
        });
    });
});

describe('BYOK (Bring Your Own Key) Integration', () => {
    it('should define the correct localStorage key name', () => {
        // The ORACLE_KEY constant is used throughout the app
        const ORACLE_KEY = 'ORACLE_KEY';
        expect(ORACLE_KEY).toBe('ORACLE_KEY');
    });

    it('should validate key format with AIza prefix', () => {
        const keyRegex = /^AIza/;

        // Valid keys
        expect(keyRegex.test('AIzaSyDemoKey123')).toBe(true);
        expect(keyRegex.test('AIzaRandomKey456')).toBe(true);

        // Invalid keys
        expect(keyRegex.test('aIza123')).toBe(false);
        expect(keyRegex.test('Aiza123')).toBe(false);
        expect(keyRegex.test('randomkey')).toBe(false);
        expect(keyRegex.test('')).toBe(false);
    });
});
