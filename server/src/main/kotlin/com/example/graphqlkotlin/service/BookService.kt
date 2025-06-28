package com.example.graphqlkotlin.service

import com.example.graphqlkotlin.model.Book
import org.springframework.stereotype.Service
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicLong

@Service
class BookService {
    private val books = ConcurrentHashMap<String, Book>()
    private val idCounter = AtomicLong(1)

    init {
        // Initialize with some sample data
        createBook("The Great Gatsby", "F. Scott Fitzgerald", 1925, "Fiction")
        createBook("To Kill a Mockingbird", "Harper Lee", 1960, "Fiction")
        createBook("1984", "George Orwell", 1949, "Dystopian")
        createBook("Pride and Prejudice", "Jane Austen", 1813, "Romance")
    }

    fun getAllBooks(): List<Book> = books.values.toList()

    fun getBookById(id: String): Book? = books[id]

    fun createBook(title: String, author: String, year: Int? = null, genre: String? = null): Book {
        val id = idCounter.getAndIncrement().toString()
        val book = Book(id, title, author, year, genre)
        books[id] = book
        return book
    }

    fun updateBook(id: String, title: String? = null, author: String? = null, year: Int? = null, genre: String? = null): Book? {
        val existingBook = books[id] ?: return null
        
        val updatedBook = existingBook.copy(
            title = title ?: existingBook.title,
            author = author ?: existingBook.author,
            year = year ?: existingBook.year,
            genre = genre ?: existingBook.genre
        )
        
        books[id] = updatedBook
        return updatedBook
    }

    fun deleteBook(id: String): Boolean {
        return books.remove(id) != null
    }

    fun getBooksByAuthor(authorName: String): List<Book> {
        return books.values.filter { it.author == authorName }
    }
} 