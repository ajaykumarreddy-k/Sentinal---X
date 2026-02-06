import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface KeyGateProps {
  onKeyValid: (valid: boolean) => void;
  onCancel?: () => void;
}

const KeyGate: React.FC<KeyGateProps> = ({ onKeyValid, onCancel }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const validateKeyWithAPI = async (key: string): Promise<boolean> => {
    try {
      setIsValidating(true);
      // Quick validation call to Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Say "OK" in one word.' }] }],
          }),
        }
      );

      if (response.ok) {
        return true;
      } else if (response.status === 400 || response.status === 401 || response.status === 403) {
        setError('Invalid API key. Please check your key and try again.');
        return false;
      } else if (response.status === 429) {
        // Quota exceeded but key is valid
        return true;
      } else {
        setError(`API Error: ${response.status}. Please try again.`);
        return false;
      }
    } catch (err) {
      console.error('Key validation error:', err);
      setError('Network error. Please check your connection.');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Basic format check
    const keyRegex = /^AIza/;
    if (!keyRegex.test(apiKey)) {
      setError("Invalid key format. Key must start with 'AIza'.");
      return;
    }

    // Validate with API
    const isValid = await validateKeyWithAPI(apiKey);

    if (isValid) {
      localStorage.setItem('ORACLE_KEY', apiKey);
      setIsSubmitted(true);
      setTimeout(() => onKeyValid(true), 1500);
    }
  };

  const handleClearKey = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('ORACLE_KEY');
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-charcoal flex items-center justify-center font-mono z-50">
      <AnimatePresence>
        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="bg-charcoal border border-oracle-green rounded-lg p-8 shadow-neon w-full max-w-md relative"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Cancel button if onCancel is provided */}
            {onCancel && (
              <button
                onClick={onCancel}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <h1 className="text-2xl text-oracle-green mb-4 text-center">Sentinel-X Oracle Access</h1>
            <p className="text-gray-400 mb-6 text-center text-sm">
              Bring Your Own Google Gemini API Key to activate the Oracle.
            </p>

            {/* Instructions */}
            <div className="mb-6 p-4 bg-slate-900/50 border border-slate-700 rounded-lg text-xs text-slate-400">
              <p className="mb-2">📋 <strong>How to get your API key:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Go to <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">Google AI Studio</a></li>
                <li>Create or select a project</li>
                <li>Click "Create API Key"</li>
                <li>Copy and paste it below</li>
              </ol>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your Gemini API key (AIza...)"
                  disabled={isValidating}
                  className="w-full bg-transparent border-2 border-oracle-green rounded-md p-3 text-oracle-green placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-oracle-green focus:shadow-neon transition-shadow duration-300 disabled:opacity-50"
                />
              </div>
              {error && (
                <p className="text-warning-amber mt-2 text-sm flex items-center gap-2">
                  <span>⚠️</span> {error}
                </p>
              )}
              <motion.button
                whileHover={{ scale: isValidating ? 1 : 1.02 }}
                whileTap={{ scale: isValidating ? 1 : 0.98 }}
                type="submit"
                disabled={isValidating || !apiKey}
                className="w-full mt-6 bg-oracle-green text-charcoal font-bold py-3 rounded-md hover:shadow-neon transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ willChange: 'transform' }}
              >
                {isValidating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin"></span>
                    Validating...
                  </>
                ) : (
                  'Authorize'
                )}
              </motion.button>
            </form>
            <button
              onClick={handleClearKey}
              className="w-full mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Clear saved key
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-oracle-green/20 border-2 border-oracle-green flex items-center justify-center"
            >
              <span className="text-4xl">✓</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl text-oracle-green font-bold"
            >
              System Online
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-slate-500 mt-2 text-sm"
            >
              Initializing Oracle...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KeyGate;
