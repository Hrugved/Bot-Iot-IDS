import React, { useEffect, useState } from "react";
import Lower from "./Lower";
import styles from "./styles.module.css";

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

  return (
    <div className={styles.root}>
      <div className={styles.uppperBox}>upper</div>
      <div className={styles.lowerBox}> <Lower data={data}/></div>
    </div>
  );
};

export default Server;