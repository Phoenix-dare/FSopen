const { ApolloServer, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid');


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
type Authors{
    name:String!
    id:ID!
    born:Int
    booksCount:Int
}

type Books{
    title:String!
    published:Int!
    author:String!
    id:ID!
    genres:[String]!

}

  type Query {
    booksCount:Int!
    authorsCount:Int!
    allAuthors:[Authors!]!
    allBooks(genre:String,author:String):[Books]
  }
  type Mutation {
    addBook(
        title:String!
        published:Int!
        author:String!
        genres:[String]!): Books
    addAuthor(
        name:String
        booksCount:Int
        born:Int
    ):Authors
    editAuthor(
        name:String!
        setBornTo:Int
    ):Authors
  }
`

const resolvers = {
  Query: {
    authorsCount: () => authors.length,
    booksCount: () => books.length,
    allAuthors:() => authors,
    allBooks: (root,args) => {
        
        if(args.genre && !args.author){
            return books.filter(book=>book.genres.includes(args.genre))

        }else if(args.author && !args.genre){

        return books.filter(book=>book.author===args.author)

        }else if(args.author && args.genre){
        return books.filter(book=>book.genres.includes(args.genre)).filter(book=>book.author===args.author)
        }else{
            return books
        }


  },
},
Mutation :{
    addBook:(root,args) =>{
        const book={...args,
            id: uuidv4()}
        const author = {
            name:args.author,
            booksCount:1,
            id:uuidv4()
        }

        books=books.concat(book)
        authors = authors.concat(author)
        return book
    },
    editAuthor:(root,args) => {
        
        return authors.map(author => author.name === args.name 
            ? {...author,born:args.setBornTo}: author)
            .find(author => author.name === args.name)

    }
    
}

}
    


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
