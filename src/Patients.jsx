import { useState, useEffect } from 'react' 
import './App.css'
import axios from 'axios';
import Header from './Header'
import Sidebar from './Sidebar'
import 
{ BsHouseDoorFill,BsFillExclamationTriangleFill,  BsPeopleFill}
 from 'react-icons/bs'



const patients = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const [patientVitalsData, setPatientVitalsData] = useState([]);
// Utilisation de useEffect pour charger les données vital des patient au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/patient_vitals');
            setPatientVitalsData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);



  return (
    
        <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <div className='main-cards'>
        {patientVitalsData.map(item => (
            <div key={item._id}  className='card'>
                <div  className='card-inner'>
                    <h3>{"Patients"}</h3>
                    <BsFillExclamationTriangleFill className='card_icon'/>
                </div>
                <h1>{item.Patients}</h1>
            </div>
        ))}
        {patientVitalsData.map(item => (
            <div key={item._id}  className='card'>
                <div  className='card-inner'>
                    <h3>{"Sick"}</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{item.Sick}</h1>
            </div>
        ))}
        {patientVitalsData.map(item => (
            <div key={item._id}  className='card'>
                <div  className='card-inner'>
                    <h3>{"Healthy"}</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{item.well}</h1>
            </div>
        ))}
        {patientVitalsData.map(item => (
            <div key={item._id}  className='card'>
                <div  className='card-inner'>
                    <h3>{"Dead"}</h3>
                    <BsHouseDoorFill className='card_icon'/>
                </div>
                <h1>{item.Dead}</h1>
            </div>
        ))}
    </div>
      </main>

      
    </div>

    

    
  )
}

export default patients