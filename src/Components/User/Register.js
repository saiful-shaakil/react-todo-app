import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import LoadingPage from "../OthersPage/LoadingPage";

const Register = () => {
  //to navigate the user
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  //to create account by email and password
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  //to update name
  const [updateProfile, updating, errorOfProf] = useUpdateProfile(auth);
  const formSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confPassword = e.target.confPassword.value;
    if (!name || !email || !password || !confPassword) {
      toast("Please fill the form first.");
    }
    if (name && email && password === confPassword) {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName: name });
    }
  };
  if (loading || updating) {
    return <LoadingPage></LoadingPage>;
  }
  if (user) {
    navigate(from, { replace: true });
  }
  return (
    <div className="flex justify-center mt-10 mb-20">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center">Register</h2>
          <form onSubmit={formSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="my-2 border-2 py-1 px-3 w-full rounded-md"
              name="name"
              id="name"
            />
            <br />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="my-2 border-2 py-1 px-3 w-full rounded-md"
              name="email"
              id="email"
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="my-2 border-2 py-1 px-3 w-full rounded-md"
              name="password"
              id="password"
            />
            <br />
            <label htmlFor="confPassword">Confirm Password</label>
            <input
              type="password"
              className="my-2 border-2 py-1 px-3 w-full rounded-md"
              name="confPassword"
              id="confPassword"
            />
            <br />
            <input
              type="submit"
              className="btn btn-primary uppercase font-bold bg-gradient-to-r from-gray-800 mt-2 w-full to-gray-900 text-white"
              value="Register"
              id=""
            />{" "}
            <br />
          </form>
          <div className="text-center rounded-box place-items-center">
            Already have an account? &nbsp;
            <Link to="/login" className="text-secondary">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
