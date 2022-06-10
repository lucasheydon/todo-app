import Cors from 'cors';

export const cors = Cors({
origin: 'http://localhost:4001',
methods: ['GET, POST, PUT, DELETE'],
credentials: true,
optionsSuccessStatus: 204
});