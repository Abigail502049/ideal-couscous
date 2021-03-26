import { Link } from 'react-router-dom'
import styles from './Select.module.scss'
import {ChangeEvent, useEffect, useState} from "react";
import setRecommendedMovies from "../Home";
import queryTmdb from "../utils/queryTmdb";


export default function Select() {
    const genres = {'action': 28, 'adventure': 12, 'animation': 16, 'comedy': 35, 'crime': 80, 'documentary': 99, 'drama': 18, 'family': 10751, 'fantasy': 14, 'history': 36, 'horror': 27, 'music': 10402, 'mystery': 9648, 'romance': 10749, 'science fiction': 878, 'tv movie': 10770, 'thriller': 53, 'war': 10752, 'western': 37}
    const [value, setValue] = useState<string>()

    function onChange(e : ChangeEvent<HTMLSelectElement>) {
        console.log("change")
        const newValue = e.target.value
        setValue(newValue)
    }

    function updateGenre() {
        //Do the update
        // const abortCtrl = new AbortController()
        // queryTmdb('/trending/movie/week', [
        //     ['language', 'fr-FR'],
        //     ['region', 'FR']
        // ], abortCtrl.signal).then(resp => {
        //     setRecommendedMovies(resp.results)
        // }).catch(() => {
        //     // no-op
        // })
    }
    return <div>
            <select onChange={onChange} id="genres" name="genres">


                {Object.keys(genres).map((key, index) => (
                    <option >{key.toUpperCase() }</option>
                ))}
                {updateGenre()}

            </select>

    </div>


}
