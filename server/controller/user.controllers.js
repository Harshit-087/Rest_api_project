import User from "../models/user.schema.js"
import bcrypt from "bcrypt"
import { GenerateToken } from "../auth/jwt.js"

const getCookieOptions = () => ({
    httpOnly:true,
    // Cross-site cookies in production require sameSite=none + secure=true.
    sameSite:process.env.NODE_ENV==="production"?"none":"lax",
    secure:process.env.NODE_ENV==="production",
    maxAge:1000*60*60*24,
    path:"/"
});

export const registerUser = async(req,res)=>{
    console.log("signin route hit")
    console.log("BODY:", req.body);
    const {name,email,phone,password} = req.body;
    console.log("user reached")
    try{
           const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userCreated = await User.create({
            name,
            email,
            phone,
            password: hashPassword
        });

        
        return res.status(200).json({message:"new user is successfully created"})
    }catch(error){
        console.log("error in creating user",error)
        return res.status(500).json({message:"internal error in creating new user",error:error.message})
    }
}

export const signinUser = async(req,res)=>{
    const {email,password} = req.body
    console.log("user trying to login ",req.body)
    const userExist = await User.findOne({email})
    if(!userExist) return res.status(404).json({message:"user not found"})

    try{
        
       const isPassword = await bcrypt.compare(password, userExist.password);
       if(!isPassword) return res.status(400).json({message:"invalid credentials"})

        const payload={
            email,
            role:userExist.role
        }

        const token = GenerateToken(payload);

        /*
         * This Set-Cookie is scoped to the API host. Browsers do not send it to your Next.js
         * app on another origin — that is why the client uses `client/src/app/api/auth/signin`
         * to mirror the JWT into a first-party cookie for middleware. This line still helps
         * same-origin API clients or server-side fetches that expect a cookie.
         */
        res.cookie("token",token,getCookieOptions())
      return res.status(200).json({message:"user logged in successfully",token,data:userExist})
    }catch(error){
        console.log("invalid credentials",error)
        return res.status(500).json({message:"internal server error",error:error.message})
    }
}

export const SignoutUser = async(req,res)=>{
    try{
        // Use same attributes while clearing so browser removes the correct cookie.
        const { maxAge, ...clearOptions } = getCookieOptions();
        res.clearCookie("token", {
            ...clearOptions
        })
        return res.status(200).json({message:"signout successfully"})
    }catch(error){
        console.log("error in signin out",error)
        return res.status(500).json({message:"internal server error"})
    }
}