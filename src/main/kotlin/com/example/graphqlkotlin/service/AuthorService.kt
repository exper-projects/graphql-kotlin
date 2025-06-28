package com.example.graphqlkotlin.service

import com.example.graphqlkotlin.model.Author
import com.example.graphqlkotlin.model.Book
import org.springframework.stereotype.Service
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicLong

@Service
class AuthorService(private val bookService: BookService) {
    private val authors = ConcurrentHashMap<String, Author>()
    private val idCounter = AtomicLong(1)

    init {
        // Initialize with some sample authors
        createAuthor("F. Scott Fitzgerald")
        createAuthor("Harper Lee")
        createAuthor("George Orwell")
        createAuthor("Jane Austen")
    }

    fun getAllAuthors(): List<Author> {
        return authors.values.map { author ->
            author.copy(books = bookService.getBooksByAuthor(author.name))
        }
    }

    fun getAuthorById(id: String): Author? {
        val author = authors[id] ?: return null
        return author.copy(books = bookService.getBooksByAuthor(author.name))
    }

    fun getAuthorByName(name: String): Author? {
        val author = authors.values.find { it.name == name } ?: return null
        return author.copy(books = bookService.getBooksByAuthor(author.name))
    }

    private fun createAuthor(name: String): Author {
        val id = idCounter.getAndIncrement().toString()
        val author = Author(id, name)
        authors[id] = author
        return author
    }
} 