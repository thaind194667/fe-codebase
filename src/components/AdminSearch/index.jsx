import "./AdminSearch.scss";
import React from 'react'
// import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import SvgIcon from "@/components/SvgIcon";


const AdminSearch = ({ pageTitle, tableName, setSearch }) => {

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("")
  }, [tableName])

  return (
    <div className='adm-search-content'>
      <div className='page-title' > {pageTitle}</div>
      <div className='tb-name'>{tableName}</div>
      <div className="txt-input row">
        <SvgIcon className="search-btn" name="search" width={18} height={18} onClick={() => setSearch(inputValue)} />
        <input 
          type="text" name="massage-name" 
          placeholder="マッサージ店の名前を入力してください"
          value={inputValue}
          onInput={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  )
}

export default AdminSearch