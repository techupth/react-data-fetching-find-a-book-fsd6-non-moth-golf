import "./App.css";
import {useState, useEffect} from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("")
  const [book, setBook] = useState([])
  const getBook = async () => {
    try {
      const result = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}`)
      console.log(result.data.items)
      setBook(result.data.items)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    getBook()
  },[text])
  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input type="text" placeholder="Enter a book" value={text} onChange={(e)=>{setText(e.target.value)}}></input>
      {
        book.map((data)=>{
          return (
            <ul>
              <li>{data.volumeInfo.title}</li>
            </ul>
          )
        })
      }
    </div>
  )
}

export default App;
