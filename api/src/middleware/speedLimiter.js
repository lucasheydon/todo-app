import SlowDown from 'express-slow-down';

export const slowDown = SlowDown({
windowMs: 1000,
delayAfter: 1,
delayMs: 1000,
message: 'One request allowed per second!'
})