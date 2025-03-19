import connectDB from '~/server/utils/db';
import Blog from '~/server/models/Blog';
import mongoose from 'mongoose';

export default defineEventHandler(async(event)=>{
    await connectDB();
     const { user } = event.context.auth
    const id = getRouterParam(event, "id")
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw createError({
            statusCode: 404,
            statusMessage: 'Invalid blog id'
        })
    }
  
         let blog = await  Blog.findById(id)
         if(!blog){
            throw createError({
                statusCode: 404,
                statusMessage: 'Invalid blog id'
            })
        }
         if(user._id.equals(blog.author)){
             await Blog.findByIdAndDelete(id)
         }else{
            throw createError({
                statusCode:401,
                statusMessage:"Unauthorizedsssssssssssss"
            })
         }

    
    return{
        blog
    }
})