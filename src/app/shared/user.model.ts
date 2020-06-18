export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _expires_at: Date
  ) {}

  /** True if the End-User's e-mail address has been verified; otherwise false. */
  email_verified?: boolean;

  get token() {
    if (!this._expires_at || new Date() > this._expires_at) {
      return null;
    }
    return this._token;
  }
}
