"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
	const [page, setPage] = useState(0);
	const [books, setBooks] = useState(null);
	const [bookCount, setBookCount] = useState(0);

	const fetchBooks = async () => {
		let res = await fetch(`https://charming-dungarees-foal.cyclic.app/books?offset=${page * 5}&limit=5`);
		res = await res.json();

		setBooks(res.books);
		setBookCount(res.bookCount);
	};

	const loadPrevBooks = async () => {
		setPage((page) => page - 1);
	};

	const loadNextBooks = async () => {
		setPage((page) => page + 1);
	};

	useEffect(() => {
		fetchBooks();
	}, [page]);

	return (
		<div className={styles.home}>
			<div className={styles.books}>
				{books?.map((book, index) => (
					<div className={styles.book} key={index}>
						<a href={"/books/" + book._id}>
							<img className={styles.cover} src={book.img} alt={book.title} />
							<div className={styles.details}>
								<p className={styles.title}>{book.title}</p>
							</div>
						</a>
					</div>
				))}
			</div>

			<div className={styles.navigation}>
				{page !== 0 ? (
					<button onClick={loadPrevBooks} className={styles.navigationButtons}>
						Prev
					</button>
				) : (
					<div></div>
				)}

				{page !== Math.round(bookCount / 5) ? (
					<button onClick={loadNextBooks} className={styles.navigationButtons}>
						Next
					</button>
				) : null}
			</div>
		</div>
	);
}
