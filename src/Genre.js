import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import queryTmdb from 'utils/queryTmdb'
import MovieCard from 'components/MovieCard'
import GenrePrint from 'components/GenrePrint'
import styles from './Genre.module.scss'

export default function Genre() {
	const { id } = useParams()
	const [movies, setMovies] = useState(null)

	useEffect(() => {
		const abortCtrl = new AbortController()
		queryTmdb(`/discover/movie`, [
			['with_genres', `${id}`],
			['language', 'fr-FR'],
			['region', 'FR']
		], abortCtrl.signal).then(resp => {
			setMovies(resp.results)
		}).catch(() => {
			// no-op
		})

		return () => {
			abortCtrl.abort()
		}
	}, [id])

	if (movies === null ) {
		return <p>Chargement...</p>
	}

	return <>
		<section className={styles.container}>
			<h2><GenrePrint category={Number(id)}/></h2>
			<div className={styles.movieList}>
				{movies.map(item => (
					<Link to={`/details/${item.id}`} key={item.id}>
						<MovieCard movie={item} />
					</Link>
				))}
			</div>
		</section>
	</>
}
