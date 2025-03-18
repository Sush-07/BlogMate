export default defineEventHandler(async (event) => {
    const {user} = event.context.auth;
    console.log(event)
    return {
      user: {
        name: user.name,
        email: user.email
      }
    }
  })
  