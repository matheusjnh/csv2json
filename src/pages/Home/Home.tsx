import { useEffect, useState } from 'react';

import { Button } from '../../components/Button';
import { Textarea } from '../../components/Textarea';

import './styles.css';

import { convertCSVToJSONString } from '../../convert-csv-to-json';

export function Home() {
  const defaultCsv = `album, year, US_peak_chart_post
  The White Stripes, 1999, -
  De Stijl, 2000, -
  White Blood Cells, 2001, 61
  Elephant, 2003, 6
  Get Behind Me Satan, 2005, 3
  Icky Thump, 2007, 2
  Under Great White Northern Lights, 2010, 11
  Live in Mississippi, 2011, -
  Live at the Gold Dollar, 2012, -
  Nine Miles from the White City, 2013, -`;

  const [csv, setCsv] = useState(defaultCsv);
  const [jsonString, setJsonString] = useState('');

  useEffect(() => {
    setJsonString(convertCSVToJSONString(csv));
  }, []);

  const onConvertClickHandler = () => {
    setJsonString(convertCSVToJSONString(csv));
  };

  const onClearClickHandler = () => {
    setCsv('');
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
