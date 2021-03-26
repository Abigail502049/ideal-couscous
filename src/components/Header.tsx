import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import Select from "./Select";

export default function Header() {
	function handleClick(el : string) {
		// @ts-ignore
		const element = document.querySelector('.' + el)
		if (element !== null)
			element.scrollIntoView({behavior: "smooth", block: "start"})
	}

	return <header className={styles.header}>
		<div className={styles.title}>
			<img src="/logo.png" alt="logo"/>
			<Link to="/">
				<h1>Idealcouscous.tv</h1>
			</Link>
			<Link to="/">
				<button type="button" onClick={() => handleClick('recommended')}>
					Recommandés
				</button>
			</Link>
			<Link to="/">
				<button type="button" onClick={() => handleClick('latest')}>
					Dernière Sorties
				</button>
			</Link>
			<Link to="/">
				<button type="button" onClick={() => handleClick('best')}>
					Meilleurs films
				</button>
			</Link>
		</div>
		<Select/>
	</header>
}
