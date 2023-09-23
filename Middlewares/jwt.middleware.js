const jwt = require("jsonwebtoken");

// create a middleware
async function jwtVerify(req, res, next) {
//   Get the token
  let token;

    try {
        if (!req.headers.authorization){
            // Token not provided
            return res.status(403).json({
                success: false,
                message: "no token in authorization"
            });
        }
        let bearerToken = req.headers.authorization;
            token = bearerToken.split(' ')[1];
            // console.log(token, " this is token");
        
            // verify tokens
            const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(decoded);
            if(!decoded){
                return res.status(400).json({
                    message: 'Token is not valid'
                })
            }
        
            // the next() will move to next middleware or route handler
            next();
    } catch (error) {
        console.log(error, "coming from the JWT middleware");
        return res.status(400).json({
            message: `Something went wrong ${error.message}`,
        })
    }
    
}

module.exports = jwtVerify;
