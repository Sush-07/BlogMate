import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secretKey = process.env.SECRET_KEY;
const saltRounds = 10; 


export function signToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, secretKey, { expiresIn });
}


export function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null; 
    }
}


export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
}


export async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}
