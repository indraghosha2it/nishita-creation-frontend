'use client';

import { useState, useEffect, useRef } from 'react';
import { Barcode, Scan, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';

const BarcodeInput = ({ value, onChange, onValidate, disabled = false, error = '' }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [isScannerMode, setIsScannerMode] = useState(false);
  const [scannedValue, setScannedValue] = useState('');
  const inputRef = useRef(null);
  const scanTimeoutRef = useRef(null);

  // Handle barcode validation
  const validateBarcode = async (barcodeValue) => {
    if (!barcodeValue || barcodeValue.length < 8) {
      setValidationResult(null);
      return;
    }

    setIsValidating(true);
    try {
      const response = await fetch(`http://localhost:5000/api/barcodes/validate/${barcodeValue}`);
      const data = await response.json();
      
      if (data.success) {
        setValidationResult(data.data);
        if (onValidate) onValidate(data.data);
      }
    } catch (error) {
      console.error('Validation error:', error);
      setValidationResult({ isValid: false, message: 'Network error' });
    } finally {
      setIsValidating(false);
    }
  };

  // Debounced validation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value) {
        validateBarcode(value);
      } else {
        setValidationResult(null);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [value]);

  // Handle scanner input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isScannerMode) return;
      
      // Barcode scanners typically send a rapid sequence of keypresses ending with Enter
      if (e.key === 'Enter') {
        if (scannedValue) {
          onChange({ target: { name: 'barcode', value: scannedValue } });
          setScannedValue('');
          setIsScannerMode(false);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      } else {
        setScannedValue(prev => prev + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isScannerMode, scannedValue, onChange]);

  // Start scanner mode
  const startScannerMode = () => {
    setIsScannerMode(true);
    setScannedValue('');
    toast.info('Scan barcode now...');
    
    // Auto-exit after 10 seconds
    scanTimeoutRef.current = setTimeout(() => {
      if (isScannerMode) {
        setIsScannerMode(false);
        toast.info('Scanner mode timeout');
      }
    }, 10000);
  };

  // Cancel scanner mode
  const cancelScannerMode = () => {
    setIsScannerMode(false);
    setScannedValue('');
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }
  };

  const getValidationIcon = () => {
    if (isValidating) return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
    if (!validationResult) return <Barcode className="w-4 h-4 text-gray-400" />;
    if (validationResult.isValid && validationResult.status === 'available') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (validationResult.isValid && validationResult.status === 'new') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getValidationMessage = () => {
    if (!validationResult) return null;
    if (validationResult.isValid) {
      if (validationResult.status === 'new') {
        return <span className="text-green-600 text-xs">✓ New barcode - will be auto-generated</span>;
      }
      if (validationResult.status === 'available') {
        return <span className="text-green-600 text-xs">✓ Barcode available for assignment</span>;
      }
    }
    return <span className="text-red-600 text-xs">{validationResult.message}</span>;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Barcode <span className="text-gray-400 text-xs">(Optional - 8-13 digits)</span>
      </label>
      
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {getValidationIcon()}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          name="barcode"
          value={value || ''}
          onChange={onChange}
          disabled={disabled || isScannerMode}
          placeholder="Enter barcode number or scan with scanner"
          className={`w-full pl-10 pr-28 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#4A8A90] focus:border-transparent outline-none transition ${
            error ? 'border-red-500' : validationResult?.isValid === false ? 'border-red-500' : 'border-gray-300'
          }`}
          maxLength="13"
        />
        
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          {isScannerMode ? (
            <button
              type="button"
              onClick={cancelScannerMode}
              className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Cancel Scan
            </button>
          ) : (
            <button
              type="button"
              onClick={startScannerMode}
              className="flex items-center gap-1 px-2 py-1 text-xs bg-[#4A8A90] text-white rounded hover:bg-[#3A7A80] transition"
            >
              <Scan className="w-3 h-3" />
              <span className="hidden sm:inline">Scan</span>
            </button>
          )}
        </div>
      </div>
      
      {isScannerMode && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <Scan className="w-4 h-4 text-blue-500 animate-pulse" />
            <span className="text-sm text-blue-700">Scanner mode active - Scan barcode now</span>
          </div>
          <p className="text-xs text-blue-600 mt-1">
            Scanning: {scannedValue || 'waiting for barcode...'}
          </p>
        </div>
      )}
      
      {getValidationMessage()}
      
      {error && !validationResult?.isValid === false && (
        <p className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
      
      <p className="text-xs text-gray-500">
        You can either:
        <br />• Enter a barcode from pre-generated list
        <br />• Scan a barcode using a barcode scanner
        <br />• Leave empty - no barcode will be assigned
        <br />• Enter a new number - it will be auto-created
      </p>
    </div>
  );
};

export default BarcodeInput;