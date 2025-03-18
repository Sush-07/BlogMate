import connectDB from '~/server/utils/db';
import User from '~/server/models/User';

export default defineEventHandler(async (event) => {
    await connectDB();
    const body = await readBody(event);
    const user = await User.findOne({ email: body.email });

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid email or password"
        })
    }
    if(!comparePassword(body.password, user.password)){
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid email or password"
        })
    }

    const token = signToken({ id: user._id });
    return {
        user: {
            name: user.name,
            email: user.email,
        },
        token,
    };
});
