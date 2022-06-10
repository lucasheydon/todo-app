import mongoose from 'mongoose';
import { UserSchema } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const accessTokenSecret = 'youraccesstokensecret';
import dotenv from 'dotenv';
dotenv.config();
process.env.TOKEN_SECRET;


const User = mongoose.model('User', UserSchema);

export const addNewUser = (req, res) => {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);

    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hashPassword = undefined;
            res.json(user);
        }
    })
}

export const updateUser = (req, res) => {
    User.findOneAndUpdate({_id: req.params.userID}, req.body, {
        new: true, useFindAndModify: false
    },(err, user) => {
        if (err) {
            res.staus(400).send(err);
        } else {
            res.json(user);
        }
    })
}

export const getUsers = (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            res.staus(400).send(err);
        } else {
            res.json(user);
        }
    })
}
        

export const getUserById = (req, res) => {
    User.findById(req.params.userID, (err, user) => {
        if (err) {
            res.staus(400).send(err);
        } else {
            res.json(user);
        }
    })
}

export const deleteUser = (req, res) => {
    User.remove({_id: req.params.userID}, (err, user) => {
        if (err) {
            res.staus(404).send(err);
        } else {
         res.json({
                message: "Deleted Successfully!"
            });
        }
    })
}

export const login = (req,res) => {
    const { email, password } = req.body;
    if(!email || !password )
    {
        return res.status(422).json({error:"Please add all fields"})
    }
    User.findOne({email:email})
    .then((user)=>{
        if(!user){
            return res.status(422).json({error:"Invalid Email or password"})
       }
        bcrypt.compare(password,user.hashPassword)
        .then(match=>{
            if(match)
            {
                const accessToken = jwt.sign({ email: user.email,  userType: user.userType }, accessTokenSecret);
                const refreshToken = jwt.sign({ email: user.email,  userType: user.userType }, accessTokenSecret);
                res.json({accessToken})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
}

export const logout = (req,res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(token => t !== token);
    res.send("Logout successful");
}