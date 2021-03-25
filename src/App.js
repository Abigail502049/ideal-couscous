import { useState, useEffect } from 'react'
import queryTmdb from 'utils/queryTmdb'
import Header from 'components/Header'
import SearchInput from 'components/SearchInput'
import MovieOverviewLine from 'components/MovieOverviewLine'
import styles from './App.module.scss'

export default function App() {
	const [searchTerms, setSearchTerms] = useState(null)
	const [searchResults, setSearchResults] = useState([])

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

	return <>
		<div className={styles.root}>
			<Header/>
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
						{searchResults.map(item =>
							<MovieOverviewLine key={item.id} movie={item} />
						)}
					</div>
				</div>
			</section>
		</div>
	</>
}
