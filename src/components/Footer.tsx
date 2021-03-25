import styles from './Footer.module.scss'

export default function Footer() {
	return <footer className={styles.footer}>
		<img src="/logo.png" alt="idealcouscous"/>
		<span>Règles de Respect de la Vie Privée  Modalités relatives aux cookies  A propos de IdealCouscous  Condition générales d'abonnement  Aide  A propos d'IdéalCouscous</span>
		<span>Publicités ciblées par centre d'intérêt  Gérer vos préférences</span>
		<span>© IdéalCouscous. Tous droits réservés</span>
	</footer>
}
