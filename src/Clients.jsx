import { useState, useEffect } from 'react' 
import './App.css'
import axios from 'axios';
import Header from './Header'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import 
{   BsPeopleFill}
 from 'react-icons/bs'

const Clients = () => {
    // State pour gérer l'ouverture et la fermeture du Sidebar
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const [patientData, setPatientData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

// Utilisation de useEffect pour effectuer une requête GET au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/patient');
            setPatientData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);
// Fonction pour gérer le clic sur un patient et afficher ses détails
const handleItemClick = (item) => {
    setSelectedPatient(item);
};
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <div className='main-cards'>
        {patientData.map(item => (
            <div className='card' key={item._id}>
                <Link to={`/Details/${item._id}`} className='unlinke'>
                    <div className='card-inner' onClick={() => handleItemClick(item)}>
                            <h3>{"Nom:"}</h3>
                            <h3>{item.nom}</h3>
                            <BsPeopleFill className='card_icon'/>
                    </div>
                        <div><h3>{"Age:"}</h3>
                        <h1>{item.age}</h1></div>
                        <div><h3>{"Nombre de visites: "}</h3>
                        <h1>{item.Num } {item. num} {item.visits}</h1></div>
                </Link>
            </div>
        ))}
        {/* {patientVitalsData.map(item => (
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
        ))} */}
    </div>
    {selectedPatient && (
                    <div>
                        <h3>Details du patient sélectionné :</h3>
                        <p>Nom: {selectedPatient.nom}</p>
                        <p>Age: {selectedPatient.age}</p>
                        <p>Nombre de visites: {selectedPatient.Num}</p>
                    </div>
                )}
      </main>

      
    </div>
  )
}

export default Clients