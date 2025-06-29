import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { gql } from "urql";

// GraphQL queries and mutations
export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      year
      genre
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      year
      genre
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $author: String!
    $year: Int
    $genre: String
  ) {
    createBook(title: $title, author: $author, year: $year, genre: $genre) {
      id
      title
      author
      year
      genre
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: ID!
    $title: String
    $author: String
    $year: Int
    $genre: String
  ) {
    updateBook(
      id: $id
      title: $title
      author: $author
      year: $year
      genre: $genre
    ) {
      id
      title
      author
      year
      genre
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

// Types
export interface Book {
  id: string;
  title: string;
  author: string;
  year?: number;
  genre?: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  year?: number;
  genre?: string;
}

export interface UpdateBookInput {
  id: string;
  title?: string;
  author?: string;
  year?: number;
  genre?: string;
}

interface BooksState {
  books: Book[];
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GET_BOOKS.loc?.source.body,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.books;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch books"
      );
    }
  }
);

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GET_BOOK.loc?.source.body,
          variables: { id },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.book;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch book"
      );
    }
  }
);

export const createBook = createAsyncThunk(
  "books/createBook",
  async (bookData: CreateBookInput, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: CREATE_BOOK.loc?.source.body,
          variables: bookData,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.createBook;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create book"
      );
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (bookData: UpdateBookInput, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: UPDATE_BOOK.loc?.source.body,
          variables: bookData,
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.updateBook;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update book"
      );
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: DELETE_BOOK.loc?.source.body,
          variables: { id },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete book"
      );
    }
  }
);

// Slice
const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch single book
      .addCase(fetchBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create book
      .addCase(createBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Update book
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        if (state.selectedBook?.id === action.payload.id) {
          state.selectedBook = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Delete book
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
        if (state.selectedBook?.id === action.payload) {
          state.selectedBook = null;
        }
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSelectedBook } = booksSlice.actions;
export default booksSlice.reducer;
