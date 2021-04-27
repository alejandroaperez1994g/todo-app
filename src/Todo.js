import React from "react";

function Todo(props) {
  return (
    <div>
      <ul>
        <li>{`${props.text} 👹`}</li>
      </ul>
    </div>
  );
}

export default Todo;
