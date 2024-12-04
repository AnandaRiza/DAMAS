"use client";
import FormSearch from "@/components/FormSearch";
import NotFound from "@/components/NotFound";
import PleaseWait from "@/components/PleaseWait";
import HeaderLogistic from "@/header/HeaderAllMemo";
import LogisticTable from "@/components/logistic_components/table/logistic_table_masuk";
import axios from "axios";
import { useEffect, useState } from "react";

const getDisplayName = (header) => {
  const displayNames = {
    memo_num: "NOMOR MEMO",
    memo_perihal: "PERIHAL MEMO",
    memo_pic: "PIC",
    memo_status: "STATUS MEMO",
    memo_surat_type: "TIPE SURAT",
    memo_masuk: "TANGGAL MEMO MASUK",
    memo_doc_type: "TIPE DOKUMEN",
    memo_keluar: "TANGGAL MEMO KELUAR",
    memo_terima: "TANGGAL TERIMA MEMO",
    memo_category: "KATEGORI MEMO"
  };
  return displayNames[header] || header;
};

const FilterModal = ({ isOpen, onClose, columns, filters, onFilterChange, onApplyFilters, onResetFilters }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Filter Data</h2>
        <div className="grid grid-cols-2 gap-4">
          {columns.map(column => (
            <div key={column} className="flex flex-col">
              <label htmlFor={column} className="text-sm font-medium">{getDisplayName(column)}</label>
              <input
                id={column}
                type="text"
                value={filters[column] || ""}
                onChange={(e) => onFilterChange(column, e.target.value)}
                className="border rounded px-2 py-1"
                placeholder={`Filter ${getDisplayName(column)}`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={onResetFilters}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Reset Filters
          </button>
          <button
            onClick={onApplyFilters}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply Filters
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom alphanumeric sorting function
const alphanumericSort = (a, b) => {
  const aNum = a.memo_num.match(/\d+/);
  const bNum = b.memo_num.match(/\d+/);
  const aAlpha = a.memo_num.replace(/\d+/g, '');
  const bAlpha = b.memo_num.replace(/\d+/g, '');

  if (aNum && bNum) {
    const numDiff = parseInt(aNum[0], 10) - parseInt(bNum[0], 10);
    if (numDiff !== 0) return numDiff;
  }
  return aAlpha.localeCompare(bAlpha);
};

const Page = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [dataAllMemo, setDataAllMemo] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [sortConfig, setSortConfig] = useState({
    key: "memo_num",
    direction: "ascending",
  });
  const [hasMoreData, setHasMoreData] = useState(true);
  const [filters, setFilters] = useState({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const allColumns = [
    "memo_num",
    "memo_perihal",
    "memo_pic",
    "memo_status",
    "memo_surat_type",
    "memo_masuk",
    "memo_doc_type",
    "memo_keluar",
    "memo_category",
    "memo_terima",
  ];

  useEffect(() => {
    getDataAllMemo();
  }, [startIndex]);

  const getDataAllMemo = async () => {
    setDataAllMemo(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allmemo?start=${startIndex}&size=${perPage}`
      );
      const fetchedData = response.data.data;

      // Initial sorting by memo_num using custom alphanumeric sort function
      fetchedData.sort(alphanumericSort);

      setDataAllMemo(fetchedData);
      setFilteredData(fetchedData);
      setHasMoreData(fetchedData.length === perPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DAMAS_URL_SERVER}/allmemo/getmemo?input=${searchInput}`
      );
      setSearchResult(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (column, value) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const applyFilters = () => {
    let result = dataAllMemo;
    Object.keys(filters).forEach(column => {
      if (filters[column]) {
        result = result.filter(item => {
          const columnValue = item[column];
          return columnValue && columnValue.toLowerCase().includes(filters[column].toLowerCase());
        });
      }
    });
    setFilteredData(result);
    setIsFilterModalOpen(false);
  };

  const resetFilters = () => {
    setFilters({});
    setFilteredData(dataAllMemo);
  };

  return (
    <div>
      {/* <HeaderLogistic title="Memo Keluar" /> */}

      <div style={{ position: "absolute", top: 30, right: 45 }}>
        <FormSearch
          placeholder="Find Memo"
          setState={setSearchInput}
          handleSubmit={handleSearch}
        />
      </div>

      <div className="flex-grow justify-center items-center min-h-screen bg-white rounded-xl px-3">
        <div className="w-full px-5 py-2 mt-4">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Open Filters
          </button>
        </div>

        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          columns={allColumns}
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
        />

        {dataAllMemo === null && <PleaseWait />}

        {filteredData &&
          filteredData.length > 0 &&
          (!searchResult || searchInput === "") && (
            <div className="mt-4">
              <LogisticTable
                headers={allColumns}
                data={filteredData}
                action={true}
                link={"/main/logistic/"}
                onSort={handleSort}
                sortConfig={sortConfig}
              />
            </div>
          )}

        {searchResult && searchInput !== "" && searchResult.length !== 0 && (
          <div className="mt-4">
            <LogisticTable
              headers={allColumns}
              data={searchResult}
              action={true}
              link={"/main/logistic/"}
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          </div>
        )}

        {((filteredData && filteredData.length === 0) ||
          (searchResult && searchInput !== "" && searchResult.length === 0)) && (
          <NotFound />
        )}

        {dataAllMemo && !searchResult && (
          <div className="w-full flex justify-end items-center gap-3 mt-4">
            <button
              type="button"
              disabled={currentPage === 1 || startIndex === 0}
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setStartIndex(startIndex - perPage);
              }}
              className={`py-2 px-4 rounded-xl ${
                currentPage === 1 || startIndex === 0
                  ? "bg-gray-400"
                  : "bg-[#00A6B4]"
              } text-white`}
            >
              Prev
            </button>
            <h5 className="font-semibold">{currentPage}</h5>
            <button
              type="button"
              disabled={!hasMoreData}
              onClick={() => {
                setCurrentPage(currentPage + 1);
                setStartIndex(startIndex + perPage);
              }}
              className={`py-2 px-4 rounded-xl ${
                !hasMoreData ? "bg-gray-400" : "bg-[#00A6B4]"
              } text-white`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
