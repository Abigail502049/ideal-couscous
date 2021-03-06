import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import queryTmdb from 'utils/queryTmdb'
import SearchInput from 'components/SearchInput'
import MovieOverviewLine from 'components/MovieOverviewLine'
import MovieCard from 'components/MovieCard'
import styles from './Home.module.scss'

export default function Home() {
	const [searchTerms, setSearchTerms] = useState(null)
	const [searchResults, setSearchResults] = useState([])
	const [recommendedMovies, setRecommendedMovies] = useState([])
	const [lastMovies, setLastMovies] = useState([])
	const [bestMovies, setBestMovies] = useState([])

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

		queryTmdb('/trending/movie/week', [
			['language', 'fr-FR'],
			['region', 'FR']
		], abortCtrl.signal).then(resp => {
			setRecommendedMovies(resp.results)
		}).catch(() => {
			// no-op
		})

		return () => {
			abortCtrl.abort()
		}
	}, [])

	useEffect(() => {
		const abortCtrl = new AbortController()

		queryTmdb('/movie/now_playing', [
			['language', 'fr-FR'],
			['region', 'FR']
		], abortCtrl.signal).then(resp => {
			setLastMovies(resp.results)
		}).catch(() => {
			// no-op
		})

		return () => {
			abortCtrl.abort()
		}
	}, [])

	useEffect(() => {
		const abortCtrl = new AbortController()

		queryTmdb('/movie/top_rated', [
			['language', 'fr-FR'],
			['region', 'FR']
		], abortCtrl.signal).then(resp => {
			setBestMovies(resp.results)
		}).catch(() => {
			// no-op
		})

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
		<section className={styles.recommended + ' recommended'}>
			<h2>Recommandés</h2>
			<div className={styles.movieList}>
				{recommendedMovies.map(item => (
					<Link to={`/details/${item.id}`} key={item.id}>
						<MovieCard movie={item} />
					</Link>
				))}
			</div>
		</section>
		<section className={styles.recommended + " latest"}>
			<h2 className="">Dernières sorties</h2>
			<div className={styles.movieList}>
				{lastMovies.map(item => (
					<Link to={`/details/${item.id}`} key={item.id}>
						<MovieCard movie={item} />
					</Link>
				))}
			</div>
		</section>
		<section className={styles.recommended + ' best'}>
			<h2>Meilleurs films</h2>
			<div className={styles.movieList}>
				{bestMovies.map(item => (
					<Link to={`/details/${item.id}`} key={item.id}>
						<MovieCard movie={item} />
					</Link>
				))}
			</div>
		</section>
	</>
}
