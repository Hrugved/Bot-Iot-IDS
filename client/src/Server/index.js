import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Server = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      server
    </div>
  );
};

export default Server;