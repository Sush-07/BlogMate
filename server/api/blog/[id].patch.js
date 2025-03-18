import mongoose from 'mongoose';
import Blog from '~/server/models/Blog'; 

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw createError({ statusCode: 400, message: 'Invalid blog ID format' });
    }

    const body = await readBody(event);

    if (!body.title || !body.content) {
        throw createError({ statusCode: 400, message: 'Title and content are required.' });
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });

        if (!updatedBlog) {
            throw createError({ statusCode: 404, message: 'Blog not found' });
        }

        return { success: true, data: updatedBlog };
    } catch (error) {
        console.error('Error updating blog:', error);
        throw createError({ statusCode: 500, message: 'Failed to update blog.' });
    }
});
