export default defineEventHandler(async (event) => {
  return {
    message: 'This is a private route',
    user: event.context.auth.user
  }
})
