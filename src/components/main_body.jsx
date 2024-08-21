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
    const [dataMemoType, setDataMemoType] = useState(null);

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
            setDataMemoType(null);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/jumlahdata`
                );
                const fetchedData = response.data;

                const labels = Object.keys(fetchedData);
                const dataValues = Object.values(fetchedData);

                setDataStatus({
                    labels: labels,
                    datasets: [
                        {
                            label: "Project",
                            data: dataValues,
                            backgroundColor: [
                                "#E6F69D",
                                "#AADEA7",
                                "#D9425D", //merah
                                "#FAC78A",
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
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/memostype`
                );
                const fetchedData3 = response3.data;

                const labels3 = Object.keys(fetchedData3);
                const dataValues3 = Object.values(fetchedData3);

                setDataMemoType({
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

                const response7 = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/jenisapp`
                );
                const fetchedData7 = response7.data;

                const labels7 = Object.keys(fetchedData7);
                const dataValues7 = Object.values(fetchedData7);

                setDataJenisApp(fetchedData7);
                // console.log(response7);

                // OPS NETWORK

                const response_network1 = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/network_jumlahdata`
                );
                const fetchedDataNetwork = response_network1.data;

                const labels_network = Object.keys(fetchedDataNetwork);
                const dataValuesNetwork = Object.values(fetchedDataNetwork);

                setDataNetworkStatus({
                    labels: labels_network,
                    datasets: [
                        {
                            label: "Network",
                            data: dataValuesNetwork,
                            backgroundColor: [
                                "#A9E399",
                                "#5989BE",
                                "#D9425D",
                                "#FAC78A",
                            ],
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

                const responseJumNetwork = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/network_jumlahdata`
                );
                const fetchedDataJumNetwork = responseJumNetwork.data;
                setDataJumNetwork(fetchedDataJumNetwork);

                const responseJenisAppNetwork = await axios.get(
                    `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/network_category`
                );
                const fetchedDataJenisAppNetwork = responseJenisAppNetwork.data;

                const labelsJenisAppNetwork = Object.keys(
                    fetchedDataJenisAppNetwork
                );
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

                const labels_server = Object.keys(fetchedDataServer);
                const dataValuesServer = Object.values(fetchedDataServer);

                setDataServerStatus({
                    labels: labels_server,
                    datasets: [
                        {
                            label: "Server",
                            data: dataValuesServer,
                            backgroundColor: [
                                "#A9E399",
                                "#5989BE",
                                "#D9425D",
                                "#FAC78A",
                            ],
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
                color: "black",
                font: {
                    weight: "bold",
                    size: 14,
                },
                formatter: (value) => {
                    return `${value}`;
                },
                anchor: "center",
                align: "center",
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

    const pieOptions2 = {
        plugins: {
            legend: {
                position: "top",
                labels: {
                    boxWidth: 20,
                    padding: 10,
                    font: {
                        size: 14,
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
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="flex-grow justify-center items-center rounded-xl pb-10">
            <div className="flex w-grow mt-3">
                <div className="grid w-[90px] flex-grow card bg-white rounded-box mt-3 p-1 mr-2 shadow-lg">
                    <div className=" w-[770px] h-[380px] rounded-box mx-auto">
                        <h1 className="font-bold p-4 items-center justify-center">
                            PROJECT
                        </h1>
                        {dataStatus ? (
                            <div className="flex items-center justify-center ">
                                {dataTotal && dataJenisApp ? (
                                    <div className="flex flex-col pl-8 font-bold text-base">
                                        <div className="m-1">
                                            Core Bank System:{" "}
                                            {dataJenisApp["Core Bank System"]}{" "}
                                            Projects
                                        </div>
                                        <div className="m-1">
                                            Aplikasi Lainnya :{" "}
                                            {dataJenisApp["Aplikasi Lainnya"]}{" "}
                                            Projects
                                        </div>
                                        {/* <div className="m-1">
                                            Database: {dataJenisApp.Database}{" "}
                                            Projects
                                        </div> */}
                                        {/* <div className="m-1">
                                            Download: {dataJenisApp.Download}{" "}
                                            Projects
                                        </div> */}
                                        {/* <div className="m-1">
                                            Reporting: {dataJenisApp.Reporting}{" "}
                                            Projects
                                        </div> */}
                                        {/* <div className="m-1">
                                            Utility atau BI, OJK :{" "}
                                            {
                                                dataJenisApp[
                                                    "Utility atau BI, OJK"
                                                ]
                                            }{" "}
                                            Projects
                                        </div> */}
                                        <div className="m-1">
                                            eChannel :{" "}
                                            {
                                                dataJenisApp[
                                                    "eChannel (non website)"
                                                ]
                                            }{" "}
                                            Projects
                                        </div>
                                        <div className="m-1 mt-4">
                                            Total : {dataTotal} Projects
                                        </div>
                                    </div>
                                ) : (
                                    <p>Data is loading or incomplete</p>
                                )}

                                <div className=" h-[300px] flex items-center">
                                    <div
                                        style={{
                                            width: "400px",
                                            height: "200px",
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
                    <div className="h-[50px] w-[600px] rounded-box mx-auto">
                        <h1 className="font-bold p-4">MEMO</h1>
                        <div className="flex items-center justify-center w-full my-4">
                            {dataMemoType ? (
                                <div className="w-full h-[332px] pl-6">
                                    <BarChart
                                        data={dataMemoType}
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
            {/* new new */}

            <div className="flex w-full">
                <div className="w-full flex-grow card bg-white rounded-box mt-3 p-1 shadow-lg mx-auto">
                    <div className="mx-auto">
                        <h1 className="font-bold p-4">OPERATION - NETWORK</h1>
                        <div className="flex items-center justify-between w-full my-4">
                            {dataJumNetwork && dataNetworkTotal && (
                                <div className="flex flex-col p-3 font-bold text-md w-[35%]">
                                    <div className="P-3 m-1">
                                        Ongoing : {dataJumNetwork.Ongoing}{" "}
                                        Project
                                    </div>
                                    <div className="P-3 m-1">
                                        Finished : {dataJumNetwork.Finished}{" "}
                                        Project
                                    </div>
                                    <div className="P-3 m-1">
                                        Total : {dataNetworkTotal} Project
                                    </div>
                                </div>
                            )}

                            <div className="w-[65%]">
                                {dataJenisAppNetwork ? (
                                    <div className="">
                                        <BarChart
                                            data={dataJenisAppNetwork}
                                            options={barOptions}
                                        />
                                    </div>
                                ) : (
                                    <p>No data available</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center mt-4 p-4">
                            <div className="bg-[#A9E399] border rounded-xl p-2 mr-2">
                                <h2 className="font-bold">Others</h2>
                                <hr />
                                <p>
                                    Ongoing : {dataStatusCategory.OthersOngoing}
                                </p>
                                <p>
                                    Finished :{" "}
                                    {dataStatusCategory.OthersFinished}
                                </p>
                                <p className="font-semibold">
                                    Total ={" "}
                                    {dataStatusCategory.OthersOngoing +
                                        dataStatusCategory.OthersFinished}
                                </p>
                            </div>
                            <div className="bg-[#6CAC46] border rounded-xl p-2 mr-2">
                                <h2 className="font-bold">Jaringan DRC</h2>
                                <hr />
                                <p>
                                    Ongoing :{" "}
                                    {dataStatusCategory.JaringanDRCOngoing}
                                </p>
                                <p>
                                    Finished :{" "}
                                    {dataStatusCategory.JaringanDRCFinished}
                                </p>
                                <p className="font-semibold">
                                    Total ={" "}
                                    {dataStatusCategory.JaringanDRCOngoing +
                                        dataStatusCategory.JaringanDRCFinished}
                                </p>
                            </div>
                            <div className="bg-[#DF9222] border rounded-xl p-2 mr-2">
                                <h2 className="font-bold">Cloud</h2>
                                <hr />
                                <p>
                                    Ongoing : {dataStatusCategory.CloudOngoing}
                                </p>
                                <p>
                                    Finished :{" "}
                                    {dataStatusCategory.CloudFinished}
                                </p>
                                <p className="font-semibold">
                                    Total ={" "}
                                    {dataStatusCategory.CloudOngoing +
                                        dataStatusCategory.CloudFinished}
                                </p>
                            </div>
                            <div className="bg-[#5989BE] border rounded-xl p-2 mr-2">
                                <h2 className="font-bold">Jaringan Cabang</h2>
                                <hr />
                                <p>
                                    Ongoing :{" "}
                                    {dataStatusCategory.JaringanCabangOngoing}
                                </p>
                                <p>
                                    Finished :{" "}
                                    {dataStatusCategory.JaringanCabangFinished}
                                </p>
                                <p className="font-semibold">
                                    Total ={" "}
                                    {dataStatusCategory.JaringanCabangOngoing +
                                        dataStatusCategory.JaringanCabangFinished}
                                </p>
                            </div>
                            <div className="bg-[#FAC78A] border rounded-xl p-2 mr-2">
                                <h2 className="font-bold">
                                    Jaringan Kantor Pusat
                                </h2>
                                <hr />
                                <p>
                                    Ongoing :{" "}
                                    {
                                        dataStatusCategory.JaringanKantorPusatOngoing
                                    }
                                </p>
                                <p>
                                    Finished :{" "}
                                    {
                                        dataStatusCategory.JaringanKantorPusatFinished
                                    }
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

                <div className="w-full card bg-white rounded-box mt-3 p-1 shadow-lg mx-auto ml-2">
                    <div className=" flex flex-col justify-between h-full">
                        <h1 className="font-bold p-4">OPERATION - SERVER</h1>
                        <div className="flex items-center justify-center w-full my-4">
                            {dataServerStatus ? (
                                <div
                                    style={{
                                        width: "400px",
                                        height: "200px",
                                        overflowX: "auto",
                                    }}
                                >
                                    <PieChart
                                        data={dataServerStatus}
                                        options={pieOptions}
                                    />
                                </div>
                            ) : (
                                <p>No data available</p>
                            )}
                        </div>
                        <div className="w-full flex justify-between items-end">
                            {dataPersentaseServerStatus && (
                                <div className="flex flex-col p-3 font-bold text-sm">
                                    <div className="mt-1">
                                        Ongoing = {dataJumServer.Ongoing}{" "}
                                        Project
                                    </div>
                                    <div className="mt-1">
                                        Finished = {dataJumServer.Finished}{" "}
                                        Project
                                    </div>
                                </div>
                            )}
                            {dataServerTotal && (
                                <div className="flex flex-col p-3 m-1 font-bold text-sm">
                                    <div className="P-3 m-1">
                                        Total : {dataServerTotal} Project
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* new */}
        </div>
    );
};
export default ChartPie;
