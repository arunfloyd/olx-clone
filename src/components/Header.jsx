import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
const Header = () => {
  const { user } = useContext(UserContext);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
       
      })
      .catch((error) => {
        console.log(error)
      });
  };


  return (
    <div className="flex w-screen bg-gray-400 h-20 p-3 ">
    
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="w-38 h-38 m-2 "
      >
        <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z" />
      </svg>
   
      <select className="border-black px-14 m h-14 w-18 rounded bg-white hover:border-cyan-400">
        <option>Select Your Location</option>
        <option>India</option>
        <option>Kozhikode</option>
        <option>Kerala</option>
      </select>
      <input
        type="text"
        placeholder="Find Cars, Mobile Phones and more..."
        className="px-2 py-1 border border-black w-7/12 mx-2 rounded hover:border-cyan-400" // Adjust the width here (e.g., w-64 for 16rem)
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 1024 1024"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14  text-white bg-green-950 p-2" // Set text color to white
      >
        <path d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z" />
      </svg>

      <select className="px-8 bg-transparent appearance-none font-extrabold ">
        <option>English ⌄</option>
        <option>Malayalam</option>
        <option>Hindi</option>
      </select>
      <Link to="/sell">
      <button className="font-bold rounded-3xl relative overflow-hidden m-1 py-2" >
        <span className="absolute inset-0 bg-gradient-to-tl from-green-500 to-blue-500 rounded-lg"></span>
        <span className="relative z-10 px-5  ">
          {" "}
          <span className=" font-extrabold text-2xl">+ </span>SELL
        </span>
      </button>
      </Link>
      <div>
        <h1 className="font-bold px-8">Hi! {user.displayName} </h1>
 <button className="rounded-lg px-7 py-3 font-extrabold" onClick={handleLogOut}>Logout</button>

       
      </div>
    </div>
  );
};

export default Header;
