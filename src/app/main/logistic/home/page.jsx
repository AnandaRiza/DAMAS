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
                console.log(response);

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
                console.log(response4);
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

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                    padding: 8,
                    font: {
                        size: 10,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.label + ': ' + context.raw;
                    },
                },
            },
        },
    };

    const pieOptions = {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            title: {
                display: true,
                // text: (context) => `Total: ${context.chart.data.total || 0}`,
                position: 'bottom',
            },
        },
    };

    const barOptions = {
        ...chartOptions,
        plugins: {
            ...chartOptions.plugins,
            legend: {
                display: false,
            },
            title: {
                display: true,
                // text: (context) => `Total: ${context.chart.data.total || 0}`,
                position: 'bottom',
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

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {/* Memos by Status */}
            <div className="card bg-white rounded-box p-4 shadow-lg">
                <h1 className="font-bold text-lg mb-4">Memos by Status</h1>
                <div className="h-64">
                    {dataMemoStatus ? (
                        <PieChart data={dataMemoStatus} options={pieOptions} />
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                {dataMemoStatus && (
                    <>
                        <div className="flex flex-wrap justify-center mt-4">
                            {dataMemoStatus.labels.map((status, index) => (
                                <div key={status} className="badge m-1 p-2">
                                    {status}: {dataMemoStatus.datasets[0].data[index]}
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-2 font-bold">
                            Total: {dataMemoStatus.total}
                        </div>
                    </>
                )}
            </div>
    
            {/* Memos by Document Type */}
            <div className="card bg-white rounded-box p-4 shadow-lg">
                <h1 className="font-bold text-lg mb-4">Memos by Document Type</h1>
                <div className="h-64">
                    {dataDocType ? (
                         <div className="w-full h-[300px] pl-12">
                        <BarChart data={dataDocType} options={barOptions} />
                        </div>
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                {dataDocType && (
                    <div className="mt-4 overflow-x-auto">
                        <table className="table-auto w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Document Type</th>
                                    <th className="px-4 py-2 text-right">Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataDocType.labels.map((type, index) => (
                                    <tr key={type}>
                                        <td className="px-4 py-2">{type}</td>
                                        <td className="px-4 py-2 text-right">{dataDocType.datasets[0].data[index]}</td>
                                    </tr>
                                ))}
                                <tr className="font-bold">
                                    <td className="px-4 py-2">Total</td>
                                    <td className="px-4 py-2 text-right">{dataDocType.total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
    
            {/* Memos by Year */}
            <div className="card bg-white rounded-box p-4 shadow-lg">
                <h1 className="font-bold text-lg mb-4">Memos by Year</h1>
                <div className="h-64">
                    {dataYear ? (
                        <PieChart data={dataYear} options={pieOptions} />
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                {dataYear && (
                    <>
                        <div className="flex flex-wrap justify-center mt-4">
                            {dataYear.labels.map((year, index) => (
                                <div key={year} className="badge m-1 p-2">
                                    {year}: {dataYear.datasets[0].data[index]}
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-2 font-bold">
                            Total: {dataYear.total}
                        </div>
                    </>
                )}
            </div>
    
            {/* Memos by Category */}
            <div className="card bg-white rounded-box p-4 shadow-lg">
                <h1 className="font-bold text-lg mb-4">Memos by Category</h1>
                <div className="h-64">
                    {dataCategory ? (
                        <PieChart data={dataCategory} options={pieOptions} />
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                {dataCategory && (
                    <>
                        <div className="flex flex-wrap justify-center mt-4">
                            {dataCategory.labels.map((category, index) => (
                                <div key={category} className="badge m-1 p-2">
                                    {category}: {dataCategory.datasets[0].data[index]}
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-2 font-bold">
                            Total: {dataCategory.total}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LogisticMemoDashboard;