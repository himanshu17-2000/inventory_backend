import jwt from "jsonwebtoken"
import "dotenv/config"

export default async (req, res, next) => {


  try {
    const token = req.header("token");
    if (!token) {
      return res.status(403).json({ msg: "authorization denied" });
    }

    const verify = jwt.verify(token, process.env.jwtSecret);
    
    req.user = verify.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
} 