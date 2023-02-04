import JwtData from "~~/models/JwtData";
import { JWT } from "next-auth/jwt";

class JwtUtils {
  static parseJwt(token: Pick<JWT, string>): JwtData {
    let jwt: JwtData = new JwtData();
    jwt.accessToken = String(token.accessToken);
    jwt.email = String(token.email);
    jwt.exp = Number(token.exp);
    jwt.iat = Number(token.iat);
    jwt.id = String(token.id);
    jwt.jti = String(token.jti);
    jwt.name = String(token.name);
    jwt.picture = String(token.picture);
    jwt.sub = String(token.sub);
    return jwt;
  }
}

export default JwtUtils;
