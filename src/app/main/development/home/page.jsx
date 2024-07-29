"use client";

import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
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

// Register the required components, scales, and elements
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement
);

// Use dynamic import to avoid server-side rendering issues
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
    const [dataJenisApp, setDataJenisApp] = useState(null);
    const [dataPersentaseStatus, setDataPersentaseStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getDataCharts = async () => {
            setLoading(true);
            setDataStatus(null);
            setDataJenisApp(null);
            setDataPersentaseStatus(null);
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
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/jumlahdata2`
                );
                const fetchedData2 = response2.data;
                setDataPersentaseStatus(fetchedData2);

                const response3 = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/jumlahdata3`
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


                
            } catch (error) {
                setError("Failed to fetch data");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getDataCharts();
    }, []); 

    

    if (loading) return <PleaseWait/>;
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
                        size: 10, 
                    },
                    padding: 10,
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
                barThickness: 30, 
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
                categoryPercentage: 0.9, 
            },
        },
    };


    return (
        <div className="flex-grow justify-center items-center min-h-screen rounded-xl mt-1">
            <div className="flex w-grow">
                <div
                    className="grid w-[90px] flex-grow card bg-white rounded-box mt-4 p-1 mr-2 shadow-lg"
                    style={{
                        background:
                            "linear-gradient(360deg, rgba(54, 194, 206, 1), rgba(255, 255, 255, 1))",
                    }}
                >
                    <div className=" w-[770px] rounded-box shadow-sm">
                        <h1 className="font-bold p-4 items-center justify-center">
                            Project Berdasarkan Status
                        </h1>
                        <div className="flex items-center justify-center w-full my-4">
                            {dataStatus ? (
                                <div>
                                    <PieChart data={dataStatus}/>
                                </div>
                            ) : (
                                <p>No data available</p>
                            )}
                        </div>
                        {dataPersentaseStatus && (
                            <div className="flex flex-col p-3 m-1 font-bold text-sm">
                                <div className="badge p-3 m-1">
                                    Active ({dataPersentaseStatus.Active}%)
                                </div>
                                <div className="badge p-3 m-1">
                                    Closed ({dataPersentaseStatus.Closed}%)
                                </div>
                                <div className="badge p-3 m-1">
                                    Cancelled ({dataPersentaseStatus.Cancelled}%)
                                </div>
                                <div className="badge p-3 m-1">
                                    Initial ({dataPersentaseStatus.Initial}%)
                                </div>
                                
                            </div>
                        )}
                    </div>
                </div>

        

                <div
                    className="grid  w-[90px] flex-grow card bg-white rounded-box mt-4 p-1 shadow-lg"
                    style={{
                        background:
                            "linear-gradient(360deg, rgba(54, 194, 206, 1), rgba(255, 255, 255, 1))",
                    }}
                >
                    <div className="h-[50px] w-[770px] rounded-box">
                        <h1 className="font-bold p-4">
                            Project Berdasarkan Jenis Aplikasi
                        </h1>
                        <div className="flex items-center justify-center w-full my-4">
                            {dataJenisApp ? (
                                <div className="w-full h-[332px]">
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
        </div>
    );
};

export default ChartPie;
