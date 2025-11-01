import React from "react";
import { css } from "@emotion/react";
const Search = ({ search, handleSearchChange, handleSearch }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  const searchContainerStyle = css`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 0.5rem;
  `;
  const inputStyle = css`
    width: 40rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
    padding: 0.5rem 1rem;
    font-size: 1rem;
  `;
  const buttonStyle = css`
    padding: 8px 16px;
    color: white;
    background-color: #ffcbe5;
    width: 5rem;
    border: none;
    border-radius: 0.5rem;
    &:hover {
      background-color: #e9337c;
    }
  `;

  return (
    <div css={searchContainerStyle}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={search}
          onChange={handleSearchChange}
          css={inputStyle}
        />
        <button type="submit" css={buttonStyle}>
          검색
        </button>
      </form>
    </div>
  );
};

export default Search;
