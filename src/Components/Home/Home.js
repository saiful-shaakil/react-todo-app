import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import EachTodo from "./EachTodo";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    let title = e.target.title.value;
    let desc = e.target.desc.value;
    if (!title || !desc) {
      toast("Please fill the form.");
    }
    if (title && desc) {
      const todo = {
        title: title,
        desc: desc,
        userMail: user?.email,
        complete: false,
      };
      if (!user) {
        toast("Please login first");
        navigate("/login");
      }
      if (user) {
        fetch("https://hidden-garden-32672.herokuapp.com/addtodo", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(todo),
        })
          .then((res) => res.json())
          .then((data) => {
            toast("New task added to your list.");
          });
        e.target.title.value = "";
        e.target.desc.value = "";
      }
    }
  };
  return (
    <div className="mx-20">
      <div className="sm:w-4/5 lg:w-1/2 mx-auto">
        <h1 className="text-4xl mt-5 mb-1 uppercase text-primary">Add todo:</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Todo Name"
            type="text"
            className="my-2 border-2 py-1 px-3 w-full rounded-md"
            name="title"
            id="title"
          />
          <br />
          <input
            placeholder="Todo Description"
            type="text"
            className="my-2 border-2 py-1 px-3 w-full rounded-md"
            name="desc"
            id="desc"
          />
          <br />
          <input
            className="bg-primary cursor-pointer text-center px-4 mt-3 py-2 text-2xl font-md rounded-lg text-white"
            type="submit"
            value="Add Task"
          />
        </form>
      </div>
      <h1 className="text-3xl text-bold mt-16 mb-2 text-primary uppercase">
        add todo from list:{" "}
      </h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {todos.map((todo) => (
          <EachTodo key={todo.id} each={todo}></EachTodo>
        ))}
      </div>
    </div>
  );
};

export default Home;
