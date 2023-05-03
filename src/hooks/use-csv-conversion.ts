import { useEffect, useState } from 'react';
import { convertCSVToJSONString } from '../convert-csv-to-json';

export function useCSVConversion(defaultCsv: string) {
  const [csv, setCsv] = useState(defaultCsv);
  const [jsonString, setJsonString] = useState('');
  const [error, setConversionError] = useState('');

  const handleConversion = () => {
    const conversionResult = convertCSVToJSONString(csv);

    if (conversionResult.isFailure) {
      setJsonString('');
      setConversionError(conversionResult.error!);

      return;
    }

    setJsonString(conversionResult.value);
    setConversionError('');
  };

  const clearCsv = () => {
    setCsv('');
  };

  useEffect(() => {
    handleConversion();
  }, []);

  return {
    jsonString,
    csv,
    error,
    setCsv,
    handleConversion,
    clearCsv,
  };
}
