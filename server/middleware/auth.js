import connectDB from '~/server/utils/db';
import User from '~/server/models/User';
import BlacklistToken from '~/server/models/BlacklistToken';

const securedRoutes = [
    { path: /\/api\/logout/, methods: 'ALL' },
    { path: /\/api\/private/, methods: 'ALL' },
    { path: /\/api\/user/, methods: 'ALL' }, 
    { path: /\/api\/blog+$/, methods: ['POST'] }, 
    { path: /\/api\/blog\/[^\/]+$/, methods: ['DELETE','PATCH'] },

];
export default defineEventHandler(async (event) => {

    const route = securedRoutes.find(r => r.path.test(event.path));
    const isSecured = route && (route.methods === 'ALL' || route.methods.includes(event.method))
    if(isSecured){
        await connectDB();
        const authorization = event.headers.get('Authorization');
        if(!authorization){
            throw createError({
                statusCode: 401,
                statusMessage: "No token provided"
            });
        }
        const [type,token] = authorization.split(' ');
        if(type !== 'Bearer'){
            throw createError({
                statusCode: 401,
                statusMessage: "Authorization type not supported"
            });
        }
        const data = verifyToken(token);
        if(!data){
            throw createError({
                statusCode: 401,
                statusMessage: "Unauthorized"
            });
        }
        const blackListedToken = await BlacklistToken.countDocuments({token});
        if(blackListedToken > 0){
            throw createError({
                statusCode: 401,
                statusMessage: "Unauthorized"
            });
        }
        const user = await User.findById(data.id);

        event.context.auth = { user, token };
       
    }
})