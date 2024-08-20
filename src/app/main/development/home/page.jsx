"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import PleaseWait from "@/components/PleaseWait";
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
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components and plugins
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels
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
    const [dataJumProject, setDataJumProject] = useState(null);
    const [dataJenisApp, setDataJenisApp] = useState(null);
    const [dataTotal, setDataTotal] = useState(null);
    const [dataJenisProject, setDataJenisProject] = useState(null);
    const [dataPersentaseStatus, setDataPersentaseStatus] = useState(null);
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
            setDataJumProject(null);
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
                            backgroundColor: [
                      
                                "#FEAE65",
                                "#D9425D", //merah
                                "#AADEA7",
                            ],
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
                                "#F66D44",
                                "#FEAE65",
                                "#E6F69D",
                                "#AADEA7",
                                "#64C2A6",
                                "#2D87BB",
                                "#7CDDDD",
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
                            backgroundColor: ["#FEAE65", "#E6F69D"],
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
                        return `${context.dataset.label}: ${context.raw}`;
                    },
                    title: function () {
                        return "";
                    },
                },
                usePointStyle: true,
            },
            datalabels: {
              display: true,
              color: 'black',
              font: {
                  weight: 'bold',
                  size: 14,
              },
              formatter: (value) => {
                  return `${value}`;
              },
              anchor: 'center',
              align: 'center',
              padding: 5,
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
                    color: "black",
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
                    font: {
                        size: 9,
                    },
                },
                title: {
                    display: true,
                    text: "Count",
                    color: "black",
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
                display: false,
                position: "bottom",
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.label
                            ? `${context.label}: ${context.raw}`
                            : `${context.raw}`;
                    },
                },
            },
            datalabels: {
                display: true,
                color: "black",
                font: {
                    weight: "bold",
                    size: 16,
                },
                formatter: (value, context) => {
                    const label =
                        context.dataIndex !== undefined
                            ? context.chart.data.labels[context.dataIndex]
                            : "Unknown";
                    return `${label}: ${value}`;
                },
                anchor: "end",
                align: "end",
                padding: 5,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 20,
            },
        },
    };

    return (
        <div className="flex-grow justify-center items-center rounded-xl pb-10">
            <div className="flex w-grow">
                <div className="grid w-[90px] flex-grow card bg-white rounded-box mt-3 p-1 mr-2 shadow-lg">
                    <div className=" w-[770px] rounded-box mx-auto">
                        <h1 className="font-bold p-4 items-center justify-center pb-0">
                            JUMLAH PROJECT BERDASARKAN STATUS
                        </h1>
                        {dataStatus ? (
                            <div className="flex items-end justify-center h-[400px] relative">
                                {dataTotal && (
                                    <div className="flex flex-col p-3 pl-8 m-1 font-bold text-base absolute left-0">
                                        <div className="P-3 m-1 mt-4">
                                            Total = {dataTotal} Project
                                        </div>
                                    </div>
                                )}
                                <div className=" h-[450px] flex items-center">
                                    <div
                                        style={{
                                            width: "500px",
                                            height: "300px",
                                            overflowX: "auto",
                                        }}
                                    >
                                        <PieChart
                                            data={dataStatus}
                                            options={pieOptions}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No data available</p>
                        )}
                    </div>
                </div>
                <div className="grid w-[90px] flex-grow card bg-white rounded-box mt-3 p-1 shadow-lg">
                    <div className="h-[50px] w-[770px] rounded-box mx-auto ">
                        <h1 className="font-bold p-4">
                            JUMLAH PROJECT BERDASARKAN JENIS APLIKASI
                        </h1>
                        <div className="flex items-center justify-center w-full my-4">
                            {dataJenisApp ? (
                                <div className="w-full h-[332px] pl-6">
                                    <BarChart
                                        data={dataJenisApp}
                                        options={barOptions}
                                    />
                                </div>
                            ) : (
                                <p>No data available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full mt-1 items-center justify-center">
                <div className="card bg-white rounded-box mt-2 p-1 mr-2 font-bold shadow-sm">
                    <div className="w-[770px] rounded-box mx-auto">
                        <h1 className="font-bold p-4">
                            JUMLAH PROJECT BERDASARKAN JENIS PROJECT
                        </h1>
                        <div className="flex items-center justify-center w-full my-4">
                            {dataStatus ? (
                                <div
                                    style={{
                                        width: "500px",
                                        height: "300px",
                                        overflowX: "auto",
                                    }}
                                >
                                    <PieChart
                                        data={dataJenisProject}
                                        options={pieOptions}
                                    />
                                </div>
                            ) : (
                                <p>No data available</p>
                            )}
                        </div>
                        {/* {dataPersentaseJenisProject && (
                            <div className="flex flex-col p-3 m-1 font-bold text-sm">
                                <div className="m-1">
                                    PMO ({dataPersentaseJenisProject.PMO}%)
                                </div>
                                <div className="m-1">
                                    Adhoc ({dataPersentaseJenisProject.Adhoc}%)
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChartPie;
