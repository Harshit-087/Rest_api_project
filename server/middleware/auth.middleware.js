import {VerifyToken} from "../auth/jwt.js"

export default function AuthMiddleware(req,res,next){
    const token = req.headers.authorization.split(" ")[1];
    try{
        const decoded = VerifyToken(token);
        console.log("decoded token",decoded)
        req.user = decoded;
        next()
    }catch(error){
        console.log("authontication fails",error)
        return res.status(401).json({message:"invalid credentials ",error:error.message})
    }
}