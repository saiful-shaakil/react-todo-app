import React, { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import LoadingPage from "../OthersPage/LoadingPage";
import auth from "../firebase.init";

const Login = () => {
  //to navigate the user
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  //to get email for password reset
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const useEmail = useRef("");
  //to login by email and password
  const [
    signInWithEmailAndPassword,
    userOfEmail,
    loadingOfEmail,
    errorOfEmail,
  ] = useSignInWithEmailAndPassword(auth);
  //to sign in by google
  const [signInWithGoogle, userOfGoog, loadingOfGoog, errorOfGoog] =
    useSignInWithGoogle(auth);
  //to create user
  const formSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      toast("Please fill the form first.");
    }
    if (email && password) {
      signInWithEmailAndPassword(email, password);
    }
  };
  //to sign in by google
  const signInByGoogle = () => {
    signInWithGoogle();
  };
  //to reset password
  const forgetPassword = async (e) => {
    const email = useEmail?.current?.value;
    if (email) {
      await sendPasswordResetEmail(email);
    }
  };
  //to show loading
  if (loadingOfEmail || loadingOfGoog) {
    return <LoadingPage></LoadingPage>;
  }
  if (userOfEmail || userOfGoog) {
    navigate(from, { replace: true });
  }
  return (
    <div className="flex justify-center mt-10 mb-20">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center">Login</h2>
          <form onSubmit={formSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              ref={useEmail}
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
            <button onClick={forgetPassword}>Forget Password?</button>
            <input
              type="submit"
              className="btn btn-primary uppercase font-bold bg-gradient-to-r from-gray-800 mt-2 w-full to-gray-900 text-white"
              value="Login"
              id=""
            />{" "}
            <br />
          </form>
          <div className="flex flex-col w-full border-opacity-50">
            <div className="text-center rounded-box place-items-center">
              New to this app?{" "}
              <Link to="/register" className="text-secondary">
                Create New Account
              </Link>
            </div>
            <div className="divider">OR</div>
            <div className="rounded-box place-items-center">
              <button
                onClick={signInByGoogle}
                className="btn bg-white text-black w-full hover:text-white"
              >
                continue with google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
