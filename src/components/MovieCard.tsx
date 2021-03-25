import styles from './MovieCard.module.scss'

interface Movie {
	id: number
	adult: boolean
	poster_path: string | null
	backdrop_path: string | null
	original_title: string
	title: string
	original_language: string
	release_date: string
	genre_ids: number[]
	popularity: number
	vote_count: number
	vote_average: number
	overview?: string
}

export default function MovieCard({ movie }: { movie: Movie }) {
	return <div className={styles.container}>
		<img
			className={styles.moviePoster}
			alt={movie.title}
			src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/no-poster.png'}
		/>
		<h2>{ movie.title }</h2>
		<span>
			{ movie.release_date.split('-')[0] } - { Math.round(movie.vote_average) }<em>/10</em>⋆
		</span>
	</div>
}
