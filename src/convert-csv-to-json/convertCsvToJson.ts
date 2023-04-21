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

    let fieldValue = nonQuotedValue;

    if (quotedValue) {
      const doubleQuotesFinder = new RegExp('""', 'g');
      fieldValue = quotedValue.replace(doubleQuotesFinder, `\"`);
    }

    dataArr[dataArr.length - 1].push(fieldValue);
  }

  return dataArr;
}

export function convertCSVToJSON(csv: string): JsonType[] {
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

  return json;
}

export function convertCSVToJSONString(csv: string): string {
  return JSON.stringify(convertCSVToJSON(csv), undefined, 2);
}

export interface JsonType {
  [index: string]: string;
}
