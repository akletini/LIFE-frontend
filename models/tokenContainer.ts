class TokenContainer {
  public accessToken: string;
  public accessTokenCreation: string;
  public refreshToken: string | null;

  constructor(
    accessToken: string,
    accessTokenExpiry: string,
    refreshToken: string | null
  ) {
    this.accessToken = accessToken;
    this.accessTokenCreation = accessTokenExpiry;
    this.refreshToken = refreshToken;
  }
}

export default TokenContainer;
