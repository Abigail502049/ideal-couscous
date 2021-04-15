import { useEffect } from 'react'
import {
	Router,
	Switch,
	Route
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Home from './Home'
import Movie from './Movie'
import Genre from './Genre'
import styles from './App.module.scss'

const history = createBrowserHistory()
history.listen(location => {
	ReactGA.set({ page: location.pathname+location.search })
	ReactGA.pageview(location.pathname+location.search)
})

export default function App() {
	useEffect(() => {
		ReactGA.pageview(window.location.pathname+window.location.search)
	}, [])

	return <Router history={history}>
		<div className={styles.root}>
			<Header/>
			<Switch>
				<Route path="/details/:id">
					<Movie/>
				</Route>
				<Route path="/genre/:id">
					<Genre/>
				</Route>
				<Route path="/">
					<Home/>
				</Route>
			</Switch>
			<Footer/>
		</div>
	</Router>
}
