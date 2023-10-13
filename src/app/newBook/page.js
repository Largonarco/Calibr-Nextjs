"use client";

import styles from "./page.module.css";
import { useState } from "react";

export default function NewBook() {
	const [book, setBook] = useState({
		img: "",
		isbn: "",
		title: "",
		author: "",
		description: "",
		publicationYear: 2000,
	});

	const onInputChange = (e) => {
		if (e.target.name !== "publicationYear") {
			setBook({ ...book, [e.target.name]: e.target.value });
		} else {
			setBook({ ...book, [e.target.name]: Number(e.target.value) });
		}
	};

	const addBook = async () => {
		await fetch("https://charming-dungarees-foal.cyclic.app/books", {
			method: "POST",
			body: JSON.stringify(book),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
	};

	return (
		<div className={styles.newBook}>
			<div className={styles.inputs}>
				<div className={styles.input}>
					<label>Book title</label>
					<input type="text" name="title" onChange={(e) => onInputChange(e)} />
				</div>
				<div className={styles.input}>
					<label>Description</label>
					<input type="text" name="description" onChange={(e) => onInputChange(e)} />
				</div>
				<div className={styles.input}>
					<label>Author</label>
					<input type="text" name="author" onChange={(e) => onInputChange(e)} />
				</div>
				<div className={styles.input}>
					<label>ISBN identifier</label>
					<input type="text" name="isbn" onChange={(e) => onInputChange(e)} />
				</div>
				<div className={styles.input}>
					<label>Book cover URL</label>
					<input type="text" name="img" onChange={(e) => onInputChange(e)} />
				</div>
				<div className={styles.input}>
					<label>Year of Publication</label>
					<input type="number" placeholder="(YYYY)" name="publicationYear" onChange={(e) => onInputChange(e)} />
				</div>
			</div>

			<div className={styles.actions}>
				<button className={styles.addButton} onClick={addBook}>
					Add book
				</button>
			</div>
		</div>
	);
}
