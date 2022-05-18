import React, { useEffect, useState } from "react";
import EachTodo from "./EachTodo";

const Home = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);
  return (
    <div className="mx-20">
      <div>
        <form>
          <label htmlFor="name">Title</label>
          <input
            type="text"
            className="my-2 border-2 py-1 px-3 w-full rounded-md"
            name="title"
            id="title"
          />
          <br />
        </form>
      </div>
      <h1 className="text-4xl text-bold my-10 text-primary">All Todos: </h1>
      <div className="grid grid-cols-3 gap-5">
        {todos.map((todo) => (
          <EachTodo key={todo.id} each={todo}></EachTodo>
        ))}
      </div>
    </div>
  );
};

export default Home;
