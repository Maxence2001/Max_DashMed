import { useState, useEffect } from 'react' 
import './App.css'
import axios from 'axios';
import Header from './Header'
import Sidebar from './Sidebar'
import 
{   BsPeopleFill}
 from 'react-icons/bs'

const Nurses = () => {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const [nursesData, setNursesData] = useState([]);
// Utilisation de useEffect pour charger les données des infimiere au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/nurses');
            setNursesData(response.data);
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
        {nursesData.map(item => (
            <div key={item._id}  className='card'>
                <div  className='card-inner'>
                    <h3>{"Nom:"}</h3>
                    <h3>{item.nom}</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <div><h3>{"Service:"}</h3>
                <h1>{item.Servise}</h1></div>
                
            </div>
        ))}
        </div>
        </main>

      
</div>
  )
}

export default Nurses