package com.example.graphqlkotlin.controller

import com.example.graphqlkotlin.model.Book
import com.example.graphqlkotlin.service.BookService
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class BookController(private val bookService: BookService) {

    @QueryMapping
    fun books(): List<Book> = bookService.getAllBooks()

    @QueryMapping
    fun book(@Argument id: String): Book? = bookService.getBookById(id)

    @MutationMapping
    fun createBook(
        @Argument title: String,
        @Argument author: String,
        @Argument year: Int?,
        @Argument genre: String?
    ): Book = bookService.createBook(title, author, year, genre)

    @MutationMapping
    fun updateBook(
        @Argument id: String,
        @Argument title: String?,
        @Argument author: String?,
        @Argument year: Int?,
        @Argument genre: String?
    ): Book? = bookService.updateBook(id, title, author, year, genre)

    @MutationMapping
    fun deleteBook(@Argument id: String): Boolean = bookService.deleteBook(id)
} 