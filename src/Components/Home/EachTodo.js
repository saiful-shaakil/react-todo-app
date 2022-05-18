import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";

const EachTodo = (each) => {
  const [user] = useAuthState(auth);
  const { title } = each.each;
  const navigate = useNavigate();
  const addTask = () => {
    const todo = {
      title: title,
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
    }
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-black">{title}</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores,
          atque!
        </p>
        <div className="card-actions">
          <button onClick={addTask} className="btn btn-primary">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default EachTodo;
