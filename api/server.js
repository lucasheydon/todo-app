import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { userroutes } from './src/routes/user.js';
import { todoroutes } from './src/routes/todo.js';
import connectDB from './config/db.js';
import { cors } from './src/middleware/cors.js';
import { ratelimit } from './src/middleware/rateLimiter.js';
import { slowDown } from './src/middleware/speedLimiter.js';
import jsonwebtoken from 'jsonwebtoken';
import { authenticateJWT } from './src/middleware/auth.js';


dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 4000
const mode = process.env.NODE_ENV

const app = express();

// Initialises dotenv package
dotenv.config();

// MongoDB Connection
connectDB();

// Logger
app.use(morgan({
    connectionString: 'mongodb+srv://user:Icxe9vK30fZFALJH@cluster0.3ycqq.mongodb.net/todoapp'
}));

const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';

app.use(cors);
app.use(ratelimit);
app.use(slowDown);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//JWT setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(''), [1], 'RESTFULAPIs', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            //console.log(req.user );
            //console.log(decode);
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

userroutes(app);
todoroutes(app);

app.get('/', (req, res) => {
    res.send('Server running on ' + process.env.PORT);
    console.log(`Server running on ${process.env.PORT}`);
})

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
})