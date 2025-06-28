# GraphQL Kotlin Backend

A simple GraphQL backend built with Kotlin, Spring Boot, and GraphQL running on the JVM.

## Features

- **GraphQL API** with queries and mutations
- **Spring Boot** framework for easy development
- **Kotlin** programming language
- **In-memory data storage** with sample data
- **GraphiQL** interface for testing queries
- **Book and Author management** with relationships

## Prerequisites

- **Java 17** or higher
- **Gradle** (included via wrapper)

## Project Structure

```
src/
├── main/
│   ├── kotlin/com/example/graphqlkotlin/
│   │   ├── controller/          # GraphQL controllers
│   │   ├── model/              # Data models
│   │   ├── service/            # Business logic
│   │   └── GraphqlKotlinApplication.kt
│   └── resources/
│       ├── graphql/            # GraphQL schema
│       └── application.yml     # Configuration
```

## Setup and Running

### 1. Clone and Navigate to Project

```bash
cd graphql-kotlin
```

### 2. Build the Project

```bash
# On Windows
./gradlew.bat build

# On Unix/Linux/macOS
./gradlew build
```

### 3. Run the Application

```bash
# On Windows
./gradlew.bat bootRun

# On Unix/Linux/macOS
./gradlew bootRun
```

The application will start on `http://localhost:8080`
Access the endpoint on `http://localhost:8080/graphql`

### 4. Access GraphiQL Interface

Open your browser and navigate to: `http://localhost:8080/graphiql`

## GraphQL Schema

The application provides the following GraphQL operations:

### Queries

- `books`: Get all books
- `book(id: ID!)`: Get a specific book by ID
- `authors`: Get all authors
- `author(id: ID!)`: Get a specific author by ID

### Mutations

- `createBook(title: String!, author: String!, year: Int, genre: String)`: Create a new book
- `updateBook(id: ID!, title: String, author: String, year: Int, genre: String)`: Update an existing book
- `deleteBook(id: ID!)`: Delete a book

## Sample Queries

### Get All Books

```graphql
query {
  books {
    id
    title
    author
    year
    genre
  }
}
```

### Get Books by Author

```graphql
query {
  authors {
    id
    name
    books {
      title
      year
      genre
    }
  }
}
```

### Create a New Book

```graphql
mutation {
  createBook(
    title: "The Hobbit"
    author: "J.R.R. Tolkien"
    year: 1937
    genre: "Fantasy"
  ) {
    id
    title
    author
    year
    genre
  }
}
```

### Update a Book

```graphql
mutation {
  updateBook(id: "1", title: "The Great Gatsby (Updated)", year: 1926) {
    id
    title
    author
    year
    genre
  }
}
```

### Delete a Book

```graphql
mutation {
  deleteBook(id: "1")
}
```

## Sample Data

The application comes pre-loaded with sample books:

- The Great Gatsby (F. Scott Fitzgerald, 1925)
- To Kill a Mockingbird (Harper Lee, 1960)
- 1984 (George Orwell, 1949)
- Pride and Prejudice (Jane Austen, 1813)

## Development

### Adding New Features

1. Update the GraphQL schema in `src/main/resources/graphql/schema.graphqls`
2. Create/update data models in `src/main/kotlin/com/example/graphqlkotlin/model/`
3. Implement business logic in `src/main/kotlin/com/example/graphqlkotlin/service/`
4. Create GraphQL controllers in `src/main/kotlin/com/example/graphqlkotlin/controller/`

### Testing

```bash
./gradlew test
```

## Technologies Used

- **Kotlin**: Programming language
- **Spring Boot**: Application framework
- **Spring GraphQL**: GraphQL support
- **Gradle**: Build tool
- **JVM**: Runtime environment

## API Endpoints

- **GraphQL Endpoint**: `http://localhost:8080/graphql`
- **GraphiQL Interface**: `http://localhost:8080/graphiql`
- **Health Check**: `http://localhost:8080/actuator/health`

## Troubleshooting

### Common Issues

1. **Port 8080 already in use**: Change the port in `application.yml`
2. **Java version issues**: Ensure you have Java 17+ installed
3. **Gradle wrapper issues**: Run `./gradlew --version` to verify setup

### Logs

Check the application logs for detailed error information. The application runs with DEBUG logging for GraphQL operations.
