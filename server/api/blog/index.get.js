import connectDB from '~/server/utils/db';
import Blog from '~/server/models/Blog';
export default defineEventHandler(async(event)=>{
    await connectDB();

    const blogs = await Blog.find({}).populate("author","name email");
    return {blogs};
})