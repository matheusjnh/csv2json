import { CSVConversionResult } from './convert-csv-to-json-result';
import { JsonType } from './convert-csv-to-json-type';

function convertCSVToArray(csv: string): string[][] {
  const csvRegex = new RegExp(
    '(,|^|\r|\r?\n) *(?:"([^"]*(?:""[^"]*)*)"|([^",\r\n]+))',
    'gi'
  );

  const dataArr: string[][] = [[]];

  let match = null;
  while ((match = csvRegex.exec(csv))) {
    const [, delimiter, quotedValue, nonQuotedValue] = match;

    if (delimiter !== '' && delimiter !== ',') {
      dataArr.push([]);
    }

    let fieldValue = nonQuotedValue?.trim();

    if (quotedValue) {
      const doubleQuotesFinder = new RegExp('""', 'g');
      fieldValue = quotedValue.replace(doubleQuotesFinder, `\"`);
    }

    dataArr[dataArr.length - 1].push(fieldValue);
  }

  return dataArr;
}

function validateEmptyCSVInput(csv: string) {
  return !!csv.trim();
}

export function convertCSVToJSON(csv: string): CSVConversionResult<JsonType[]> {
  if (!validateEmptyCSVInput(csv)) {
    return CSVConversionResult.fail('CSV input is empty.');
  }

  const dataArr = convertCSVToArray(csv);
  const json: JsonType[] = [];
  const [fieldNames] = dataArr;

  for (let i = 1; i < dataArr.length; i++) {
    const rowData: JsonType = {};

    for (let j = 0; j < fieldNames.length; j++) {
      rowData[fieldNames[j]] = dataArr[i][j] || '';
    }

    json.push(rowData);
  }

  return CSVConversionResult.ok(json);
}

export function convertCSVToJSONString(
  csv: string
): CSVConversionResult<string> {
  const conversionResult = convertCSVToJSON(csv);

  if (conversionResult.isFailure) {
    return CSVConversionResult.fail(conversionResult.error!);
  }

  return CSVConversionResult.ok(
    JSON.stringify(conversionResult.value, undefined, 2)
  );
}
