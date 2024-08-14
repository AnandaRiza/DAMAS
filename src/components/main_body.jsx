"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import dynamic from "next/dynamic";
import PleaseWait from "@/components/PleaseWait";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const PieChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Pie),
  { ssr: false }
);

const BarChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Bar),
  { ssr: false }
);

const ChartPie = () => {
  const [dataStatus, setDataStatus] = useState(null);
  const [dataStatusCategory, setDataStatusCategory] = useState(null);
  const [dataJumNetwork, setDataJumNetwork] = useState(null);
  const [dataJumServer, setDataJumServer] = useState(null);
  const [dataJumProject, setDataJumProject] = useState(null);
  const [dataNetworkStatus, setDataNetworkStatus] = useState(null);
  const [dataServerStatus, setDataServerStatus] = useState(null);
  const [dataJenisApp, setDataJenisApp] = useState(null);
  const [dataJenisAppNetwork, setDataJenisAppNetwork] = useState(null);
  const [dataTotal, setDataTotal] = useState(null);
  const [dataNetworkTotal, setDataNetworkTotal] = useState(null);
  const [dataServerTotal, setDataServerTotal] = useState(null);
  const [dataJenisProject, setDataJenisProject] = useState(null);
  const [dataPersentaseStatus, setDataPersentaseStatus] = useState(null);
  const [dataPersentaseNetworkStatus, setDataPersentaseNetworkStatus] =
    useState(null);
  const [dataPersentaseServerStatus, setDataPersentaseServerStatus] =
    useState(null);
  const [dataPersentaseJenisProject, setDataPersentaseJenisProject] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDataCharts = async () => {
      setLoading(true);
      setDataStatus(null);
      setDataJenisApp(null);
      setDataPersentaseStatus(null);
      setDataJenisProject(null);
      setDataPersentaseJenisProject(null);
      setDataTotal(null);
      setDataJumNetwork(null);
      setDataJumServer(null);
      setDataJumProject(null);
      setDataJenisAppNetwork(null);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/jumlahdata`
        );
        const fetchedData = response.data;
        console.log(response);

        const labels = Object.keys(fetchedData);
        const dataValues = Object.values(fetchedData);

        setDataStatus({
          labels: labels,
          datasets: [
            {
              label: "Project",
              data: dataValues,
              backgroundColor: ["#A9E399", "#5989BE", "#D9425D", "#FAC78A"],
            },
          ],
        });

        const response2 = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/persentase`
        );
        const fetchedData2 = response2.data;
        setDataPersentaseStatus(fetchedData2);

        const responseJumProject = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/jumlahdata`
        );
        const fetchedDataJumProject = responseJumProject.data;
        setDataJumProject(fetchedDataJumProject);

        const response3 = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/jenisapp`
        );
        const fetchedData3 = response3.data;

        const labels3 = Object.keys(fetchedData3);
        const dataValues3 = Object.values(fetchedData3);

        setDataJenisApp({
          labels: labels3,
          datasets: [
            {
              label: "Project",
              data: dataValues3,
              backgroundColor: [
                "#A9E399",
                "#6CAC46",
                "#DF9222",
                "#5989BE",
                "#FAC78A",
                "#7E3D78",
              ],
            },
          ],
        });

        const response4 = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/jenisproject`
        );
        const fetchedData4 = response4.data;
        const labels4 = Object.keys(fetchedData4);
        const dataValues4 = Object.values(fetchedData4);

        setDataJenisProject({
          labels: labels4,
          datasets: [
            {
              label: "Project",
              data: dataValues4,
              backgroundColor: ["#A9E399", "#5989BE", "#6CAC46", "#FAC78A"],
            },
          ],
        });

        const response5 = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/persentase2`
        );
        const fetchedData5 = response5.data;
        setDataPersentaseJenisProject(fetchedData5);

        const response6 = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/total`
        );
        const fetchedData6 = response6.data;
        setDataTotal(fetchedData6);
        console.log(response6);

        // OPS NETWORK

        const response_network1 = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/network_jumlahdata`
        );
        const fetchedDataNetwork = response_network1.data;
        console.log(response);

        const labels_network = Object.keys(fetchedDataNetwork);
        const dataValuesNetwork = Object.values(fetchedDataNetwork);

        setDataNetworkStatus({
          labels: labels_network,
          datasets: [
            {
              label: "Network",
              data: dataValuesNetwork,
              backgroundColor: ["#A9E399", "#5989BE", "#D9425D", "#FAC78A"],
            },
          ],
        });

        const response_network2 = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/network_persentase`
        );
        const fetchedDataNetwork2 = response_network2.data;
        setDataPersentaseNetworkStatus(fetchedDataNetwork2);

        const response_network3 = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/network_total`
        );
        const fetchedDataNetwork3 = response_network3.data;
        setDataNetworkTotal(fetchedDataNetwork3);
        console.log(response_network3);

        const responseJumNetwork = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/network_jumlahdata`
        );
        const fetchedDataJumNetwork = responseJumNetwork.data;
        setDataJumNetwork(fetchedDataJumNetwork);

        const responseJenisAppNetwork = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/network_category`
        );
        const fetchedDataJenisAppNetwork = responseJenisAppNetwork.data;

        const labelsJenisAppNetwork = Object.keys(fetchedDataJenisAppNetwork);
        const dataValuesJenisAppNetwork = Object.values(
          fetchedDataJenisAppNetwork
        );

        setDataJenisAppNetwork({
          labels: labelsJenisAppNetwork,
          datasets: [
            {
              label: "Project",
              data: dataValuesJenisAppNetwork,
              backgroundColor: [
                "#A9E399",
                "#6CAC46",
                "#DF9222",
                "#5989BE",
                "#FAC78A",
                "#7E3D78",
              ],
            },
          ],
        });

        const response_statuscategory = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/network_jumlahdata-status-category`
        );
        const fetchedDataStatusCategory = response_statuscategory.data;
        setDataStatusCategory(fetchedDataStatusCategory);

        //   OPS - SERVER

        const response_server1 = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/server_jumlahdata`
        );
        const fetchedDataServer = response_server1.data;
        console.log(response);

        const labels_server = Object.keys(fetchedDataServer);
        const dataValuesServer = Object.values(fetchedDataServer);

        setDataServerStatus({
          labels: labels_server,
          datasets: [
            {
              label: "Server",
              data: dataValuesServer,
              backgroundColor: ["#A9E399", "#5989BE", "#D9425D", "#FAC78A"],
            },
          ],
        });

        const response_server2 = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/server_persentase`
        );
        const fetchedDataServer2 = response_server2.data;
        setDataPersentaseServerStatus(fetchedDataServer2);

        const response_server3 = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/server_total`
        );
        const fetchedDataServer3 = response_server3.data;
        setDataServerTotal(fetchedDataServer3);

        const responseJumServer = await axios.get(
          `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/server_jumlahdata`
        );
        const fetchedDataJumServer = responseJumServer.data;
        setDataJumServer(fetchedDataJumServer);
      } catch (error) {
        setError("Failed to fetch data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getDataCharts();
  }, []);

  if (loading) return <PleaseWait />;
  if (error) return <p>{error}</p>;

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.raw;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 9,
          },
          padding: 0,
        },
        title: {
          display: true,
          text: "Jenis Aplikasi",
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Count",
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
        borderSkipped: false,
        barThickness: 20,
        maxBarThickness: 50,
        minBarLength: 2,
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    datasets: {
      bar: {
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    },
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20,
          padding: 10,
          font: {
            size: 12,
            family: "Arial",
          },
          color: "#333",

          maxWidth: 150,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.label + ": " + context.raw;
          },
        },
      },
    },
    responsive: true, // Ensure the chart is responsive
    maintainAspectRatio: false, // Allow the chart to resize freely
  };

  return (
    <div className="flex-grow justify-center items-center min-h-screen rounded-xl">
      <div className="flex w-grow">
        <div className="grid w-[90px] flex-grow card bg-white rounded-box mt-3 p-1 mr-2 shadow-lg">
          <div className=" w-[770px] rounded-box ">
            <h1 className="font-bold p-4 items-center justify-center">
              PROJECT
            </h1>
            <div className="flex items-center justify-center w-full my-4">
              {dataStatus ? (
                <div
                  style={{
                    width: "500px",
                    height: "250px",
                    overflowX: "auto",
                  }}
                >
                  <PieChart data={dataStatus} options={pieOptions} />
                </div>
              ) : (
                <p>No data available</p>
              )}
            </div>
            <div className="w-full flex justify-between items-end pr-4">
              {dataJumProject && (
                <div className="flex flex-col p-3 m-1 font-bold text-sm">
                  <div className="P-3 m-1">
                    Active = {dataJumProject.Active} Project
                  </div>
                  <div className="P-3 m-1">
                    Closed = {dataJumProject.Closed} Project
                  </div>
                  <div className="P-3 m-1">
                    Cancelled = {dataJumProject.Cancelled} Project
                  </div>
                  <div className="P-3 m-1">
                    Initial = {dataJumProject.Initial} Project
                  </div>
                </div>
              )}
              {dataTotal && (
                <div className="flex flex-col p-3 m-1 font-bold text-sm">
                  <div className="P-3 m-1">Total : {dataTotal} Project</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid w-[90px] flex-grow card bg-white rounded-box mt-3 p-1 shadow-lg">
          <div className="h-[50px] w-[770px] rounded-box">
            <h1 className="font-bold p-4">MEMO</h1>
            <div className="flex items-center justify-center w-full my-4">
              {dataJenisApp ? (
                <div className="w-full h-[332px] pl-6">
                  <BarChart data={dataJenisApp} options={barOptions} />
                </div>
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* new new */}

      <div className="flex w-grow">
        <div className="grid w-[90px] flex-grow card bg-white rounded-box mt-3 p-1 mr-2 shadow-lg">
          <div className=" w-[770px] rounded-box ">
            <h1 className="font-bold p-4 items-center justify-center">
              OPERATION - NETWORK
            </h1>
            <div className="flex items-center justify-center w-full my-4">
              {dataStatus ? (
                <div
                  style={{
                    width: "500px",
                    height: "250px",
                    overflowX: "auto",
                  }}
                >
                  <PieChart data={dataNetworkStatus} options={pieOptions} />
                </div>
              ) : (
                <p>No data available</p>
              )}
            </div>
            <div className="w-full flex justify-between items-end mt-20">
              {dataJumNetwork && (
                <div className="flex flex-col p-3 mt-14 font-bold text-sm">
                  <div className="badge P-3 m-1">
                    Ongoing = {dataJumNetwork.Ongoing} Project
                  </div>
                  <div className="badge P-3 m-1">
                    Finished = {dataJumNetwork.Finished} Project
                  </div>
                  {/* <div className="badge p-3 m-1">Total : {dataNetworkTotal} Project</div> */}
                </div>
              )}
              {dataNetworkTotal && (
                <div className="flex flex-col p-3 m-1 font-bold text-sm">
                  <div className="P-3 m-1">
                    Total : {dataNetworkTotal} Project
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid w-[90px] flex-grow card bg-white rounded-box mt-3 p-1 mr-2 shadow-lg">
          <div className="h-full w-full rounded-box">
            <h1 className="font-bold p-4">
              PROJECT NETWORK BERDASARKAN JENIS KATEGORI
            </h1>
            <div className="flex items-center justify-center w-full my-4">
              {dataJenisAppNetwork ? (
                <div className="w-full h-[332px] pl-6">
                  <BarChart data={dataJenisAppNetwork} options={barOptions} />
                </div>
              ) : (
                <p>No data available</p>
              )}
            </div>
            <div className="flex flex-wrap justify-center mt-4 p-4">
              <div className="bg-[#A9E399] border rounded-xl p-2 mr-2">
                <h2 className="font-bold">Others</h2>
                <hr />
                <p>Ongoing : {dataStatusCategory.OthersOngoing}</p>
                <p>Finished : {dataStatusCategory.OthersFinished}</p>
                <p className="font-semibold">
                  Total ={" "}
                  {dataStatusCategory.OthersOngoing +
                    dataStatusCategory.OthersFinished}
                </p>
              </div>
              <div className="bg-[#6CAC46] border rounded-xl p-2 mr-2">
                <h2 className="font-bold">Jaringan DRC</h2>
                <hr />
                <p>Ongoing : {dataStatusCategory.JaringanDRCOngoing}</p>
                <p>Finished : {dataStatusCategory.JaringanDRCFinished}</p>
                <p className="font-semibold">
                  Total ={" "}
                  {dataStatusCategory.JaringanDRCOngoing +
                    dataStatusCategory.JaringanDRCFinished}
                </p>
              </div>
              <div className="bg-[#DF9222] border rounded-xl p-2 mr-2">
                <h2 className="font-bold">Cloud</h2>
                <hr />
                <p>Ongoing : {dataStatusCategory.CloudOngoing}</p>
                <p>Finished : {dataStatusCategory.CloudFinished}</p>
                <p className="font-semibold">
                  Total ={" "}
                  {dataStatusCategory.CloudOngoing +
                    dataStatusCategory.CloudFinished}
                </p>
              </div>
              <div className="bg-[#5989BE] border rounded-xl p-2 mr-2">
                <h2 className="font-bold">Jaringan Cabang</h2>
                <hr />
                <p>Ongoing : {dataStatusCategory.JaringanCabangOngoing}</p>
                <p>Finished : {dataStatusCategory.JaringanCabangFinished}</p>
                <p className="font-semibold">
                  Total ={" "}
                  {dataStatusCategory.JaringanCabangOngoing +
                    dataStatusCategory.JaringanCabangFinished}
                </p>
              </div>
              <div className="bg-[#FAC78A] border rounded-xl p-2 mr-2">
                <h2 className="font-bold">Jaringan Kantor Pusat</h2>
                <hr />
                <p>Ongoing : {dataStatusCategory.JaringanKantorPusatOngoing}</p>
                <p>
                  Finished : {dataStatusCategory.JaringanKantorPusatFinished}
                </p>
                <p className="font-semibold">
                  Total ={" "}
                  {dataStatusCategory.JaringanKantorPusatOngoing +
                    dataStatusCategory.JaringanKantorPusatFinished}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* new */}
      <div className="flex w-full mt-1 items-center justify-center">
      <div className="card bg-white rounded-box mt-2 p-1 mr-2 font-bold shadow-sm">
        <div className=" w-[770px] rounded-box ">
          <h1 className="font-bold p-4 items-center justify-center">
            OPERATION - SERVER
          </h1>
          <div className="flex items-center justify-center w-full my-4">
            {dataStatus ? (
              <div
                style={{
                  width: "500px",
                  height: "250px",
                  overflowX: "auto",
                }}
              >
                <PieChart data={dataServerStatus} options={pieOptions} />
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
          <div className="w-full flex justify-between items-end pr-4">
            {dataJumServer && (
              <div className="flex flex-col p-3 m-1 font-bold text-sm">
                <div className="badge P-3 m-1">
                  Ongoing = {dataJumServer.Ongoing} Project
                </div>
                <div className="badge P-3 m-1">
                  Finished = {dataJumServer.Finished} Project
                </div>
                {/* <div className="badge p-3 m-1">Total : {dataServerTotal} Project</div> */}
              </div>
            )}
            {dataServerTotal && (
              <div className="flex flex-col p-3 m-1 font-bold text-sm">
                <div className="P-3 m-1">Total : {dataServerTotal} Project</div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
export default ChartPie;
