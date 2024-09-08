import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header'
import Sidebar from './Sidebar'

const SavingPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [save, setSave] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [selectedValue, setSelectedValue] = useState(1);
  const [textValues, setTextValues] = useState(Array(selectedValue).fill(''));
  const [ageValues, setAgeValues] = useState(Array(selectedValue).fill(''));
  const [visitsValues, setVisitsValues] = useState(Array(selectedValue).fill(''));
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
// Effectue une requête pour récupérer les informations de la chambre
  useEffect(() => {
    const fetchRoom = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/bed_availability/${id}`);
            setRoom(response.data);
        } catch (error) {
            console.error('Error fetching patient:', error);
        }
    };

    fetchRoom();
}, [id]);

 // Effectue une requête pour récupérer les données de sauvegarde
useEffect(() => {
  if (room) {
      const fetchSave = async () => {
          try {
              const response = await axios.get(`http://localhost:5000/bed_availability/${room.Room}`);
              setSave(response.data);
          } catch (error) {
              console.error('Error fetching room:', error);
          }
      };

      fetchSave();
  }
}, [room]);
// Génère les options du select en fonction du nombre de lits disponibles dans la chambre
const options = room ? [...Array(room.Beds - room.use).keys()].map((num) => num + 1) : [];
// Gère le changement de valeur dans le select
const handleSelectChange = (event) => {
  const value = parseInt(event.target.value);
  setSelectedValue(value);
  setTextValues(Array(value).fill(''));
  setAgeValues(Array(value).fill(''));
  setVisitsValues(Array(value).fill(''));
  
};
// Gère le changement de valeur dans les champs de texte des noms des patients
const handleTextChange = (index, event) => {
  const newValues = [...textValues];
  newValues[index] = event.target.value;
  setTextValues(newValues);
};

// Gère le changement de valeur dans les champs de texte des âges des patients
const handleAgeChange = (index, event) => {
  const newValues = [...ageValues];
  newValues[index] = event.target.value;
  setAgeValues(newValues);
};
// Gère le changement de valeur dans les champs de texte du nombre de visites des patients
const handleVisitsChange = (index, event) => {
  const newValues = [...visitsValues];
  newValues[index] = event.target.value;
  setVisitsValues(newValues);
};
// Envoie les données des patients à la base de données
const handleSendClick = async () => {
  try {
      await axios.post('http://localhost:5000/patient', { 
        nom: textValues,
        ages: ageValues,
        visits: visitsValues
    });
    
    const bedAvailabilityId = room._id; // ou toute autre façon d'obtenir l'ID du document bed_availability
    const updatedData = { use: room.use + selectedValue }; // selectedValue contient la valeur sélectionnée dans le select
    await axios.put(`http://localhost:5000/bed_availability/${bedAvailabilityId}`, updatedData);
    
    alert('Les patients ont été ajoutés avec succès !');
    
  } catch (error) {
    console.error('Error verifying names:', error);
  }
};


  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
     <main className='main-container'>
        <div className='main-cards'>
          <div>
          <select className='select-num' value={selectedValue} onChange={handleSelectChange}>
            {options.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          </div>
          <div>
          {Array.from({ length: selectedValue }, (_, index) => (
            <div key={index} className="form-container">
              <input
                className='input-save'
                type='text'
                value={textValues[index] || ''}
                onChange={(event) => handleTextChange(index, event)}
                placeholder='Enter patient name...'
              />
              <input
                className='input-save'
                type='text'
                value={ageValues[index] || ''}
                onChange={(event) => handleAgeChange(index, event)}
                placeholder='Enter age...'
              />
              <input
                className='input-save'
                type='text'
                value={visitsValues[index] || ''}
                onChange={(event) => handleVisitsChange(index, event)}
                placeholder='Enter number of visits...'
              />
            </div>
          ))}
          </div>
          <div>
          <button className='save-button' onClick={handleSendClick}>Send</button>
          </div>
          

  </div>
    </main>
   </div>
  )
}

export default SavingPage