# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server
- Should be good to go  😀    

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) - For hashing passwords          
- [cors](https://github.com/expressjs/cors) - To domain lock web service to only a whitelist of origins      
- [dotenv](https://github.com/motdotla/dotenv) - To load enivronment variables from a .env file       
- [nodemon](https://github.com/remy/nodemon) - Automatically restarts node appilcation when file changes are made       
- [morgan](https://github.com/expressjs/morgan) - Used to log HTTP requests        
- [express-rate-limit](https://github.com/nfriedly/express-rate-limit) - For limiting HTTP requests to 1000 requests in a 24 hour period per user session       
- [express-slow-down](https://github.com/nfriedly/express-slow-down) - For limiting HTTP requests to one request per second per user session   

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for our database connection.
- `controllers/` - This folder contains the request handling for our API.
- `middleware/` - This folder contains all our middleware.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.

