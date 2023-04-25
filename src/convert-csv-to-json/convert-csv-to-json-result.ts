import { JsonType } from './convert-csv-to-json-type';

type ResultType = JsonType[] | string;

interface ResultProps<T = ResultType> {
  isSuccess: boolean;
  error?: string;
  value?: T;
}

export class CSVConversionResult<T = ResultType> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly error?: string;
  private value?: T;

  constructor({ isSuccess, error, value }: ResultProps<T>) {
    if (isSuccess && error) {
      throw new Error('A success result cannot contain an error message.');
    }

    if (!isSuccess && !error) {
      throw new Error('A failing result needs an error message.');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.value = value;
  }

  getValue(): T {
    if (this.isFailure) {
      throw new Error('Cant retrieve the value from a failed result.');
    }

    return this.value!;
  }

  public static ok<U>(value: U): CSVConversionResult<U> {
    return new CSVConversionResult<U>({
      isSuccess: true,
      value,
    });
  }

  public static fail<U>(error: string): CSVConversionResult<U> {
    return new CSVConversionResult<U>({
      isSuccess: false,
      error,
    });
  }
}
