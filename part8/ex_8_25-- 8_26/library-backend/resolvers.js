const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')
const Author = require('./models/AuthorModel')
const Book = require('./models/bookModel')
const User = require('./models/userModel')
const JWT_SECRET = process.env.SECRET;


const resolvers = {
    Query: {
      authorsCount: async () => Author.collection.countDocuments(),
      booksCount: async () => Book.collection.countDocuments(),
      allAuthors: async () => Author.find({}),
      allBooks: async (root, args) => {
        //const author = await Author.find({});
        
        if (args.genre) {
          return Book.find({ genres: { $in: [args.genre] } }).populate('author')
        } else {
          const books = await Book.find({}).populate('author')
          return books
        }
      },
      me: (root, args, context) => {
        return context.currentUser;
      },
    },
    Mutation: {
      addBook: async (root, args,context) => {
        const currentUser = context.currentUser;
        if (!currentUser) {
          throw new AuthenticationError("not authenticated");
        }
  
        const author = await Author.findOne({ name: args.author });
        const book = new Book({ ...args, author: author });
        try {
          await book.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book;
      },
      
      editAuthor: async (root, args,context) => {
        const currentUser = context.currentUser;
        if (!currentUser) {
          throw new AuthenticationError("not authenticated");
        }
  
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
      createUser: async (root, args) => {
        const user = new User({ username: args.username,
          favouriteGenre:args.favouriteGenre});
  
        return user.save().catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        });
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username });
  
        if (!user || args.password !== "password") {
          throw new UserInputError("wrong credentials");
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        };
  
        return { value: jwt.sign(userForToken, JWT_SECRET) };
      },
    },
    Subscription: {    
      bookAdded: {      
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')  
        },  
      },
    }
  

  
  module.exports = resolvers