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
  const [packets, setPackets] = useState([])
  const [packetNum,setPacketNum] = useState(0)
  const [intervalId, setIntervalId] = useState(null);

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

  const sendPacket = async () => {
    console.log('sendPacket');
    const { data } = await axios.get('/send', {
      params: {client_id: id}
    });
    setPackets(oldArray => [data[0],...oldArray])
    setPacketNum(x => x+1)
  }


  useEffect(() => {
    if(id>0) {
      if(active) {
        const intervalId_ = setInterval(() => {  //assign interval to a variable to clear it.
          sendPacket()
        }, 1000)
        setIntervalId(intervalId_)
      } else {
        clearInterval(intervalId);
        setIntervalId(null)
      }
      
      return () => clearInterval(intervalId); //This is important
    }
  }, [id,active])

  const handleStart = () => {
    setActive(true)
  }

  const handleStop = () => {
    setActive(false)
  }

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
          <div className={styles.start_box} onClick={() => handleStart()}>
            <p className={styles.start}>start</p>
          </div>
          <div className={styles.stop_box} onClick={() => handleStop()}>
            <p className={styles.stop}>stop</p>
          </div>
        </div>

        <div className={styles.packet_number_box}>
          <p className={styles.packet_number}>{packetNum}</p>
        </div>

        <div className={styles.packets_box}>
        <div className={styles.packets_wrapper}>
          {packets.map(p => (<p key={p.id} className={styles.packets}>{String.raw`${JSON.stringify(p)}`}</p>))}
        </div>
        </div>

      </div>

    </Fragment>
    )}
        </div>

  );
};

export default Client;