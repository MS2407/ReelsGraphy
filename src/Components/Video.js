import React from "react";
import "../Components/Video.css";
import ReactDOM from "react-dom";

function Video(props) {
  const handleClick = (e) => {
    e.preventDefault(); //playandPause
    e.target.muted = !e.target.muted;
  };

  const handleScroll = (e) => {
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;

    if (next && props.open === null) {
      next.scrollIntoView();
      e.target.muted = false;
    }
  };

  return (
    <video
      src={props.src}
      className="video-styling"
      onEnded={handleScroll}
      onClick={handleClick}
      muted="muted"
    ></video>
  );
}

export default Video;
