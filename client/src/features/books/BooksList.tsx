import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchBooks,
  createBook,
  updateBook,
  deleteBook,
  clearError,
  Book,
  CreateBookInput,
  UpdateBookInput,
} from "./booksSlice";
import styles from "./BooksList.module.css";

export function BooksList() {
  const dispatch = useAppDispatch();
  const { books, loading, error } = useAppSelector((state) => state.books);

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<CreateBookInput>({
    title: "",
    author: "",
    year: undefined,
    genre: "",
  });

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBook) {
      dispatch(updateBook({ id: editingBook.id, ...formData }));
    } else {
      dispatch(createBook(formData));
    }

    resetForm();
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      year: book.year,
      genre: book.genre || "",
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  const resetForm = () => {
    setFormData({ title: "", author: "", year: undefined, genre: "" });
    setEditingBook(null);
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  if (loading) {
    return <div className={styles.loading}>Loading books...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Books Management</h2>
        <button className={styles.addButton} onClick={() => setShowForm(true)}>
          Add New Book
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
          <button onClick={() => dispatch(clearError())}>×</button>
        </div>
      )}

      {showForm && (
        <div className={styles.formContainer}>
          <h3>{editingBook ? "Edit Book" : "Add New Book"}</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="year">Year:</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="genre">Genre:</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                {editingBook ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.booksGrid}>
        {books.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <h3>{book.title}</h3>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            {book.year && (
              <p>
                <strong>Year:</strong> {book.year}
              </p>
            )}
            {book.genre && (
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
            )}
            <div className={styles.bookActions}>
              <button
                onClick={() => handleEdit(book)}
                className={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <p>No books found. Add your first book!</p>
        </div>
      )}
    </div>
  );
}
