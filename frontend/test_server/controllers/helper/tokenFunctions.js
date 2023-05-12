require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateToken: (user, checkedKeepLogin) => {
    const payload = {
      id: user.id,
      email: user.email,
    };
    let result = {
      accessToken: sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "1d", // 1일간 유효한 토큰을 발행합니다.
      }),
    };

    if (checkedKeepLogin) {
      result.refreshToken = sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "7d", // 일주일간 유효한 토큰을 발행합니다.
      });
    }
    return result;
  },
  verifyToken: (type, token) => {
    let secretKey, decoded;
    switch (type) {
      case "access":
        secretKey = process.env.ACCESS_SECRET;
        break;
      case "refresh":
        secretKey = process.env.REFRESH_SECRET;
        break;
      default:
        return null;
    }

    try {
      decoded = verify(token, secretKey);
    } catch (err) {
      console.log(`JWT Error: ${err.message}`);
      return null;
    }
    return decoded;
  },
};
