import { useApolloClient,useSubscription } from "@apollo/client";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)
      window.alert(`Added boook ${data.data.bookAdded.title}  by ${data.data.bookAdded.author.name} `)
    }
  })

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
        {token && <button onClick={() => setPage("add")}>add book</button> }
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={logout}>logout</button>}
        {token && <button onClick={() => setPage("recommend")}>recommendations</button> }

      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login"} setToken={setToken} />
      
      <Recommendations show={page === "recommend"}/>

    </div>
  );
};

export default App;
