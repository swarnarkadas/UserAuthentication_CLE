import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    name:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true
    },
    password:{
        type : String,
        require : true
    },
    roll:{
        type: Number,
        require:true
    },
    dept:{
        type:String
    }
})

userSchema.methods.generateJWT = () => {
    const token = jwt.sign(
      {
        _id: this._id,
        number: this.number,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  };

export const User = mongoose.model("User",userSchema);