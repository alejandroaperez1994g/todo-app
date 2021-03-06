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
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().text,
            date: doc.data().timestamp,
          }))
        );
      });
    console.log(todos);
  }, [input]);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <section className="glass">
        <div className="dashboard">
          <div className="user">
            <img
              height="90px"
              src="https://as1.ftcdn.net/jpg/03/91/19/22/500_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
              alt=""
              className="avatar"
            />
            <h3>Alejo</h3>
            <p>Pro Member</p>
          </div>
          <div className="links">
            <div className="link">
              <img
                height="50px"
                src="https://to-do-cdn.microsoft.com/static-assets/c87265a87f887380a04cf21925a56539b29364b51ae53e089c3ee2b2180148c6/icons/logo.png"
                alt=""
              />
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
                value={input}
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
                A??adir
              </button>
            </form>
          </div>
          <div className="cards">
            {todos.map((todo) => (
              <Todo key={todo.uid} todo={todo} />
            ))}
          </div>
        </div>
      </section>
      <div class="area">
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
      </div>
    </div>
  );
}

export default App;
