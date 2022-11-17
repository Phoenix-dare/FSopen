import { useApolloClient, useSubscription } from "@apollo/client";
import { useState,useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";


export const updateCache = (cache, query, bookAdded) => {  
  const uniqByName = (books) => {    
    let set = new Set()   
    console.log(set)
     return books.filter((item) => {      
      let title = item.title
    
            return set.has(title) ? false : set.add(title)   
           }) 
           }
           cache.updateQuery(query, ({ allBooks}) => {   
             return {      
              allBooks: uniqByName(allBooks.concat(bookAdded)), 
               }  
              })}
 
const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  
  useEffect(() => {
    const user= localStorage.getItem("kryptonite");
    if (user) {
      setToken(user.token);
    }
  }, [setToken]);


  useSubscription(BOOK_ADDED, {
    onData: ({ data ,client}) => {
      console.log(data);
      const addedBook = data.data.bookAdded
      window.alert(
        `Added boook ${addedBook.title}  by ${addedBook.author.name} `
      );
  updateCache(client.cache,{ query: ALL_BOOKS } , addedBook)
      
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={logout}>logout</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>recommendations</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login"} setToken={setToken} />

      <Recommendations show={page === "recommend"} />
    </div>
  );
};

export default App;
