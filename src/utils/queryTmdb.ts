type QueryParam = [string, string]

export default async function query(path: string, params?: QueryParam[], abortSignal?: AbortSignal) {
	if (typeof process.env.REACT_APP_TMDB_API_KEY !== 'string') throw new Error('missing API key')

	let queryParams = ''
	for (const param of params ?? []) {
		queryParams += `&${encodeURIComponent(param[0])}=${encodeURIComponent(param[1])}`
	}

	const res = await fetch(`https://api.themoviedb.org/3${path}?api_key=${encodeURIComponent(process.env.REACT_APP_TMDB_API_KEY)}${queryParams}`, {
		method: 'GET',
		mode: 'cors',
		referrerPolicy: 'no-referrer',
		signal: abortSignal
	})

	if (!res.ok) throw new Error('not ok')
	
	return await res.json()
}
