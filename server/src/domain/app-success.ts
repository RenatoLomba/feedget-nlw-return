import { ApplicationResult } from './app-result';
import { ApplicationResultTypes } from './enums';

export class ApplicationSuccess<T = unknown> extends ApplicationResult<T> {
  constructor(public data?: T) {
    super(ApplicationResultTypes.SUCCESS, data);
  }
}
