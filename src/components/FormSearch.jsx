import React from "react";
import { FiPlus, FiSearch } from "react-icons/fi";

const FormSearch = ({ placeholder, setState }) => {
    return (
        <div className="flex justify-between items-center">
            <form className="flex items-center border border-gray-400 rounded-xl">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="text-end py-1 px-3 rounded-l-xl bg-transparent outline-none"
                    onChange={(e) => setState(e.target.value)}
                />
                <button
                    type="button"
                    className="bg-[#00A6B4] hover:bg-gray-400 p-2 h-full rounded-r-xl text-white"
                >
                    <FiSearch size={20} />
                </button>
            </form>
        </div>
    );
};

export default FormSearch;
