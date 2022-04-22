import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios-server"

const View = ({clients,setClient}) => {

  return (
    <div className={styles.root}>
      <div className={styles.list_box}>
        {clients.map(c => {
          const boxClass = c.active ? styles.active_box : styles.inactive_box
          return (
            <div key={c.client_id} className={boxClass} onClick={() => setClient(c.client_id)}>
              <p>{c.client_name}</p>
            </div>
          )
        })}
      </div>
      <div className={styles.stats}>
        <div className={styles.activenum_box}>
          <p className={styles.active_text}>Active</p>
          <p className={styles.active_num}>11111</p>
        </div>
        <div className={styles.inactivenum_box}>
          <p className={styles.inactive_text}>Inactive</p>
          <p className={styles.inactive_num}>222</p>
        </div>
      </div>
    </div>

  );
};

export default View;