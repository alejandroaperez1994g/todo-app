import "./App.css";
import { useEffect, useState } from "react";
import Todo from "./views/Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Cuando la aplicacion carge debemos obtener los datos de firestore
  useEffect(() => {
    //this fires when the apps.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // console.log(snapshot.docs.map((doc) => doc.data()));
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().text,
          }))
        );
      });
  }, [input]);

  const addTodo = (event) => {
    event.preventDefault();
    console.log(todos);
    db.collection("todos").add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="App">
      <section className="glass">
        <div className="dashboard">
          <div className="user">
            <img height="50px" src="" alt="user.profle" className="avatar" />
            <h3>Alejo</h3>
            <p>Pro Member</p>
          </div>
          <div className="links">
            <div className="link">
              <img height="50px" src="" alt="" />
              <h2>ToDo</h2>
            </div>
          </div>
        </div>
        <div className="games">
          <div className="status">
            <h1>Notas</h1>
            <form>
              <input
                type="text"
                onChange={(event) => setInput(event.target.value)}
              />
              <button
                className="button"
                disabled={!input}
                variant="contained"
                type="submit"
                color="primary"
                onClick={addTodo}
              >
                Añadir
              </button>
            </form>
          </div>
          <div className="cards">
            {/* <div className="card">
              <div className="card-info">
                <h2>Nota 1 </h2>
                <p>Some info</p>
              </div>
              <div className="date">1-5-2021</div>
            </div> */}
            {todos.map((todo) => (
              <Todo todo={todo} />
            ))}
          </div>
        </div>
      </section>
      {/* <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div> */}
    </div>
  );
}

export default App;
