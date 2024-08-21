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
import ChartDataLabels from "chartjs-plugin-datalabels";

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

const LogisticMemoDashboard = () => {
    const [dataMemoStatus, setDataMemoStatus] = useState(null);
    const [dataDocType, setDataDocType] = useState(null);
    const [dataYear, setDataYear] = useState(null);
    const [dataCategory, setDataCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setDataYear(null);
            setDataDocType(null);
            setDataMemoStatus(null);
            setDataCategory(null);
            setError(null);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/memostatus`
                );
                const fetchedData = response.data;

                const labels = Object.keys(fetchedData);
                const dataValues = Object.values(fetchedData);
                const total = dataValues.reduce((sum, value) => sum + value, 0);

                setDataMemoStatus({
                    labels: labels,
                    datasets: [
                        {
                            label: "Project",
                            data: dataValues,
                            backgroundColor: [
                                "#A9E399",
                                "#FAC78A",
                                "#5989BE",
                                "#D9425D",
                            ],
                        },
                    ],
                    total: total,
                });
                
                const response3 = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/memostype`
                );
                const fetchedData3 = response3.data;
                
                const sortedData = Object.entries(fetchedData3)
                    .map(([type, count]) => ({ type, count }))
                    .sort((a, b) => b.count - a.count);
                
                const totalCount = sortedData.reduce((sum, item) => sum + item.count, 0);
                
                setDataDocType({
                    labels: sortedData.map(item => item.type),
                    datasets: [
                        {
                            label: "Count",
                            data: sortedData.map(item => item.count),
                            backgroundColor: [
                                "#A9E399", "#6CAC46", "#DF9222", "#5989BE", "#FAC78A", "#7E3D78"
                            ],
                        },
                    ],
                    total: totalCount,
                });

                const response4 = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/memoyear`
                );
                const fetchedData4 = response4.data;
          
                const labels4 = Object.keys(fetchedData4);
                const dataValues4 = Object.values(fetchedData4);
                const totalYear = dataValues4.reduce((sum, value) => sum + value, 0);

                setDataYear({
                    labels: labels4,
                    datasets: [
                        {
                            label: "Project",
                            data: dataValues4,
                            backgroundColor: [
                                "#A9E399",
                                "#5989BE",
                                "#D9425D",
                                "#FAC78A",
                            ],
                        },
                    ],
                    total: totalYear,
                });

                const response5 = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/memocategory`
                );
                const fetchedData5 = response5.data;

                // Filter out categories with a count of 0 and remove unnamed category
                const filteredCategories = Object.entries(fetchedData5)
                    .filter(([category, count]) => count > 0 && category.trim() !== "")
                    .reduce((acc, [category, count]) => {
                        acc[category] = count;
                        return acc;
                    }, {});

                const totalCategory = Object.values(filteredCategories).reduce((a, b) => a + b, 0);

                setDataCategory({
                    labels: Object.keys(filteredCategories),
                    datasets: [
                        {
                            label: "Count",
                            data: Object.values(filteredCategories),
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4BC0C0",
                                "#9966FF",
                                "#FF9F40",
                            ],
                        },
                    ],
                    total: totalCategory,
                });
            } catch (error) {
                setError("Failed to fetch data");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <PleaseWait />;
    if (error) return <p>{error}</p>;

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
                    text: "Document Type",
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

    return (
        <div className="flex-grow justify-center items-center min-h-screen rounded-xl">
            <div className="flex w-grow">
                <div className="grid w-[90px] flex-grow card bg-white rounded-box mt-3 p-1 mr-2 shadow-lg">
                    <div className="w-[770px] rounded-box">
                        <h1 className="font-bold p-4 items-center justify-center pb-0">
                            MEMOS BY STATUS
                        </h1>
                        {dataMemoStatus ? (
                            <div className="flex items-end justify-center h-[400px] relative">
                                {dataMemoStatus.total && (
                                    <div className="flex flex-col p-3 pl-8 m-1 font-bold text-base absolute left-0">
                                        <div className="P-3 m-1 mt-4">
                                            Total = {dataMemoStatus.total} Memos
                                        </div>
                                    </div>
                                )}
                                <div className="h-[450px] flex items-center">
                                    <div
                                        style={{
                                            width: "800px",
                                            height: "300px",
                                            overflowX: "auto",
                                        }}
                                    >
                                        <PieChart
                                            data={dataMemoStatus}
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
                    <div className="h-[50px] w-[770px] rounded-box">
                        <h1 className="font-bold p-4">
                            MEMOS BY DOCUMENT TYPE
                        </h1>
                        <div className="flex items-center justify-center w-full my-4">
                            {dataDocType ? (
                                <div className="w-full h-[332px] pl-6">
                                    <BarChart
                                        data={dataDocType}
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
                    <div className="w-[770px] rounded-box">
                        <h1 className="font-bold p-4">
                            MEMOS BY YEAR
                        </h1>
                        <div className="flex items-center justify-center w-full my-4">
                            {dataYear ? (
                                <div
                                    style={{
                                        width: "200px",
                                        height: "300px",
                                        overflowX: "auto",
                                    }}
                                >
                                    <PieChart
                                        data={dataYear}
                                        options={pieOptions}
                                    />
                                </div>
                            ) : (
                                <p>No data available</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="card bg-white rounded-box mt-2 p-1 font-bold shadow-sm">
                    <div className="w-[770px] rounded-box">
                        <h1 className="font-bold p-4">
                            MEMOS BY CATEGORY
                        </h1>
                        <div className="flex items-center justify-center w-full my-4">
                            {dataCategory ? (
                                <div
                                    style={{
                                        width: "600px",
                                        height: "300px",
                                        overflowX: "auto",
                                    }}
                                >
                                    <PieChart
                                        data={dataCategory}
                                        options={pieOptions}
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

export default LogisticMemoDashboard;