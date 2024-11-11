import jwt from "jsonwebtoken"


const authorize = ((req,res,next)=>{
    const token = req.cookies.authToken ;

    if(!token){
        res.status(401).json({
            message :"no token"
        })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    if(decoded){
        req.user = decoded;
        next();
    }
    else{
        res.status(403).json({
            message : "You are not signed in"
        })
    }
})

export default authorize;