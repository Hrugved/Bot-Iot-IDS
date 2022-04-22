import React,{useEffect,useState} from "react";
import styles from "./styles.module.css";

const Lower = ({data}) => {

  // const category = ['DDoS', 'DoS', 'Normal', 'Reconnaissance', 'Theft']
  // const subcategory = ['Data_Exfiltration','HTTP','Keylogging','Normal','OS_Fingerprint','Service_Scan','TCP','UDP']
  const [cat,setCat] = useState({
    DDoS: 0,
    DoS: 0,
    Normal: 0,
    Reconnaissance: 0,
    Theft: 0,
  })
  const [sub,setSub] = useState({
    Data_Exfiltration: 0,
    HTTP: 0,
    Keylogging: 0,
    Normal: 0,
    OS_Fingerprint: 0,
    Service_Scan: 0,
    TCP: 0,
    UDP: 0,
  })
  const [packets,setPackets] = useState(0)
  const [vuls,setVuls] = useState(0)

  const setData = () => {
    const cat_ = {...cat}
    const sub_ = {...sub}
    let packets_ = 0
    Object.entries(data).forEach(([c,cv]) => {
      cat_[c] = cv.count
      packets_ += cv.count
      Object.entries(cv.subcategory).forEach(([s,sv]) => {
        sub_[s] += sv
      })
    });
    setCat(cat_)
    setSub(sub_)
    setPackets(packets_)
    setVuls(packets_-cat_['Normal'])
  }

  useEffect(() => {
    // console.log('data'+JSON.stringify(data));
    
    // console.log('cat_'+JSON.stringify(cat_));
    // console.log('sub_'+JSON.stringify(sub_));
    setData()
    // console.log('cat_u'+JSON.stringify(cat_));
    // console.log('sub_u'+JSON.stringify(sub_));
  },[])

  return (
    <div className={styles.root}>
      <div className={styles.packets}>{packets}</div>
      <div className={styles.vulnerability}>{vuls}</div>
      <div className={styles.categories}>
        {Object.entries(cat).map(([c,v]) => (
          <div className={styles.cat_box}>
            <p className={styles.cat_name}>{c}</p>
            <p className={styles.cat_val}>{v}</p>
          </div>
        ))}
      </div>
      <div className={styles.subcategories}>
        {Object.entries(sub).map(([s,v]) => (
          <div className={styles.sub_box}>
            <p className={styles.sub_name}>{s}</p>
            <p className={styles.sub_val}>{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lower;