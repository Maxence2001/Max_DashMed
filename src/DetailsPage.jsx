import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header'
import Sidebar from './Sidebar'
const DetailsPage = () => {
    // Récupère l'ID du patient depuis les paramètres d'URL
    const { id } = useParams();
    // State pour stocker les données du patient et ses historiques
    const [patient, setPatient] = useState(null);
    const [historiques, setHistoriques] = useState([]);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
// Effectue une requête pour récupérer les détails du patient en fonction de l'ID
    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/patient/${id}`);
                setPatient(response.data);
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        };

        fetchPatient();
    }, [id]);

// Effectue une requête pour récupérer les historiques du patient une fois que les détails du patient sont récupérés
    useEffect(() => {
        if (patient) {
            const fetchHistoriques = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/historiques/${patient.nom}`);
                    setHistoriques(response.data);
                } catch (error) {
                    console.error('Error fetching historiques:', error);
                }
            };

            fetchHistoriques();
        }
    }, [patient]);


  
  return (
   <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
     <main className='main-container'>
        <div className='main-cards'>
     

{historiques.length > 0 ? (
                <div className='card'>
                    <h3 className='unlinke'>Historique du patient :</h3>
                    <ul className='unlinke'>
                        {historiques.map((historiques, index) => (
                            <li key={index}>
                                <p>Nom: {historiques.nom}</p>
                                <p>Entre: {historiques.entre}</p>
                                 <p>Sortie: {historiques.sortie}</p>
                                 <p>Frais: {historiques.frais}</p>
                                 <p>Cas: {historiques.cas}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Pas dhistorique disponible.</p>
            )}
  </div>
    </main>
   </div>
  )
}

export default DetailsPage