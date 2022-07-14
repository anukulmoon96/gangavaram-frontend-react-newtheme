import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../partials/actions/FilterButton';
import Datepicker from '../partials/actions/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import axios from "axios";
import moment from "moment";
import Banner from '../partials/Banner';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      let url = `http://localhost:5000/get_all_users`;
  
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
    },[]);

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

            {/* Welcome banner */}

            {/* Dashboard actions */}
          

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

             
        
              {/* Card (Customers) */}
           
              
            </div>
            <DashboardCard10 data={data} />

          </div>
        </main>


      </div>
    </div>
  );
}

export default Dashboard;