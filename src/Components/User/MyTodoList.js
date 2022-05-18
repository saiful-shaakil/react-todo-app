import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import LoadingPage from "../OthersPage/LoadingPage";

const MyTodoList = () => {
  const [user, loading] = useAuthState(auth);
  const [myTodo, setMyTodo] = useState([]);
  useEffect(() => {
    fetch(`https://hidden-garden-32672.herokuapp.com/todos/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setMyTodo(data));
  }, [user, myTodo]);
  if (loading) {
    return <LoadingPage></LoadingPage>;
  }
  const completeTask = (id) => {
    fetch(`https://hidden-garden-32672.herokuapp.com/todo/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          toast("Congrats! You have done a task.");
        }
      });
  };
  const deleteTask = (id) => {
    fetch(`https://hidden-garden-32672.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          const exist = myTodo.filter((todo) => id !== todo._id);
          setMyTodo(exist);
          toast("Task is deleted");
        }
      });
  };

  return (
    <div className="overflow-x-auto mx-10 mt-10">
      {myTodo.length > 0 ? (
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myTodo.map((todo, index) => (
              <tr key={todo._id}>
                <th>{index + 1}</th>
                <td className={todo.complete && "text-success"}>
                  {todo.title}
                </td>
                <td>
                  <button
                    disabled={todo.complete}
                    onClick={() => completeTask(todo._id)}
                    className={`btn btn-xs ${
                      todo.complete ? "bg-slate-400" : "bg-success"
                    }`}
                  >
                    {todo.complete === true ? "Completed" : "Complete"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteTask(todo._id)}
                    className="btn btn-xs bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-10">
          {" "}
          You've no todo list.{" "}
          <Link to="/" className="btn btn-xs bg-primary">
            Add Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTodoList;
