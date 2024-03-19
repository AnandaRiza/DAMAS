import React from "react";

const Card = ({name, age}) => {
    return (
        <div className="w-[450px] h-48 bg-gray-600 bg-opacity-35 text-white text-4xl rounded-xl p-4">
            <h1>{name}</h1>
            <h1>{age}</h1>
        </div>
    );
};

export default Card;