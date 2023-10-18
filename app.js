import  express  from "express";
import { userRouter } from "./routes/user.js";
import cors from 'cors';
import mongoose from "mongoose";

const app = express();

// database connection
mongoose.connect('mongodb://localhost:27017/Task1DB')
.then(()=>{
    console.log('Database is connected successfully')
})
.catch((err)=>{
    console.log(err);
})

app.use(cors());
app.use(express.urlencoded({extended : true})); 
app.use(express.json());

app.use('/api/user',userRouter);


// for handel error
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
  

app.listen(3000,()=>{
    console.log("Your server is running at port 3000");
})