import React, { useState } from "react";
import "../views/Todo.css";
import db from "../firebase";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '15%',
    width: '75%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'black',
    opacity: 0.7,
    borderRadius: 10,
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
        style={{ alignItems: "center", justifyContent: "center", }}
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <h1>Edita tu nota</h1>
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
          <div class="date">{props.todo.date.toDate().toDateString("yyyy-MM-dd")}</div>
        </div>
      </div>
    </>
  );
}

export default Todo;
