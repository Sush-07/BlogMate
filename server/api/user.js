export default defineEventHandler(async (event) => {
    const {user} = event.context.auth;
  
    return {
      user: {
        name: user.name,
        email: user.email,
        id: user._id
      }
    }
  })
  