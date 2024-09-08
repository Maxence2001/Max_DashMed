import { useState, useEffect } from 'react' 
import './App.css'
import axios from 'axios';
import Header from './Header'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import 
{ BsFillExclamationTriangleFill}
 from 'react-icons/bs'

const Bed = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  

  const [bedavailabilityData, setbedavailabilityData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
// Utilisation de useEffect pour charger les données au montage du composant
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/bed_availability');
            setbedavailabilityData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);
// Fonction pour obtenir le type de chambre en fonction du nombre de lits
const getRoomType = (beds) => {
  if (beds === 1) {
      return 'VIP Room';
  } else if (beds === 2) {
      return 'Couple Room';
  } else if (beds === 5) {
      return 'Chambre Simple';
  } else if (beds === 10) {
      return 'Chambre Populaire';
  } else {
      return 'Unknown Room Type';
  }
};
// Fonction pour gerer le clic sur un élément de la liste
const handleItemClick = (item) => {
  setSelectedRoom(item);
};
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <div className='main-cards'>
        {bedavailabilityData.map(item => (
            <div key={item._id} onClick={() => handleItemClick(item)} style={{ backgroundColor: item.use === item.Beds ? 'red' : item.use > 0 ? 'orange' : 'green' }} className='card'>
              <Link to={`/SavingPage/${item._id}`} className='unlinke'>
                <div  className='card-inner' >
                    <h3>{"Room"}</h3>
                    <h3>{item.Room}</h3>
                    <BsFillExclamationTriangleFill className='card_icon'/>
                </div>
                <h3>{"Beds free"}</h3>
                <h1>{item.Beds - item.use}</h1>
                <h3>{"Room Type"}</h3>
                <h2>{getRoomType(item.Beds)}</h2>
              </Link>
            </div>
        ))}
        
    </div>

    {selectedRoom && (
                    <div>
                        <h3>Details de la chambre sélectionné :</h3>
                        <p>Room: {selectedRoom.Room}</p>
                        <p>Beds: {selectedRoom.Beds}</p>
                        <p>Used Beds: {selectedRoom.use}</p>
                    </div>
                )}
      </main>

      
    </div>
  )
}

export default Bed