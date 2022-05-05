import { ApplicationResultTypes } from './enums';

export class ApplicationResult<T = unknown> {
  constructor(
    private resultType: ApplicationResultTypes,
    public data?: T,
    public error?: unknown,
  ) {}

  public isValid() {
    return this.resultType === ApplicationResultTypes.SUCCESS && !this.error;
  }
}
