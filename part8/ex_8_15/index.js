const { ApolloServer, UserInputError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/bookModel");
const Author = require("./models/authorModel");
require("dotenv").config();

////````//////```db```````/////

console.log("connecting to db");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

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
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    booksCount: Int!
    authorsCount: Int!
    allAuthors: [Author!]!
    allBooks(genre: String, author: String): [Book]
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
  }
`;

const resolvers = {
  Query: {
    authorsCount: async () => Author.collection.countDocuments(),
    booksCount: async () => Book.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (root, args) => {
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } });
      } else {
        return Book.find({});
      }
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author });
      console.log(author._id);
      const book = new Book({ ...args, author: author });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return book.save();
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
