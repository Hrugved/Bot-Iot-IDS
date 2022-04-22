import React, { useEffect, useState } from "react";
import Lower from "./Lower";
import styles from "./styles.module.css";
import ClientView from "./ClientView";
import View from "./View";
import DateRangePicker from 'rsuite/DateRangePicker';

const Server = (props) => {
  
  const [data,setData] = useState({DDoS: {
    count: 8,
    subcategory: {
        Data_Exfiltration: 4,
        HTTP: 1,
        Keylogging: 1,
        Normal: 2,
        OS_Fingerprint: 0,
        Service_Scan: 1,
        TCP: 9,
        UDP: 5
    }
  },
  DoS: {
    count: 224,
    subcategory: {
        Data_Exfiltration: 11,
        HTTP: 13,
        Keylogging: 14,
        Normal: 15,
        OS_Fingerprint: 25,
        Service_Scan: 145,
        TCP: 1,
        UDP: 0
    }
  },
  Normal: {
    count: 6,
    subcategory: {
        Data_Exfiltration: 3,
        HTTP: 0,
        Keylogging: 0,
        Normal: 0,
        OS_Fingerprint: 1,
        Service_Scan: 0,
        TCP: 2,
        UDP: 0
    }
  },
  Reconnaissance: {
    count: 46,
    subcategory: {
        Data_Exfiltration: 0,
        HTTP: 1,
        Keylogging: 1,
        Normal: 1,
        OS_Fingerprint: 39,
        Service_Scan: 0,
        TCP: 4,
        UDP: 0
    }
  },
  Theft: {
    count: 9,
    subcategory: {
        Data_Exfiltration: 1,
        HTTP: 1,
        Keylogging: 1,
        Normal: 1,
        OS_Fingerprint: 2,
        Service_Scan: 1,
        TCP: 1,
        UDP: 1
    }
  }})

  const clients = [
  {
    client_id: 1,
    client_name: 'ruke2',
    client_system: 'linux',
    ip: '8.8.8.9',
    start_time: Date.now(),
    active: true
  },
  {
    client_id: 2,
    client_name: 'hrug',
    client_system: 'Window',
    ip: '123.10.8.9',
    start_time: Date.now(),
    active: false
  },{
    client_id: 1,
    client_name: 'ruke2',
    client_system: 'linux',
    ip: '8.8.8.9',
    start_time: Date.now(),
    active: true
  },
  {
    client_id: 2,
    client_name: 'hrug',
    client_system: 'Window',
    ip: '123.10.8.9',
    start_time: Date.now(),
    active: false
  },{
    client_id: 1,
    client_name: 'ruke2',
    client_system: 'linux',
    ip: '8.8.8.9',
    start_time: Date.now(),
    active: true
  },
  {
    client_id: 2,
    client_name: 'hrug',
    client_system: 'Window',
    ip: '123.10.8.9',
    start_time: Date.now(),
    active: false
  },{
    client_id: 1,
    client_name: 'ruke2',
    client_system: 'linux',
    ip: '8.8.8.9',
    start_time: Date.now(),
    active: true
  },
  {
    client_id: 2,
    client_name: 'hrug',
    client_system: 'Window',
    ip: '123.10.8.9',
    start_time: Date.now(),
    active: false
  },{
    client_id: 1,
    client_name: 'ruke2',
    client_system: 'linux',
    ip: '8.8.8.9',
    start_time: Date.now(),
    active: true
  },
  {
    client_id: 2,
    client_name: 'hrug',
    client_system: 'Window',
    ip: '123.10.8.9',
    start_time: Date.now(),
    active: false
  },{
    client_id: 1,
    client_name: 'ruke2',
    client_system: 'linux',
    ip: '8.8.8.9',
    start_time: Date.now(),
    active: true
  },
  {
    client_id: 2,
    client_name: 'hrug',
    client_system: 'Window',
    ip: '123.10.8.9',
    start_time: Date.now(),
    active: false
  },
]


const [intervalLower,setIntervalLower] = useState(0);
const [intervalUpper,setIntervalUpper] = useState(Date.now());
const [client,setClient] = useState(-1)

const handleSelectRange = (e) => {
  setIntervalLower(e[0].getTime())
  setIntervalUpper(e[1].getTime())
}

  return (
    <div className={styles.root}>
      <div className={styles.uppperBox}>
        {client<0 && <View clients={clients} setClient={setClient}/>}
        {client>0 && <ClientView client={clients[0]} setClient={setClient}/>}
      </div>
      <div className={styles.midBox}>
        <DateRangePicker format="yyyy-MM-dd HH:mm:ss" onChange={(e) => handleSelectRange(e)}/>
      </div>
      <div className={styles.lowerBox}><Lower data={data}/></div>
    </div>
  );
};

export default Server;