import { useApolloClient } from "@apollo/client";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
console.log(token);
  const client = useApolloClient();

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
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login"} setToken={setToken} />
    </div>
  );
};

export default App;
