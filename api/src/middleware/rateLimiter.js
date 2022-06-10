import RateLimit from 'express-rate-limit';

export const ratelimit = RateLimit({
windowMs: 1440*60*1000, // 24 hours
max: 1000, // limit of number of requests per IP
delayMs: 1000 // delays each request to one each per second (1000 milliseconds)
});