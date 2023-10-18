import { User } from "../model/user.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export const register = async (req,res)=>{
    const {name,email,password,roll,dept} = req.body;

    if(!name){
        return res.status(400).json({
            message : "Please Provide Name"
        })
    }
    if(!email){
        return res.status(400).json({
            message : "Please Provide Email"
        })
    }
    if(!password){
        return res.status(400).json({
            message : "Please Provide Password"
        })
    }
    if(!roll){
        return res.status(400).json({
            message : "Please Provide Roll"
        })
    }


    let existingUser;
    try {

        // Find existing users 
        existingUser = await User.findOne({email});
        
        // If user is present
        if (existingUser) {
            return res.status(400).json({
              message: "User already exists!",
            });
          }
        
        // for new user        
        try {
            const hashedPassword = bcrypt.hashSync(password);
            const newUser = new User({
                name,
                email,
                password:hashedPassword,
                roll,
                dept
            });
            await newUser.save();

            // jwt token generation
            const secret_key = process.env.SECRET_KEY;
            const token = jwt.sign({email:newUser.email, id:newUser._id}, secret_key)

            return res.status(200).json({
                userDetails : {newUser},
                token : token
            })

        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
        
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
    
}


export const signIn = async (req,res)=>{
    const {email,password} = req.body;
    if(!email){
        return res.status(400).json({
            message : "Please Provide a valid Email"
        })
    }
    if(!password){
        return res.status(400).json({
            message : "Please Provide a valid Password"
        })
    }

    let existingUser;
    try {

        // Find existing users 
        existingUser = await User.findOne({email});
        
        // If user is not present
        if (!existingUser) {
            return res.status(400).json({
              message: "User is not found",
            });
          }
        
        // if user is present
       else{
         const isPasswordMatched = bcrypt.compareSync(password,existingUser.password);

        // if password is wrong
         if(!isPasswordMatched){
            return res.status(400).json({
                message: "wrong Password",
              });
         }
         
         // for right password       

            // toke generation
            const token = jwt.sign({email : existingUser.email, id : existingUser._id}, process.env.SECRET_KEY);

            return res.status(200).json({
                userDetails : {existingUser},
                token : token
            })
        
       }
        
    } catch (error) {
        res.status(400).json({
            message:error
        })
    }

}