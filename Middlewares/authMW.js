const jwt = require("jsonwebtoken");

module.exports.authenticate = (request, response, next) => {
  //bageeb token mn header http request
  try {
    const token = extractToken(request);
    // console.log(token);
    const decodedToken = jwt.verify(token, "NurserySystem"); //verify with secret key and decrypts
    //request.role=decodedToken.role
    request.decodedToken = decodedToken;
    // console.log(decodedToken);//show me the user data id, expiration username etc
    next();
  } catch (error) {
    next(new Error("Not Authenticated"));
  }
};

function extractToken(request) {
  return request.get("Authorization").split(" ")[1];
}
