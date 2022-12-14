const { gql } = require("apollo-server")
const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    booksCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

  type Query {
    booksCount: Int!
    authorsCount: Int!
    allAuthors: [Author!]!
    allBooks(genre: String, author: String): [Book]
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book

    addAuthor(name: String, booksCount: Int, born: Int): Author

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favouriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
  type Subscription {
        bookAdded: Book!
  }    
`
module.exports = typeDefs