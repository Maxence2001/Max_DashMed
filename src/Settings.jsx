import  { useState }  from 'react'
import Papa from 'papaparse';
import axios from 'axios';
import Header from './Header'
import Sidebar from './Sidebar'

const Settings = () => {
    //gérer les données du fichier CSV
    const [data, setData] = useState([]);
    const [columnArray, setColumnArray] = useState([]);
    const [values, setValues] = useState([]);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const [jsonOutput, setJsonOutput] = useState([]);
    const [selectedElementIndex, setSelectedElementIndex] = useState('');
    const [selectedElement, setSelectedElement] = useState(null);
    const [jsonTableData, setJsonTableData] = useState([]);
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
      }
// Fonction pour gérer le chargement du fichier CSV
    const handleFile = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        if (!file.name.endsWith('.csv')) {
            alert('Veuillez sélectionner un fichier CSV.');
            return;
        }

        Papa.parse(file, {
            header: false, 
            skipEmptyLines: true,
            complete: function(result) {
                const { data } = result;
                if (data.length > 0) {
                    const columnArray = data[0]; 
                    const valuesArray = data.slice(1); 
                    setData(data);
                    setColumnArray(columnArray);
                    setValues(valuesArray);
                    setJsonOutput([]);
                    setJsonTableData([]);
                } else {
                    alert('Le fichier CSV est vide.');
                }
            },
        });
    };
// Fonction pour convertir les données en JSON
    const handleConvertToJSON = () => {
        if (data.length === 0) {
            alert('Veuillez charger un fichier CSV avant de le convertir en JSON.');
            return;
        }

        const jsonData = values.map((row) => {
            const obj = {};
            row.forEach((value, index) => {
                obj[columnArray[index]] = value;
            });
            return obj;
        });

        setJsonOutput(jsonData);
    };
// Fonction pour remplir le tableau avec JSON
    const handleFillTableWithJSON = () => {
        if (jsonOutput.length === 0) {
            alert("Veuillez d'abord convertir le fichier CSV en JSON.");
            return;
        }

        setJsonTableData(jsonOutput);
    };
// Fonction pour sélectionner un élément JSON
    const handleSelectElement = () => {
        if (selectedElementIndex === '') {
            alert('Veuillez saisir un index valide.');
            return;
        }

        const index = parseInt(selectedElementIndex);
        if (isNaN(index) || index < 0 || index >= jsonOutput.length) {
            alert('Index invalide. Veuillez saisir un index entre 0 et ' + (jsonOutput.length - 1));
            return;
        }

        setSelectedElement(jsonOutput[index]);
    };
    // Fonction pour envoyer les données à la collection patient
    const handleSendToPatient = async () => {
        try {
            console.log('Sending request with data:', jsonOutput);
            await axios.post('http://localhost:5000/patients', jsonOutput);
            alert('Les patients ont été ajoutés avec succès !');
        } catch (error) {
            console.error('Error sending data to patient collection:', error);
            alert('Une erreur est survenue lors de l\'ajout des éléments à la collection patient.');
        }
    };
  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <main className='main-container'>
    <div className='main-title'><h1>Adding patient</h1> </div>
    <div className='main-cards'>
    
    <h1 > Charger un fichier CSV </h1> <
        input type = "file"
        name = "file"
        accept = ".csv"
        onChange = { handleFile }
        style = {
            { display: 'block', margin: '10px auto' } }
        /> <
        br / >

        {
            data.length > 0 ? ( <
                div >
                <button onClick = { handleConvertToJSON } > Convertir en JSON </button> <
                button onClick = { handleFillTableWithJSON } > Remplir le tableau avec JSON </button> <
                table style = {
                    { borderCollapse: 'collapse', border: '1px solid black', margin: '5px auto' } } >
                <
                thead >
                <
                tr > {
                    columnArray.map((col, i) => ( <
                        th style = {
                            { border: '1px solid black' } }
                        key = { i } > { col } </th>
                    ))
                } </tr> </thead> <
                tbody > {
                    jsonTableData.map((row, i) => ( <
                        tr key = { i } > {
                            Object.values(row).map((value, j) => ( <
                                td style = {
                                    { border: '1px solid black' } }
                                key = { j } > { value } </td>
                            ))
                        } </tr>
                    ))
                } </tbody> </table> </div>
            ) : ( <p > Aucune donnée à afficher pour le moment. </p>
            )
        }

        {
            jsonOutput.length > 0 && ( <div >
                <h2 > JSON Output: </h2> <pre > { JSON.stringify(jsonOutput, null, 2) } </pre> <br / >
                <
                label >
                Sélectionner lindex d
                élément:
                <div>
                <
                input type = "text"
                value = { selectedElementIndex }
                onChange = {
                    (e) => setSelectedElementIndex(e.target.value) }
                />
                </div>
                </label> <
                button onClick = { handleSelectElement } > Afficher l élément JSON</button> {
                    selectedElement && ( <
                        div >
                        <h2 > Élément JSON sélectionné: </h2> < pre > { JSON.stringify(selectedElement, null, 2) } </pre> </div>
                    )
                } </div>
            )
        }

        {jsonOutput.length > 0 && (
            <div>
                <button onClick={handleSendToPatient}>Ajouter à la collection patient</button>
            </div>
        )}

    
        </div>
        </main>
    </div>
  )
}

export default Settings