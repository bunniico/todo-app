import React from "react";
import { Button, Zoom, Fab} from "@mui/material";

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <Zoom in={true} style={{ transitionDelay: "200ms", transitionBehavior: "ease-in-out" }}>
    <Fab
        color="primary"
        onClick={onClick}
        style={{
        position: "fixed",
        bottom: "5%",
        right: "2.5%",
        fontSize: "2rem",
        borderRadius: "50%",
        width: "5rem",
        height: "5rem",
        minWidth: 0,
        padding: 0,
        backgroundColor: "primary",
        color: "#fff",
        boxShadow:
        "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
        }}
      >
        +
    </Fab>
    </Zoom>
  );
};

export default AddTaskButton;