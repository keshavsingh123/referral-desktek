import jwt from "jsonwebtoken";

const JwtAuth = (req, res, next) => {
  // Read token from the Authorization header
  const token = req.headers["authorization"];

  // If no token is present, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).send("Unauthorized access: Token missing");
  }

  try {
    
    // Verify the token using the secret key
    const payload = jwt.verify(token, process.env.TOKEN);
    console.log(payload);

    // Attach the userID from the payload to the request object
    req.user = payload.user;
    next();
  } catch (err) {
    // Handle token verification errors
    console.error("JWT verification error:", err.message);
    res.status(401).send("Unauthorized access: Invalid token");
  }
};

export default JwtAuth;
