import React from "react";
import { createUseStyles } from 'react-jss';

const Button = (props) => {
    const useStyles = createUseStyles({
        myClass: {
          margin: {
            top: 16
          },
          backgroundColor: "red",
          padding: 10,
          color: "white",
          border: "none",
          cursor: "pointer"
        }
      });
      const classes = useStyles();
  return (
    <button className={classes.myClass} onClick={props.onClick}> {props.children} </button>
  );
};
export default Button;