import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
	// TODO https://github.com/sveltejs/kit/issues/1046
	const method = request.query.get('_method');
	if (method) {
		request.method = method.toUpperCase();
	}

	const response = await resolve(request);

	return response;
};
