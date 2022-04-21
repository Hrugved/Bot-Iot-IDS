import React, { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios-server"

const Client = (props) => {

  const [ip,setIp] = useState("0.0.0.0")
  const [system,setSystem] = useState("")

  const [init,setInit] = useState(false)
  const [name,setName] = useState("")
  // const [name,setName] = useState("Hrugved")
  const [active,setActive] = useState(false)
  const [id,setId] = useState(-1)

  const register = async (_ip,_system) => {
    const { data } = await axios.post('/register', {
      client_name: name,
      client_system: _system,
      ip: _ip
    });
    setId(data.data.client_id)
  }

  useEffect(() => {
    if(init) {
      const ip_ = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))
      setIp(ip_)
      const arr = ['Window','Linux','Mac']
      const system_ = arr[Math.floor(Math.random() * arr.length)]
      setSystem(system_)
      register(ip_,system_)
    }
  },[init])

  return (
    <div className={styles.root}>
      {!init && (
        <div className={styles.input_wrapper}>
            <input onChange={(e) => setName(e.target.value)} 
             onKeyPress={e => {if (e.key === 'Enter') setInit(true)}}
             type="text" className={styles.input_text} 
             placeholder="please enter client name..."/>
        </div>
      )}
      {init && (
      // {!init && (
        <Fragment>
      <div className={styles.info}>
        <div className={styles.name_box}>
          <p className={styles.name}>{name}</p>
        </div>
        <div className={styles.system_box}>
          <p className={styles.system}>{system}</p>
        </div>
        <div className={styles.ip_box}>
          <p className={styles.ip}>{ip}</p>
        </div>
        {active && (<div className={styles.active_box}>
          <p className={styles.status}>active</p>
        </div>)}

        {!active && (<div className={styles.inactive_box}>
          <p className={styles.status}>inactive</p>
        </div>)}
        
      </div>
      
      <div className={styles.timer_box}>
        {active && <p className={styles.timer}>00:00:00</p>}
        {!active && <p className={styles.timer_stop}>00:00:00</p>}
      </div>

      <div className={styles.lower_box}>

        <div className={styles.control_box}>
          <div className={styles.start_box} onClick={() => setActive(true)}>
            <p className={styles.start}>start</p>
          </div>
          <div className={styles.stop_box} onClick={() => setActive(false)}>
            <p className={styles.stop}>stop</p>
          </div>
        </div>

        <div className={styles.packet_number_box}>
          <p className={styles.packet_number}>00000</p>
        </div>

        <div className={styles.packets_box}>
        <div className={styles.packets_wrapper}>
          <p className={styles.packets}>{String.raw`{"id":573361,"seq":"199657","stddev":"1.6369049999999998","N_IN_Conn_P_SrcIP":"11","min":"0.0","state_number":"1","mean":"2.31042","N_IN_Conn_P_DstIP":"100","drate":"0.0","srate":"0.378219","max":"3.590756"}`}</p>
          <p className={styles.packets}>{String.raw`{"id":51,"seq":"199657","stddev":"1.6369049999999998","N_IN_Conn_P_SrcIP":"11","min":"0.0","state_number":"1","mean":"2.31042","N_IN_Conn_P_DstIP":"100","drate":"0.0","srate":"0.378219","max":"3.590756"}`}</p>
        </div>
        </div>

      </div>

    </Fragment>
    )}
        </div>

  );
};

export default Client;