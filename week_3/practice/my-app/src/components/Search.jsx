import React from "react";

const Search = ({ search, handleSearchChange, handleSearch }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="이름을 입력하세요"
        value={search}
        onChange={handleSearchChange}
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default Search;
