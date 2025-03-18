import connectDB from '~/server/utils/db';
import User from '~/server/models/User';
import { hashPassword } from '../utils/auth';

export default defineEventHandler(async (event) => {
    await connectDB();
    const body = await readBody(event);
    const hashedPassword = await hashPassword(body.password);
    const existingUser = await User.countDocuments({ email: body.email });
    if(existingUser > 0){
        throw createError({
            statusCode: 409,
            message: "User already exists"
        });
    }
    const newUser = await User.create({
        name: body.name,
        email: body.email,
        password: hashedPassword, 
    });
    const token = signToken({ id: newUser._id });

    return {
        user:{
            name: newUser.name,
            email: newUser.email,
        },
        token,
    };
});
