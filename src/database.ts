import logger from '@shared/Logger';
import mongoose from 'mongoose';

const user = process.env.MONGO_USER;
const psw = process.env.OLYMPICDB_PASS;

const uri = `mongodb+srv://${user}:${psw}@cluster0.iaiel.mongodb.net/olympic?retryWrites=true&w=majority`

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).catch(err => logger.err(err));

export const connection = mongoose.connection;