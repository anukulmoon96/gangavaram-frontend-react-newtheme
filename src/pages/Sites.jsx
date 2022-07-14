import React, { useState,useContext } from 'react';
import './Sites.css';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import ThemeContext from "../context/theme/ThemeContext";

import TableTwo from './TableTwo';
import axios from "axios";
//import 'bootstrap/dist/css/bootstrap.min.css'
import moment from "moment";

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const dateinp = document.getElementById("datetextbox1");
  const dateinp2 = document.getElementById("datetextbox2");

  const a = useContext(ThemeContext);
  const dateNow = new Date();
  const year = dateNow.getFullYear(); // Getting current year from the created Date object
    const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
    const month = // Setting current Month number from current Date object
      monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
        ? `0${monthWithOffset}`
        : monthWithOffset;
    const date =
      dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
        ? `0${dateNow.getUTCDate()}`
        : dateNow.getUTCDate();
    const materialDateInput = `${year}-${month}-${date}`;

    const [startDate, setStartDate] = useState(materialDateInput);

    const [endDate, setEndDate] = useState(materialDateInput);
    const [data, setData] = React.useState([]);



    React.useEffect(() => {
      let unmounted = false;
      let url = `https://gangavaram.app-assertai.com:5000/get_aggregate_wagon_sequence_data?start_date=${moment(startDate).format("YYYY-MM-DD")}&end_date=${moment(endDate).format(
        "YYYY-MM-DD"
      )}`;
  
      const getTrainData = async () => {
        try {
          const responseData = await axios.get(url);
          if (!unmounted) {
            console.log(url);
            setData(responseData.data);
            console.log(responseData.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getTrainData();
      return () => {
        unmounted = true;
      };
    }, [endDate,startDate]);


  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          
          <div className='upperbar'>
           
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div>
            <input
  type="date"
  onClick = {()=>dateinp.showPicker()}
  id="datetextbox1"
  className="datetextbox"
  value = {startDate}
  onChange={e=>setStartDate(e.target.value)}

/>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div>
            <input
  type="date"
  onClick = {()=>dateinp2.showPicker()}
  id="datetextbox2"
  className="datetextbox"
  value = {endDate}
  onChange={e=>setEndDate(e.target.value)}

/>
            </div>
           
            </div>





            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

             

             

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              
            </div>
            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
            <TableTwo data={data.data}/>
  </div>


          

          </div>
        </main>


      </div>
    </div>
  );
}

export default Dashboard;