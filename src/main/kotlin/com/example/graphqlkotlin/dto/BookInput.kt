package com.example.graphqlkotlin.dto

data class BookInput(
    val title: String,
    val author: String,
    val year: Int? = null,
    val genre: String? = null
)

data class BookUpdateInput(
    val id: String,
    val title: String? = null,
    val author: String? = null,
    val year: Int? = null,
    val genre: String? = null
) 