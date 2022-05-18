import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";

const EachTodo = (each) => {
  const [user, loading, error] = useAuthState(auth);
  const { title } = each.each;
  const navigate = useNavigate();
  const addTask = () => {
    if (!user) {
      toast("Please login first");
      navigate("/login");
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
