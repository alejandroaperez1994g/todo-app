import React from "react";
import "../views/Todo.css";

function Todo(props) {
  console.log(props);
  return (
    <div className="body">
      <div class="card">
        <div class="card-info">
          <h2>{`${props.todo.todo}`}</h2>
          <p>Some info</p>
        </div>
        <div class="date">1-5-2021</div>
      </div>
    </div>
  );
}

export default Todo;
