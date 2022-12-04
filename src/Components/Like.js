import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { database } from "../firebase";
import "../Components/Like.css";

function Like({ userData, postData }) {
  const [like, setLike] = useState(null);

  const handleLike = () => {
    if (like === true) {
      let narr = postData.likes.filter((el) => el !== userData.userId);
      database.posts.doc(postData.postId).update({
        likes: narr,
      });
    } else {
      let narr = [...postData.likes, userData.userId];
      database.posts.doc(postData.postId).update({
        likes: narr,
      });
    }
  };

  useEffect(() => {
    let check = postData.likes.includes(userData.userId) ? true : false;
    setLike(check);
  }, [postData, userData.userId]);

  return (
    <>
      {like != null ? (
        <>
          {like === true ? (
            <FavoriteIcon className="icon-styling like" onClick={handleLike} />
          ) : (
            <FavoriteIcon
              className="icon-styling unlike"
              onClick={handleLike}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Like;
