import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isFind, setIsFind] = useState("");
  const [displayList, setDisplayList] = useState([]);

  const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";

  async function searchBook(event) {
    setIsFind(event.target.value);
  }

  async function findBook() {
    try {
      const response = await axios.get(`${baseUrl}${isFind}`);
      setDisplayList(response.data.items);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    findBook();
  }, [isFind]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input type="text" onChange={searchBook} />
      {isFind
        ? displayList.map((book, index) => (
            <ul>
              <li key={index}>{book.volumeInfo.title}</li>
            </ul>
          ))
        : null}
    </div>
  );
}

export default App;
