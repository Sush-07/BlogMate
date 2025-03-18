import connectDB from '~/server/utils/db';
import Blog from '~/server/models/Blog';
import mongoose from 'mongoose';
export default defineEventHandler(async(event)=>{
    await connectDB();

    const id = getRouterParam(event, "id")
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw createError({
            statusCode: 404,
            statusMessage: 'Invalid blog id'
        })
    }
    const blog = await Blog.findByIdAndDelete(id)

    if(!blog){
        throw createError({
            statusCode: 404,
            statusMessage: 'Invalid blog id'
        })
    }
    return{
        blog
    }
})