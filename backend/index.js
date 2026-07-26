const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log(err));
const adminRouter=require('./Routes/adminRoute');
const userRouter=require('./Routes/userRoute');
const providerRouter=require('./Routes/providerRoute');


app.get("/", (req, res) => {
  res.send("Backend Server is running");
});

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://fixora-hazel.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.use('/provider',providerRouter);
app.use('/serviceImage', express.static('serviceImage'));
app.use('/userImage', express.static('userImage'));
app.use('/documents', express.static('documents'));
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
})