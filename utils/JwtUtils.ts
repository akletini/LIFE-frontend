import JwtData from "~~/models/JwtData";

class JwtUtils {
  static parseJwt(token: any): JwtData {
    let jwt: JwtData = new JwtData();
    jwt.accessToken = String(token.accessToken);
    jwt.email = String(token.user.email);
    jwt.exp = Number(token.exp);
    jwt.iat = Number(token.iat);
    jwt.id = String(token.user.id);
    jwt.jti = String(token.jti);
    jwt.name = String(token.user.name);
    jwt.image = String(token.user.image);
    jwt.sub = String(token.sub);
    return jwt;
  }
}

export default JwtUtils;
