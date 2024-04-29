import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import Header from "./Header";
import { validateAd } from "../utils/validate";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {  collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import UserContext from "../context/UserContext";
const CreateSell = () => {
  const { user } = useContext(UserContext);
  console.log(user.uid, "user details");
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const title = useRef(null);
  const category = useRef(null);
  const description = useRef(null);
  const price = useRef(null);
  const photo = useRef(null);
  const date = new Date();
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleButtonClick = () => {
    const message = validateAd(
      title.current.value,
      category.current.value,
      description.current.value,
      price.current.value,
      photo.current.value
    );
    setErrorMessage(message);
    if (!message) {
      const file = photo.current.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, `/image/${file.name}`);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((url) => {
          console.log(url);
          // Use the initialized Firestore instance to add a document
          const adsCollection = collection(db, "ads");
          addDoc(adsCollection, {
            title: title.current.value,
            category: category.current.value,
            description: description.current.value,
            price: price.current.value,
            url: url,
            userId: user?.uid,
            userName:user?.displayName,
            createdAt: date.toString(),
          })
            .then((docRef) => {
              navigate('/')
              console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        });
      });
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/sell");
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <Header />
      <div className="w-1/3 mx-auto mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">POST YOUR AD</h1>
        <hr className="border-b border-gray-300 mb-4" />
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="adTitle"
            >
              Ad Title *
            </label>
            <input
              ref={title}
              id="adTitle"
              type="text"
              placeholder="Enter the title for your product"
              className="px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="category"
            >
              Category *
            </label>
            <select
              ref={category}
              id="category"
              className="px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="books">Books</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description *
            </label>
            <textarea
              ref={description}
              id="description"
              placeholder="Enter the description for your product"
              className="px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="price"
            >
              SET A PRICE*
            </label>
            <input
              ref={price}
              id="price"
              type="text"
              placeholder="Enter the price for your product"
              className="px-3 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              UPLOAD PHOTOS *
            </label>
            <input
              ref={photo}
              type="file"
              onChange={handleChange}
              className="w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
            <img src={file} />
          </div>
          {errorMessage && (
            <p className="font-bold text-red-700">{errorMessage}</p>
          )}
          <button
            type="submit"
            onClick={handleButtonClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          >
            Post Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSell;
