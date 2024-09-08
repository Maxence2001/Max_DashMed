import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 
{ BsHouseDoorFill,BsFillExclamationTriangleFill,  BsPeopleFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
import { Link } from 'react-router-dom';


function Home() {
  // Données pour les graphiques
    const data = [
        {
          name: 'Beds',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Patients',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Drugs',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Rooms',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Oparating room',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Doctors',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Nurses',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
      const [dashboardData, setDashboardData] = useState([]);
 // Utilisation de useEffect pour charger les données du dashboard au chargement du composant
      useEffect(() => {
          const fetchData = async () => {
              try {
                  const response = await axios.get('http://localhost:5000/dashboard');
                  setDashboardData(response.data);
              } catch (error) {
                  console.error('Error fetching data:', error);
              }
          };
  
          fetchData();
      }, []);

  return (
    <main className='main-container'>
    <div className='main-title'>
        <h3>DASHBOARD</h3>
    </div>

    <div className='main-cards'>
        {dashboardData.map(item => (
            <div key={item._id}  className='card'>
                <div  className='card-inner'>
                    <h3>{"Emergency"}</h3>
                    <BsFillExclamationTriangleFill className='card_icon'/>
                </div>
                <h1>{item.Emergency}</h1>
            </div>
        ))}
        {dashboardData.map(item => (
            <div key={item._id}  className='card'>
                <div  className='card-inner'>
                    <Link to={"/Doctors"} ><h3 className='unlinke'>{"Doctors"}</h3> </Link>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{item.Doctors}</h1>
            </div>
        ))}
        {dashboardData.map(item => (
            <div key={item._id}  className='card'>
                <div  className='card-inner'>
                    <Link to={"/Nurses"}><h3 className='unlinke'>{"Nurses"}</h3></Link>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{item.Nurses}</h1>
            </div>
        ))}
        {dashboardData.map(item => (
            <div key={item._id}  className='card'>
                <div  className='card-inner'>
                    <h3>{"Number of room"}</h3>
                    <BsHouseDoorFill className='card_icon'/>
                </div>
                <h1>{item.NumRoom}</h1>
            </div>
        ))}
    </div>

    <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>

    </div>

</main>
  )
}

export default Home