import { ApplicationResult } from './app-result';
import { ApplicationResultTypes } from './enums';

export class ApplicationError<T = unknown> extends ApplicationResult<T> {
  constructor(public error: unknown) {
    super(ApplicationResultTypes.FAIL, undefined, error);
  }
}
