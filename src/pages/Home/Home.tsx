import { useState } from 'react';

import { convertCsvToJson, JsonType } from '../../convert-csv-to-json';
import './styles.css';

export function Home() {
  const [json, setJson] = useState<JsonType[]>([]);

  const handleCsvInput = (e: any) => {
    const csvValue = e.target.value;

    const convertedCsv = convertCsvToJson(csvValue);

    setJson(convertedCsv);
  };

  return (
    <div className="l-page">
      <div className="l-header">
        <div className="l-header__content">
          <h1 className="l-header__title">CSV to JSON Converter</h1>
        </div>
      </div>

      <div className="l-content">
        <textarea onChange={handleCsvInput}></textarea>
      </div>

      <div className="l-footer">
        <div className="l-footer__content">
          <h1>Footer</h1>
        </div>
      </div>
    </div>
  );
}
