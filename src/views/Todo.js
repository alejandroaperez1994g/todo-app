import React, { useState } from "react";
import "../views/Todo.css";
import db from "../firebase";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = () => {
    db.collection("todos")
      .doc(props.todo.id)
      .set({ text: input }, { merge: true });

    setOpen(false);
  };

  return (
    <>
      <Modal
        className={classes.paper}
        open={open}
        onClose={(e) => setOpen(false)}
      >
        <div>
          <h1>Open</h1>
          <input
            value={input}
            placeholder={props.todo.todo}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            disabled={!input}
            className="button_edit"
            onClick={updateTodo}
          >
            Close
          </button>
        </div>
      </Modal>
      <div className="body">
        <div class="card">
          <div class="card-info">
            <h2>{`${props.todo.todo}`}</h2>
            <p>Some info</p>
            <div className="buttons">
              <button
                className="button_delete"
                onClick={(event) =>
                  db.collection("todos").doc(props.todo.id).delete()
                }
              >
                Eliminar
              </button>
              <button className="button_edit" onClick={(e) => setOpen(true)}>
                Editar
              </button>
            </div>
          </div>
          <div class="date">1-5-2021</div>
        </div>
      </div>
    </>
  );
}

export default Todo;
