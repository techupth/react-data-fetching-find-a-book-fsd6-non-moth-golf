import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [book, setBook] = useState([]);
  const getBook = async () => {
    try {
      if (text !== "") {
        const result = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${text}`
        );
        console.log(result.data.items);
        setBook(result.data.items);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBook();
  }, [text]);
  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        placeholder="Enter a book"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>
      <ul>
        {text
          ? book.map((data, index) => {
              return <li key={index}>{data.volumeInfo.title}</li>;
            })
          : null}
      </ul>
    </div>
  );
}

export default App;
