package com.example.graphqlkotlin.controller

import com.example.graphqlkotlin.model.Author
import com.example.graphqlkotlin.service.AuthorService
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller

@Controller
class AuthorController(private val authorService: AuthorService) {

    @QueryMapping
    fun authors(): List<Author> = authorService.getAllAuthors()

    @QueryMapping
    fun author(@Argument id: String): Author? = authorService.getAuthorById(id)
} 