import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
query{
    allAuthors {
      name
      born
      booksCount
      
    }
  }

`
export const ALL_BOOKS = gql`
query{
    allBooks {
      title
      author
      published
    }
  
    
  }

`
export const NEW_BOOK = gql`
mutation createBook($title:String!,$author:String!,$published:Int!,$genres:[String]!) {
    addBook(
        title:$title,
        author:$author,
        published:$published,
        genres:$genres
    ){
        title
        author
        published
        genres
    }

}


`