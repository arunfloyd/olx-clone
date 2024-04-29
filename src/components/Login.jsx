import { useRef, useState } from "react";
import { auth } from "../utils/firebase";
import { validateInput } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { setUser } = useContext(UserContext);
  const [isSignInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const toggleSignForm = () => {
    setSignInForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    const message = validateInput(email.current.value, password.current.value,name.current.value);
    setErrorMessage(message);

    if (!isSignInForm && message===null) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          });
          setUser(user);
          navigate("/browse");
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else if( message===null) {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user, "userDetails");
          setUser(user);
          navigate("/browse");
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };
  return (
    <div className="bg-black">
      <div className="rounded-2lg">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute w-3/12 p-12 bg-orange-400 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        >
          <div className="flex ">
            <h1 className="font-extrabold text-3xl">  &nbsp; </h1>
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="w-28 h-38 mx-28"
            >
              <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z" />
            </svg>
          </div>

          {!isSignInForm ? (
            <h1 className="font-bold text-3xl py-4">Sign Up</h1>
          ) : (
            <h1 className="font-bold text-3xl py-4 ">Sign In</h1>
          )}
          {!isSignInForm ? (
            <input
              ref={name}
              type="Name"
              placeholder=" Full Name"
              className="p-4 my-4 w-full bg-gray-600 opacity-70 rounded-lg"
            />
          ) : (
            ""
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email or mobile number"
            className="p-4 my-4 w-full bg-gray-600 opacity-70 rounded-lg"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-600 opacity-70 rounded-lg"
          />
          <p className="text-center font-bold text-red-700">{errorMessage}</p>

          <button
            className="p-4 my-6 bg-blue-800 w-full rounded-lg "
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            className="p-2 m-2 cursor-pointer hover:font-extrabold"
            onClick={toggleSignForm}
          >
            {isSignInForm
              ? "New to OLX ? Sign Up"
              : "Already a User ? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
