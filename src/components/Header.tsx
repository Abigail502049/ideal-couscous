import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

export default function Header() {
	return <header className={styles.header}>
		<div className={styles.title}>
			<Link to="/">
				<h1>Idealcouscous.tv</h1>
			</Link>
		</div>
	</header>
}
