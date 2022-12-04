import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import { database } from "../firebase";

function Comment({ postData }) {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (postData.comments) {
      async function fetchData() {
        let arr = [];
        for (let i = 0; i < postData.comments.length; i++) {
          let data = await database.comments.doc(postData.comments[i]).get();
          arr.push(data.data());
        }
        setComments(arr);
      }
      fetchData();
    }
  }, [postData]);

  return (
    <div>
      {comments == null ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          {comments.map((comment, index) => (
            <div style={{ display: "flex" }} key={index}>
              <Avatar
                src={comment.uProfileImage}
                style={{ marginLeft: "4px", marginTop: "4px" }}
              />
              <p>
                &nbsp;
                <span
                  style={{
                    fontWeight: "bold",
                    fontFamily: "serif",
                    color: "royalblue",
                  }}
                >
                  {comment.uName}
                </span>
                &nbsp;&nbsp;
                <span style={{ fontFamily: "Lucida Consol" }}>
                  {comment.text}
                </span>
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Comment;
