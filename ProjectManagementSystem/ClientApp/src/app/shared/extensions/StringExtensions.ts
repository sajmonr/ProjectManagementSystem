export class StringExtensions{
  static isNullOrEmpty(value: string): boolean{
    return !value || /^\s*$/.test(value);
  }
}
