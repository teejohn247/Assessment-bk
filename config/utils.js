import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Debug from 'debug';


dotenv.config();
const debug = Debug('http');


dotenv.config();

module.exports = {

encodeToken: (id, approved,  email) => {
const payload = { id, approved, email};
const option = { expiresIn: '10000000d' };
const secret = process.env.SECRET_KEY;
return jwt.sign(payload, secret, option);
    },
};


    




