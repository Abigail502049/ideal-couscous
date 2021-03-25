import { useState, useEffect } from 'react'
import queryTmdb from 'utils/queryTmdb'

declare global {
	interface Window {
		genre_cache: Record<number, string>
	}
}

export default function CategoryPrint(props: { category: number }) {
	const [printed, setPrinted] = useState('')
	useEffect(() => {
		if (typeof window.genre_cache !== 'undefined') {
			setPrinted(window.genre_cache[props.category])
		}

		const abortCtrl = new AbortController()
		queryTmdb('/genre/movie/list', [
			['language', 'fr-FR']
		], abortCtrl.signal).then(resp => {
			window.genre_cache = {}
			for (const x of resp.genres) {
				window.genre_cache[x.id] = x.name
			}

			setPrinted(window.genre_cache[props.category])
		}).catch(() => {
			// no-op
		})

		return () => {
			abortCtrl.abort()
		}
	}, [props.category])

	return <>
		{ printed }
	</>
}
