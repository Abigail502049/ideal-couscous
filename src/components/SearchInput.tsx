import type { ChangeEvent, KeyboardEvent } from 'react'
import { useState } from 'react'
import { useTimeoutFn } from 'react-use'
import { Search, ArrowRight } from 'react-feather'
import styles from './SearchInput.module.scss'

export interface SearchInputProps {
	onSubmit: (search: string) => void
	onChange?: (search: string | null) => void
}

export default function SearchInput(props: SearchInputProps) {
	const [value, setValue] = useState<string | null>(null)
	const [triggerChange, cancelTriggerChangeTimer, resetTriggerChangeTimer] = useTimeoutFn(() => {
		if (typeof props.onChange === 'function') props.onChange(value)
	}, 600)

	function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		if (e.code === 'Enter' && value !== null) {
			props.onSubmit(value)
		}
	}

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.value.length > 0) {
			setValue(e.target.value)
		} else {
			setValue(null)
		}

		cancelTriggerChangeTimer()
		resetTriggerChangeTimer()
		triggerChange()
	}

	return <div className={styles.container}>
		<div className={styles.inputBar}>
			<div className={styles.searchIcon}>
				<Search size={24} />
			</div>
			<input
				className={styles.input}
				type="search"
				placeholder="Rechercher"
				onKeyDown={onKeyDown}
				onChange={onChange}
				value={value || ''}
			/>
		</div>
		<button
			className={styles.submitButton}
			onSubmit={() => {
				if (value !== null) props.onSubmit(value)
			}}
		>
			<ArrowRight size={24} strokeWidth={3} />
		</button>
	</div>
}
