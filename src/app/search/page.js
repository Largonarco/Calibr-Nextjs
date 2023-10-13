"use client";

import styles from "./page.module.css";
import { useState } from "react";

export default function Search() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);

	const onInputChange = async (e) => {
		setQuery(e.target.value);

		let res = await fetch(`https://charming-dungarees-foal.cyclic.app/search?query=${query}`);
		res = await res.json();

		setResults(res.results.hits.hits);
	};

	return (
		<div className={styles.search}>
			<input type="text" name="search" value={query} onChange={(e) => onInputChange(e)} className={styles.searchBar} />

			<div className={styles.results}>
				{results?.map((book, index) => (
					<div className={styles.book} key={index}>
						<a href={"/books/" + book._id}>
							<img className={styles.cover} src={book._source.img} alt={book._source.title} />
							<div className={styles.details}>
								<p className={styles.title}>{book._source.title}</p>
							</div>
						</a>
					</div>
				))}
			</div>
		</div>
	);
}
