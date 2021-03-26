import { ChangeEvent, useState, useEffect } from "react"

const genres = {'action': 28, 'adventure': 12, 'animation': 16, 'comedy': 35, 'crime': 80, 'documentary': 99, 'drama': 18, 'family': 10751, 'fantasy': 14, 'history': 36, 'horror': 27, 'music': 10402, 'mystery': 9648, 'romance': 10749, 'science fiction': 878, 'tv movie': 10770, 'thriller': 53, 'war': 10752, 'western': 37}

export default function Select() {
	const [value, setValue] = useState<string>('PAR GENRE')

	function onChange(e : ChangeEvent<HTMLSelectElement>) {
		const newValue = e.target.value
		setValue(newValue)
	}

	useEffect(() => {
		if (Object.keys(genres).includes(value.toLowerCase())) {
			const id = genres[value.toLowerCase() as keyof typeof genres]
			// @ts-ignore disable-next-line
			window.location = `/genre/${id}`
		}
	}, [value])

	return <div>
			<select onChange={onChange} value={value} id="genres" name="genres">
				<option>PAR GENRE</option>
				{Object.keys(genres).map(key => (
					<option key={key}>{key.toUpperCase() }</option>
				))}
			</select>
	</div>
}
