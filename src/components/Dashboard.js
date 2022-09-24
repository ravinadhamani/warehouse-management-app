import React from "react";
import styles from "./Dashboard.module.css";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";
import { allData } from "../action";
import { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./footer/Footer";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { style } from "@mui/system";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard(data) {
  let val = data.data;
  console.log(data);

  const [months, setmonths] = useState([]);
  const [latesthits, setlatesthits] = useState([]);
  const [featured, setfeatured] = useState([]);
  const [popular, setpopular] = useState([]);
  const [performance, setperformance] = useState([]);
  const [storage, setstorage] = useState([]);
  const [notification, setnotification] = useState([]);
  const [orders, setorders] = useState([]);

  const value = Object.values(performance).map((value, i) => {
    return value;
  });
  const key = Object.keys(performance).map((key, i) => {
    return key;
  });

  const storageValue = Object.values(storage).map((item) => item);

  useEffect(() => {
    if (val.reducer.accountPage.length !== 0) {
      setmonths(data.data.reducer.dashboardPage.latestHits.months);
      setlatesthits(data.data.reducer.dashboardPage.latestHits.latest);
      setfeatured(data.data.reducer.dashboardPage.latestHits.featured);
      setpopular(data.data.reducer.dashboardPage.latestHits.popular);
      setperformance(data.data.reducer.dashboardPage.performance);
      setstorage(data.data.reducer.dashboardPage.storage);
      setnotification(data.data.reducer.dashboardPage.notifications);
      setorders(data.data.reducer.dashboardPage.orders);
    }
  }, [val]);

  const latestHits = {
    labels: months.map((month) => month),
    datasets: [
      {
        label: "Latest hits",
        data: latesthits.map((hits) => hits),
        borderColor: "#4BC0C0",
        lineTension: 0.4,
        pointBorderWidth: 0,
        pointRadius: 0,
      },

      {
        label: "Popular",
        data: popular.map((items) => items),
        borderColor: "#DD6280",
        lineTension: 0.4,
        pointBorderWidth: 0,
        pointRadius: 0,
      },
      {
        label: "Featured",
        data: featured.map((item) => item),
        borderColor: "#7D62D0",
        lineTension: 0.4,
        pointBorderWidth: 0,
        pointRadius: 0,
      },
    ],
  };

  const option = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: true,

    scales: {
      y: {
        ticks: { color: "white" },
      },
      x: {
        ticks: { color: "white" },
      },
    },
  };

  const performanceData = {
    labels: key.map((keyItem) => keyItem),
    datasets: [
      {
        label: "# of Hits",
        data: value.map((dataItem) => dataItem),
        fill: true,
        barThickness: 4,
        backgroundColor: [
          "#E95F50",
          "#4DCCB3",
          "#A8D582",
          "#D7D768",
          "#9D66CC",
          "#DB9C3F",
          "#3985F1",
        ],
        borderColor: [
          "#E95F50",
          "#4DCCB3",
          "#A8D582",
          "#D7D768",
          "#9D66CC",
          "#DB9C3F",
          "#3985F1",
        ],
        borderWidth: 0,
      },
    ],
  };

  const Baroption = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "white" },
      },
      x: {
        ticks: { color: "white" },
      },
    },

    indexAxis: "y",
  };

  const storageData = {
    labels: [
      "Available Storage (9.150GB)",
      "System Storage (6.500GB)",
      "Used Storage (18.240GB)",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: storageValue.map((item) => item),
        backgroundColor: ["#A8D582", "#4ED6B8", "#FF4229"],
        hoverOffset: 4,
      },
    ],
  };

  const Pieoption = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
        },
      },
    },

    responsive: true,
    maintainAspectRatio: false,
    showScale: false,
    radius: 100,
  };

  return (
    <>
      <Navbar/>
      {/* <h5 className={styles.text}>
        Welcome back,<span className={styles.username}>Admin</span>
      </h5> */}
      <div className={styles.body}>
        <div className={styles.chart1}>
          <h3 className={styles.latestHits}>Latest Hits</h3>
          <Line
            data={latestHits}
            className={styles.chartLine}
            options={option}
          />
        </div>
        <div className={styles.chart2}>
          <h3 className={styles.performanceText}>Performance</h3>
          <Bar
            data={performanceData}
            className={styles.chartBar}
            options={Baroption}
          />
        </div>
        <div className={styles.chart3}>
          <h3 className={styles.storageText}>Storage Information</h3>

          <Pie
            data={storageData}
            className={styles.pieChart}
            options={Pieoption}
          />
        </div>
        <div className={styles.chart4}>
          <h3 className={styles.notificationText}>Notification List</h3>

          <div className={styles.notificationListContainer}>
            {notification.map((item, i) => {
              return (
                <div className={styles.list} key={i}>
                  <img src={item.pic} alt="" id={styles.pic} />
                  <p className={styles.message}>
                    {item.message}
                    <br />
                    <br />
                    {item.time}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.chart5}>
          <h3 className={styles.ordersText}>Orders List</h3>

          <table className={styles.ordersTable}>
            <tr className={styles.tr1}>
              <th>ORDER NO.</th>
              <th>STATUS</th>
              <th>OPERATORS</th>
              <th>LOCATION</th>
              <th>DISTANCE</th>
              <th>START DATE</th>
              <th>EST DELIVERY DUE</th>
            </tr>

            {orders.map((order, i) => {
              return (
                <tr className={styles.tr1} key={i}>
                  <td>#{order.orderNo}</td>
                  <td>{order.status}</td>
                  <td>{order.operators}</td>
                  <td>{order.location}</td>
                  <td>{order.distance}</td>
                  <td>{order.startDate}</td>
                  <td>{order.deliveryDate}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      <Footer/>
    </>
  );
}

const mapstateToProps = (props) => ({
  data: props,
});

const mapDispatchToProps = () => ({
  addData: () => {
    allData();
  },
});

export default connect(mapstateToProps, mapDispatchToProps)(Dashboard);
