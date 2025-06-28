package com.example.graphqlkotlin.model

data class Book(
    val id: String,
    val title: String,
    val author: String,
    val year: Int? = null,
    val genre: String? = null
) 