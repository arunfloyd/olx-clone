// import React from "react";
import Header from "./Header";
import Card from "./Card";
import { db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
const Browse = () => {
  const [data, setData] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "ads"), (snapshot) => {
        setData(
          snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      }),
    []
  );
  console.log(data);
  return (
    <div>
      <Header />
      <h1 className="text-2xl text-center pt-10">Fresh recommendations</h1>

      <div className="flex p-2 m-12 justify-center">
        {data && data.map((data) => <Card key={data.id} data={data} />)}
      </div>
    </div>
  );
};

export default Browse;
