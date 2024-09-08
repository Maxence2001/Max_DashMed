import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Patients from './Patients.jsx'
import Settings from './Settings.jsx'
import Bed from './Bed.jsx'
import search from './search.jsx'
import Clients from './Clients.jsx'
import Doctors from './Doctors.jsx'
import Nurses from './Nurses.jsx'
import AppointmentPage from './AppointmentPage.jsx'
import DetailsPage from './DetailsPage.jsx'
import SavingPage from './SavingPage.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
  },
  {
    path:"/patients",
    element:< Patients />
  },
  {
    path:"/Settings",
    element:< Settings />
  },
  {
    path:"/Bed",
    element:<Bed />
  },
  {
    path: "/search",
    element: <search />
  },
  {
    path:"/Clients",
    element:<Clients />
  },
  {
    path:"/Doctors",
    element:<Doctors />
  },
  {
    path:"/Nurses",
    element:<Nurses />
  },
  {
    path:"/Details/:id",
    element: <DetailsPage />
  },
  {
    path:"/AppointmentPage",
    element:<AppointmentPage />
  },
  {
    path:"/SavingPage/:id",
    element:<SavingPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
