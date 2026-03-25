export default defineEventHandler(async () => {
  const storage = useStorage("routeCache");
  const keys = await storage.getKeys();
  await storage.clear();
  return {
    date: new Date(),
    message: "success",
    keys,
    count: keys?.length || 0,
  };
});
