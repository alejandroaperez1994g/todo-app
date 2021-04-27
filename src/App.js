import "./App.css";
import { useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState(["Primera Nota", "Segunda Nota"]);
  const [input, setInput] = useState("");

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>Notes To Do 🚀!! </h1>
      <form>
        <FormControl>
          <InputLabel>Añadir Nota 👹 </InputLabel>
          <Input
            id="standard-basic"
            label="Añadir Nota"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          variant="contained"
          type="submit"
          color="primary"
          onClick={addTodo}
        >
          Añadir
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo text={todo} />
          // <li>{`${todo} 👹`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
