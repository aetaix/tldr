// import { CRON_SECRET } from "$env/static/private";

export function GET() {
	// if (req.headers.get('Authorization') !== `Bearer ${CRON_SECRET}`) {
	// 	return new Response('Unauthorized', { status: 401 });
	// }
	fetch(
		'https://api.vercel.com/v1/integrations/deploy/prj_8yyCQKSHtjl9sdP0TjwAtPfIo3UK/IJwZ43iAVg',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	return new Response('Cron job triggered', { status: 200 });
}
