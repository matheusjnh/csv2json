import { useState } from 'react';

import { Button } from '../../components/Button';
import { Textarea } from '../../components/Textarea';

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

      <div className="l-main">
        <div className="c-io">
          <div className="c-io__upload">
            <label className="c-io__upload__label" htmlFor="csv_input">
              Upload your data saved as CSV
            </label>
            <input
              className="c-io__upload__button"
              type="file"
              name="csv_input"
              id="csv_input"
            />
          </div>

          <div className="c-io__column">
            <Textarea title="CSV" value={csv} setValue={setCsv} />

            <div className="button-flex">
              <div className="button-margin-right">
                <Button
                  text="Convert"
                  color="primary"
                  onClickHandler={onConvertClickHandler}
                />
              </div>

              <div>
                <Button
                  text="Clear"
                  color="warning"
                  onClickHandler={onClearClickHandler}
                />
              </div>
            </div>
          </div>

          <div className="c-io__column">
            <Textarea title="JSON" value={jsonString} />
          </div>
        </div>
      </div>

      <div className="l-footer">
        <div className="l-footer__content">
          <h1>Footer</h1>
        </div>
      </div>
    </div>
  );
}
