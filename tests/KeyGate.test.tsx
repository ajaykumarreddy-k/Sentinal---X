import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import KeyGate from '../components/KeyGate';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
        p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
        button: ({ children, onClick, type, className, disabled }: any) => (
            <button onClick={onClick} type={type} className={className} disabled={disabled}>{children}</button>
        ),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock lucide-react X icon
vi.mock('lucide-react', () => ({
    X: () => <span data-testid="x-icon">X</span>,
}));

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

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
});

// Mock window.location.reload
const reloadMock = vi.fn();
Object.defineProperty(window, 'location', {
    value: { reload: reloadMock },
    writable: true,
});

const PLACEHOLDER_TEXT = 'Enter your Gemini API key (AIza...)';

describe('KeyGate Component - BYOK Feature', () => {
    const mockOnKeyValid = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        localStorageMock.clear();
    });

    it('should render the Bring Your Own Key prompt', () => {
        render(<KeyGate onKeyValid={mockOnKeyValid} />);

        expect(screen.getByText('Sentinel-X Oracle Access')).toBeInTheDocument();
        expect(screen.getByText(/Bring Your Own Google Gemini API Key/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(PLACEHOLDER_TEXT)).toBeInTheDocument();
        expect(screen.getByText('Authorize')).toBeInTheDocument();
    });

    it('should show error for invalid key format (does not start with AIza)', () => {
        render(<KeyGate onKeyValid={mockOnKeyValid} />);

        const input = screen.getByPlaceholderText(PLACEHOLDER_TEXT);
        const form = input.closest('form')!;

        fireEvent.change(input, { target: { value: 'invalid-key-format' } });
        fireEvent.submit(form);

        expect(screen.getByText(/Invalid key format/i)).toBeInTheDocument();
        expect(localStorageMock.setItem).not.toHaveBeenCalled();
        expect(mockOnKeyValid).not.toHaveBeenCalled();
    });

    it('should have a Clear saved key button that removes key from localStorage', () => {
        render(<KeyGate onKeyValid={mockOnKeyValid} />);

        const clearButton = screen.getByText('Clear saved key');
        expect(clearButton).toBeInTheDocument();

        fireEvent.click(clearButton);

        expect(localStorageMock.removeItem).toHaveBeenCalledWith('ORACLE_KEY');
        expect(reloadMock).toHaveBeenCalled();
    });

    it('should show cancel button when onCancel prop is provided', () => {
        const mockOnCancel = vi.fn();
        render(<KeyGate onKeyValid={mockOnKeyValid} onCancel={mockOnCancel} />);

        const cancelIcon = screen.getByTestId('x-icon');
        expect(cancelIcon).toBeInTheDocument();

        // Click the parent button
        fireEvent.click(cancelIcon.parentElement!);
        expect(mockOnCancel).toHaveBeenCalled();
    });

    it('should show API instructions with link to Google AI Studio', () => {
        render(<KeyGate onKeyValid={mockOnKeyValid} />);

        expect(screen.getByText('How to get your API key:')).toBeInTheDocument();
        const link = screen.getByText('Google AI Studio');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://aistudio.google.com/apikey');
    });

    it('should disable authorize button when input is empty', () => {
        render(<KeyGate onKeyValid={mockOnKeyValid} />);

        const submitButton = screen.getByText('Authorize');
        expect(submitButton).toBeDisabled();
    });

    it('should enable authorize button when input has value', () => {
        render(<KeyGate onKeyValid={mockOnKeyValid} />);

        const input = screen.getByPlaceholderText(PLACEHOLDER_TEXT);
        fireEvent.change(input, { target: { value: 'somekey' } });

        const submitButton = screen.getByText('Authorize');
        expect(submitButton).not.toBeDisabled();
    });
});
