import Header from 'components/Header'
import SearchInput from 'components/SearchInput'
import styles from './App.module.scss'

export default function App() {
	return (
		<div className={styles.root}>
			<Header/>
			<section className={styles.topPrompt}>
				<h2>Trouvez le film idéal</h2>
				<div className={styles.searchContainer}>
					<SearchInput/>
				</div>
			</section>
		</div>
	)
}
