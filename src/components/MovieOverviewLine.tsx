import CategoryPrint from './GenrePrint'
import styles from './MovieOverviewLine.module.scss'

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

export default function MovieOverviewLine({ movie }: { movie: Movie }) {
	return <div className={styles.container}>
		<img
			className={styles.moviePoster}
			alt={movie.title}
			src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/no-poster.png'}
		/>
		<div className={styles.details}>
			<h2>{ movie.title }</h2>
			<p>{ movie.overview ? movie.overview.split(' ').slice(0, 18).join(' ')+'...' : 'Pas de description disponible.' }</p>
			<span>
				{ movie.release_date.split('-')[0] } - { Math.round(movie.popularity) }<em>/100</em>⋆ - {movie.genre_ids.map(id => (
					<CategoryPrint category={id} key={id} />
				)).reduce((acc, x) =><>{acc}, {x}</>)}
			</span>
		</div>
	</div>
}
