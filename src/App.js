import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Home from './Home'
import Movie from './Movie'
import Genre from './Genre'
import styles from './App.module.scss'

export default function App() {
	return <Router>
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
