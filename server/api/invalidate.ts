export default defineEventHandler(async () => {
  const storage = useStorage('db')
  const keys = await storage.keys()
  await storage.clear()
  return {
    date: new Date(),
    message: 'Cache invalidated successfully',
    keys,
  }
})
