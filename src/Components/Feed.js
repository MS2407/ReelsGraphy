import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { database } from "../firebase";
import UploadFile from "./UploadFile";
import Posts from "./Posts";
import "../Components/Feed.css";
import Navbar from "../Components/Navbar";

function Feed() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });
  }, [user]);

  return (
    <div>
      <Navbar userData={userData} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="feedContainer"
      >
        <UploadFile user={userData} />
        <Posts userData={userData} />
      </div>
    </div>
  );
}

export default Feed;
