import connectDB from '~/server/utils/db';
import BlacklistToken from '~/server/models/BlacklistToken';

export default defineEventHandler(async (event) => {
    await connectDB();
    const {token} = event.context.auth;
    await BlacklistToken.create({
        token
    })
    return {
        message: "Logged out successfully!"
    };
});
