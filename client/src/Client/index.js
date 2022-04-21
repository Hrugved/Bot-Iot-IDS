import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Client = (props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      client
    </div>
  );
};

export default Client;