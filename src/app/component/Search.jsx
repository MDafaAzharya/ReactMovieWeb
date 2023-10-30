import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="flex justify-center sm:justify-center">
            <input
                type="text"
                placeholder="Search Movies"
                className="border-2 border-blue-200 p-1 rounded-md w-48 md:w-72 hover:border-blue-900 active:border-blue-900"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchForm;
