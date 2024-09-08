import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Header'
import Sidebar from './Sidebar'

const AppointmentPage = () => {
  // State pour gerer l'ouverture et la fermeture du Sidebar
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  // State pour gérer les donnees du formulaire de prise de rendez-vous
    const [nom, setNom] = useState('');
    const [date, setDate] = useState('');
    const [heure, setHeure] = useState('');
    const [appointments, setAppointments] = useState([]);

// Utilisation de useEffect pour charger les rendez-vous existants une seule fois lors du chargement de la page
    useEffect(() => {
      const fetchAppointments = async () => {
          try {
              const response = await axios.get('http://localhost:5000/appointments');
              setAppointments(response.data);
          } catch (error) {
              console.error('Error fetching appointments:', error);
          }
      };

      fetchAppointments();
  }, []);
 // Fonction pour soumettre le formulaire de prise de rendez-vous
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/appointments', { nom, date, heure });
            alert('Rendez-vous pris avec succès !');
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Une erreur s\'est produite. Veuillez réessayer.');
        }
    };
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <div className="form-container">
        <h2>Prise de rendez-vous</h2>
            <form onSubmit={handleSubmit}>
               <div > 
                <label>
                    Nom:
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                </label></div>
                <label>
                    Date:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <label>
                    Heure:
                    <input type="time" value={heure} onChange={(e) => setHeure(e.target.value)} required />
                </label>
                <button type="submit">Prendre rendez-vous</button>
            </form>
            <div className="appointments-list">
                <div  className="appointment-card ">
                
                <h3>Rendez-vous pris :</h3>
                {appointments.map((item) => (
                    <div key={item._id} className="appointment-item">
                      <div className='card-inner'>
                      <p><strong>Nom:</strong> {item.nom}</p>
                        <p><strong>Date:</strong> {item.date}</p>
                        <p><strong>Heure:</strong> {item.heure}</p>
                      </div>
                        
                  </div>
                ))}
                </div>
            </div>
    </div>
      </main>
    </div>
  )
}

export default AppointmentPage