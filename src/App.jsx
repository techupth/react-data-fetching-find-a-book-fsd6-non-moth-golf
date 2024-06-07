import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [findBook, setFindBook] = useState("");
  const [bookResult, setBookResult] = useState([]);

  const gooles = async (query) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      setBookResult(response.data.items);
    } catch (error) {
      console.error("Error fetching the books:", error);
    }
  };

  useEffect(() => {
    //เพิ่ม findBookใน()เพื่อเรียกใช้
      gooles(findBook);
  }, [findBook]);

  const handleTodoText = (event) => {
    setFindBook(event.target.value);
  };

  return (
    <div className="App">
      <div>
        <h1>Find A book</h1>
      </div>
      <input
        id="find-book"
        type="text"
        value={findBook}
        onChange={handleTodoText}
      />
      <div className="text-list">
        <ul>
          {bookResult?.map((text, index) => {
            console.log(text);
            return (
              <li key={index} className="show-book">
                {" "}
                {text.volumeInfo.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}


// ตัวอย่างจาก chatgpt
// function App() {
//   const [findBook, setFindBook] = useState("");
//   const [bookResult, setBookResult] = useState([]);

//   const fetchBooks = async (query) => {
//     try {
//       const response = await axios.get(
//         `https://www.googleapis.com/books/v1/volumes?q=${query}`
//       );
//       setBookResult(response.data.items);
//     } catch (error) {
//       console.error("Error fetching the books:", error);
//     }
//   };

//   useEffect(() => {
//     const debounceFetch = setTimeout(() => {
//       if (findBook) {
//         fetchBooks(findBook);
//       }
//     }, 500);

//     return () => clearTimeout(debounceFetch);
//   }, [findBook]);

//   const handleTodoText = (event) => {
//     setFindBook(event.target.value);
//   };

//   return (
//     <div className="App">
//       <div>
//         <h1>ค้นหาหนังสือ</h1>
//       </div>
//       <input
//         id="find-book"
//         type="text"
//         value={findBook}
//         onChange={handleTodoText}
//       />
//       <div className="text-list">
//         <ul>
//           {bookResult?.map((text, index) => (
//             <li key={index} className="show-book">
//               {text.volumeInfo.title}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

export default App;
