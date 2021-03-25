import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import queryTmdb from 'utils/queryTmdb'
import { Star } from 'react-feather'
import styles from './Movie.module.scss'

export default function Home() {
	const { id } = useParams()
	const [movie, setMovie] = useState(null)

	useEffect(() => {
		const abortCtrl = new AbortController()
		queryTmdb(`/movie/${encodeURIComponent(id)}`, [
			['language', 'fr-FR']
		], abortCtrl.signal).then(resp => {
			console.log(resp)
			setMovie(resp)
		}).catch(() => {
			// no-op
		})

		return () => {
			abortCtrl.abort()
		}
	}, [id])

	if (movie === null) {
		return <p>Chargement...</p>
	}

	const stars = []

	for (let i = 0; i < movie.vote_average / 2; i++) {
		stars.push(<Star size={20}/>)
	}

	return <>
		<section className={styles.container}>
			<img
				className={styles.poster}
				alt={movie.title}
				src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-poster.png'}
			/>
			<h2>{ movie.title }</h2>
			<div className={styles.details}>
				{ stars }
				<h3>{ movie.tagline }</h3>
				<p>{ movie.overview }</p>
				<span>{ movie.release_date.split('-')[0] } - { movie.production_countries.map(x => x.name).join() } - { movie.genres.map(x => x.name).join(', ') }</span>
			</div>
		</section>
	</>
}
