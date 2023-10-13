"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Book({ params }) {
	const [book, setBook] = useState({});

	const onInputChange = (e) => {
		if (e.target.name !== "publicationYear") {
			setBook({ ...book, [e.target.name]: e.target.value });
		} else {
			setBook({ ...book, [e.target.name]: Number(e.target.value) });
		}
	};

	const fetchBookData = async () => {
		let res = await fetch(`https://charming-dungarees-foal.cyclic.app/books/${params.bookID}`);
		res = await res.json();

		setBook(res.book);
	};

	const updateBook = async () => {
		const { _id, ...actualBook } = book;

		await fetch(`https://charming-dungarees-foal.cyclic.app/books/${_id}`, {
			method: "PUT",
			body: JSON.stringify(actualBook),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
	};

	const deleteBook = async () => {
		await fetch(`https://charming-dungarees-foal.cyclic.app/books/${book._id}`, {
			method: "DELETE",
		});
	};

	useEffect(() => {
		fetchBookData();
	}, []);

	return (
		<div className={styles.book}>
			<div className={styles.cover}>
				<img src={book.img} alt={book.title} className={styles.img} />

				<div className={styles.actions}>
					<button className={styles.actionYellow} onClick={updateBook}>
						Update book
					</button>
					<button className={styles.actionRed} onClick={deleteBook}>
						Delete book
					</button>
				</div>
			</div>

			<div className={styles.details}>
				<div className={styles.detail}>
					<label>Book title:</label>
					<input type="text" name="title" value={book.title} onChange={(e) => onInputChange(e)} />
				</div>
				<div className={styles.detail}>
					<label>Author:</label>
					<input type="text" name="author" value={book.author} onChange={(e) => onInputChange(e)} />
				</div>
				<div className={styles.detail}>
					<label>ISBN identifier:</label>
					<input type="text" name="isbn" value={book.isbn} onChange={(e) => onInputChange(e)} />
				</div>
				<div className={styles.detail}>
					<label>Year of Publication:</label>
					<input type="number" name="publicationYear" value={book.publicationYear} onChange={(e) => onInputChange(e)} />
				</div>
				<div className={styles.detailV}>
					<label>Description:</label>
					<textarea value={book.description} name="description" rows="10" onChange={(e) => onInputChange(e)} />
				</div>
			</div>
		</div>
	);
}
