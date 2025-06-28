package com.example.graphqlkotlin.model
 
data class Author(
    val id: String,
    val name: String,
    val books: List<Book> = emptyList()
) 