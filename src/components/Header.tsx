import styles from './Header.module.scss'

export default function Header() {
	return <header className={styles.header}>
		<div className={styles.title}>
			<h1>Idealcouscous.tv</h1>
		</div>
	</header>
}
