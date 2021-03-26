import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import Select from "./Select";

export default function Header() {
	return <header className={styles.header}>
		<div className={styles.title}>
			<img src="/logo.png" alt="logo"/>
			<Link to="/">
				<h1>Idealcouscous.tv</h1>
			</Link>
			<Select/>
		</div>
	</header>
}
