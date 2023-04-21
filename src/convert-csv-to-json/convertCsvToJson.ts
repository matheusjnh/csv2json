function convertCSVToArray(csv: string): string[][] {
  const csvRegex = new RegExp(
    '(,|^|\r|\r?\n) *(?:"([^"]*(?:""[^"]*)*)"|([^",\r\n]+))',
    'gi'
  );

  const dataArr: string[][] = [[]];

  let matches = null;
  while ((matches = csvRegex.exec(csv))) {
    const delimiter = matches[1];

    if (delimiter !== '' && delimiter !== ',') {
      dataArr.push([]);
    }

    let data: string;

    if (matches[2]) {
      const doubleQuotesRegex = new RegExp('""', 'g');
      data = matches[2].replace(doubleQuotesRegex, `\"`);
    } else {
      data = matches[3];
    }

    dataArr[dataArr.length - 1].push(data);
  }

  return dataArr;
}

export function convertCSVToJSON(csv: string): JsonType[] {
  const dataArr = convertCSVToArray(csv);

  const json: JsonType[] = [];
  const keys = dataArr[0];

  for (let i = 1; i < dataArr.length; i++) {
    const dataObj: JsonType = {};

    for (let j = 0; j < keys.length; j++) {
      dataObj[keys[j]] = dataArr[i][j] ? dataArr[i][j] : '';
    }

    json.push(dataObj);
  }

  return json;
}

export function convertCSVToJSONString(csv: string): string {
  return JSON.stringify(convertCSVToJSON(csv), undefined, 2);
}

export interface JsonType {
  [index: string]: string;
}
