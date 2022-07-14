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
import Banner from '../partials/Banner';
import axios from "axios";
import moment from "moment";
import ReviewCard from "../components/ReviewCard";

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dateinp = document.getElementById("datetextbox1");
  const dateinp2 = document.getElementById("datetextbox2");

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
  const [warehouseId, setwarehouseId] = React.useState("");
  const [Class, setClass] = React.useState('');
  const [piechartData, setpiechartData] = React.useState([]);
  const [Warehouses,setWarehouses] = React.useState([]);

  React.useEffect(() => {
    let unmounted = false;
    let url = `http://localhost:5000/get_warehouses`;
  
    const getTrainData = async () => {
      try {
        const responseData = await axios.get(url);
        if (!unmounted) {
          console.log(url);
          setWarehouses(responseData.data);
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
  }, []);

  React.useEffect(() => {
    let unmounted = false;
    let url = `http://localhost:5000/get_security_data?start_date=${moment(startDate).format("YYYY-MM-DD")}&end_date=${moment(endDate).format(
      "YYYY-MM-DD"
    )}&warehouseid=${warehouseId}&class=${Class}`;

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
  }, [endDate, startDate, warehouseId, Class]);


  React.useEffect(() => {
    let unmounted = false;
    let url = `http://localhost:5000/get_security_piechart_data?start_date=${moment(startDate).format("YYYY-MM-DD")}&end_date=${moment(endDate).format(
      "YYYY-MM-DD"
    )}&warehouseid=${warehouseId}`;

    const getTrainData = async () => {
      try {
        const responseData = await axios.get(url);
        if (!unmounted) {
          console.log(url);
          setpiechartData(responseData.data);
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
  }, [endDate, startDate, warehouseId]);


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
            <div className='upperbar'>
              <div>
                <select onChange={e => setwarehouseId(e.target.value)} className="sitetextbox" id="">
                  <option disabled>Select Warehouse</option>
                  <option value="" selected>All</option>
                  {Warehouses.map(function(data,index){return <option value={data.warehouse_id}>{data.warehouse_name}</option>})}
                </select>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                <input
                  type="date"
                  onClick={() => dateinp.showPicker()}
                  id="datetextbox1"
                  className="datetextbox"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}

                />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                <input
                  type="date"
                  onClick={() => dateinp2.showPicker()}
                  id="datetextbox2"
                  className="datetextbox"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}

                />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                <select onChange={e => setClass(e.target.value)} className="sitetextbox" id="">
                  <option value disabled>Select Class</option>
                  <option value="" selected>All</option>
                  <option value="SECURITY_GUARD">SECURITY GUARD</option>
                  <option value="SECURITY_INTRUSION">SECURITY INTRUSION</option>
                </select>

              </div>
            </div>
            <br/> 

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

            <DashboardCard06 piechartData={piechartData}  />


            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">



            </div>
            <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">

              <div
                style={{
                  display: "flex",
                  margin: "30px 0",
                  justifyContent: "center",
                  gap: "60px",
                  flexWrap: "wrap",
                }}
              >
                {data ? (
                  data.length > 0 ? (
                    data.map((dat) => {
                      return (
                        <ReviewCard
                          date={dat.date}
                          time={dat.time}
                          class={dat.class}
                          warehouse_name={dat.warehouse_name}
                          camera_name={dat.camera_id}
                          image={dat.image}
                        />
                      );
                    })
                  ) : (
                    <>
                      <div style={{ fontSize: "50px" }}>No data found!</div>
                    </>
                  )
                ) : (
                  <>

                  </>
                )}
              </div>

            </div>

          </div>
        </main>


      </div>
    </div>
  );
}

export default Dashboard;