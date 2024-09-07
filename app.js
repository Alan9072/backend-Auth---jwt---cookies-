import express from 'express'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cookieParser());


app.get("/",(req,res)=>{
    var token = jwt.sign({ email: 'alan@9846.com' }, 'secret');
    res.cookie("token",token);//has set the cookie for all pages

    var decoded = jwt.verify(token, 'secret');
    console.log("email : "+ decoded.email);
    // for encrypting password
    const hash = bcrypt.hashSync("password1234",10);
    // store hash as password in db

    console.log("passwordCompare : " + bcrypt.compareSync("password1234", hash));//comparing the user given password and hashed password from db

    res.send("set the cookie");
    
});

app.get("/readcookie",(req,res)=>{
    
    res.send("read cookie on terminal");
    console.log(req.cookies);// for reading the cookies
    
})

app.listen(3000);