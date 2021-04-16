import { useEffect } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	useLocation,
	Route
} from 'react-router-dom'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Home from './Home'
import Movie from './Movie'
import Genre from './Genre'
import styles from './App.module.scss'

function Switcher() {
	const location = useLocation()

	useEffect(() => {
		window.gtag('event', 'page_view', {
			page_title: document.title,
			page_location: window.location.href,
			page_path: window.location.pathname
		})
	}, [location])

	return <div className={styles.root}>
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
}

export default function App() {
	return <Router>
		<Switcher/>
	</Router>
}
