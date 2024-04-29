import { useParams } from "react-router-dom";
import { db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Header from "./Header";

const DetailPage = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const docRef = doc(db, "ads", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDetails({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchDetails();
  }, [id]);
  return (
    <div>
      <Header />
      {details && (
        <div style={{ textAlign: "center" }}>
      <h1 className="text-2xl font-bold underline pt-12"> Product Details</h1>

          <img
            className="mt-4 mx-auto "
            style={{ maxWidth: "50%", maxHeight: "50%" }}
            alt="Product Image"
            src={details.url}
          />
          <h2 style={{ fontWeight: "bold", fontSize: "1.5rem" }}>{details.title}</h2>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Price: {details.price}</p>
          <p style={{ fontSize: "1.2rem" }}>Description: {details.description}</p>
          <p style={{ fontSize: "1.2rem" }}>User Posted: {details?.userName}</p>

        </div>
      )}
    </div>
  );
  
};

export default DetailPage;
