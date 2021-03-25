import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import queryTmdb from 'utils/queryTmdb'
import SearchInput from 'components/SearchInput'
import MovieOverviewLine from 'components/MovieOverviewLine'
import MovieCard from 'components/MovieCard'
import styles from './Home.module.scss'
import GenrePrint from "./components/GenrePrint";

export default function Home() {
	const [searchTerms, setSearchTerms] = useState(null)
	const [currentGenre, setGenre] = useState(null)
	const [searchResults, setSearchResults] = useState([])
	const [recommendedMovies, setRecommendedMovies] = useState([])

	useEffect(() => {
		if (searchTerms === null) {
			setSearchResults([])
			return
		}

		const abortCtrl = new AbortController()
		queryTmdb('/search/movie', [
			['query', searchTerms],
			['language', 'fr-FR'],
			['region', 'FR']
		], abortCtrl.signal).then(resp => {
			setSearchResults(() => resp.results.slice(0, 4))
		}).catch(() => {
			// no-op
		})

		return () => {
			abortCtrl.abort()
		}
	}, [searchTerms])

	useEffect(() => {
		const abortCtrl = new AbortController()
		const genres = {"action": 28, "adventure": 12, "animation": 16, "comedy": 35, "crime": 80, "documentary": 99, "drama": 18, "family": 10751, "fantasy": 14, "history": 36, "horror": 27, "music": 10402, "mystery": 9648, "romance": 10749, "science fiction": 878, 'tv movie': 10770, 'thriller': 53, 'war': 10752, 'western': 37}
		if (currentGenre === null){
			queryTmdb('/trending/movie/week', [
				['language', 'fr-FR'],
				['region', 'FR']
			], abortCtrl.signal).then(resp => {
				setRecommendedMovies(resp.results)
			}).catch(() => {
				// no-op
			})
		}else {
			queryTmdb('/discover/movie', [
				['language', 'fr-FR'],
				['region', 'FR'],
				['with_genres', genres.family]
			], abortCtrl.signal).then(resp => {
				setRecommendedMovies(resp.results)
			}).catch(() => {
				// no-op
			})

		}



		return () => {
			abortCtrl.abort()
		}
	}, [])

	return <>
		<section className={styles.topPrompt}>
			<h2>Trouvez le film idéal</h2>
			<div className={styles.searchContainer}>
				<SearchInput
					onChange={searchstr => {
						setSearchTerms(searchstr)
					}}
					onSubmit={searchstr => {
						alert(searchstr)
					}}
				/>
			</div>
			<div className={styles.searchResultsContainer}>
				<div
					className={styles.searchResults}
					style={{
						display: searchResults.length ? 'inherit' : 'hidden'
					}}
				>
					{searchResults.map(item => (
						<Link to={`/details/${item.id}`} key={item.id}>
							<MovieOverviewLine key={item.id} movie={item} />
						</Link>
					))}
				</div>
			</div>
		</section>
		<section className={styles.recommended}>
			<h2>Recommandés</h2>
			<div className={styles.movieList}>
				{recommendedMovies.map(item => (
					<Link to={`/details/${item.id}`} key={item.id}>
						<MovieCard movie={item} />
					</Link>
				))}
			</div>
		</section>
	</>
}
