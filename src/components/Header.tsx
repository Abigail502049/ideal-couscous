import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import Select from "./Select";

export default function Header() {
	function handleClick(el : string) {
		// @ts-ignore
		document.querySelector('.' + el).scrollIntoView({behavior: "smooth", block: "start"})
	}

	return <header className={styles.header}>
		<div className={styles.title}>
			<img src="/logo.png" alt="logo"/>
			<Link to="/">
				<h1>Idealcouscous.tv</h1>
			</Link>
			<button type="button" onClick={() => handleClick('latest')}>
				Dernière Sorties
			</button>
			<button type="button" onClick={() => handleClick('recommended')}>
				Recommandés
			</button>
			<button type="button" onClick={() => handleClick('best')}>
				Meilleurs films
			</button>
		</div>
		<Select/>
	</header>
}
