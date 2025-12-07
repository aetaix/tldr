export function GET(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
  return new Response('Unauthorized', { status: 401 });
}
  const rebuild = fetch("https://api.vercel.com/v1/integrations/deploy/prj_8yyCQKSHtjl9sdP0TjwAtPfIo3UK/IJwZ43iAVg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return new Response('Cron job triggered', { status: 200 });
}