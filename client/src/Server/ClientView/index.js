import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios-server"

const ClientView = ({client,setClient}) => {

  const [intervalTimerId, setIntervalTimerId] = useState(null);
  const [time,setTime] = useState("")

  useEffect(() => {
      if(client.active) {
        const intervalId_ = setInterval(() => {  //assign interval to a variable to clear it.
          setTime(msToHMS(Date.now() - client.start_time))
          console.log(time);
        }, 1000)
        setIntervalTimerId(intervalId_)
      } else {
        setTime("00:00:00")
        clearInterval(intervalTimerId);
        setIntervalTimerId(null)
      }
      return () => clearInterval(intervalTimerId); //This is important
    }, [])

  function msToHMS(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms  / 1000 / 3600 ) % 24)

    const humanized = [
      hours.toString().padStart(2,'0'),
      minutes.toString().padStart(2,'0'),
      seconds.toString().padStart(2,'0')
    ].join(':');
  
    return humanized;
  }

  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <div className={styles.back_box} onClick={() => setClient(-1)}>
          <p className={styles.back}>Main</p>
        </div>
        <div className={styles.name_box}>
          <p className={styles.name}>{client.client_name}</p>
        </div>
        <div className={styles.system_box}>
          <p className={styles.system}>{client.client_system}</p>
        </div>
        <div className={styles.ip_box}>
          <p className={styles.ip}>{client.ip}</p>
        </div>
        {client.active && (<div className={styles.active_box}>
          <p className={styles.status}>active</p>
        </div>)}

        {!client.active && (<div className={styles.inactive_box}>
          <p className={styles.status}>inactive</p>
        </div>)}
        
      </div>
      
      <div className={styles.timer_box}>
        {client.active && <p className={styles.timer}>{time}</p>}
        {!client.active && <p className={styles.timer_stop}>00:00:00</p>}
      </div>

    </div>

  );
};

export default ClientView;