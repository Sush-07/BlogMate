import connectDB from '~/server/utils/db';
import Blog from '~/server/models/Blog';

export default defineEventHandler(async (event) => {
    await connectDB();
    const body = await readBody(event);
    const {
        title,
        shortDescription,
        content
    } = body;
    const {user} = event.context.auth;
    const newBlog = await Blog.create({
        title,
        shortDescription,
        content,
        author: user._id
    })
    return newBlog;
});
