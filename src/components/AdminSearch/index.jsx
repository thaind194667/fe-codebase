import "./AdminSearch.scss";
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import SvgIcon from "@/components/SvgIcon";


const AdminSearch = ({ pageTitle, tableName }) => {
  return (
    <div className='adm-search-content'>
      <div className='page-title' > {pageTitle}</div>
      <div className='tb-name'>{tableName}</div>
      <div className="txt-input row">
        <SvgIcon name="search" width={18} height={18} />
        <input type="text" name="massage-name" placeholder="マッサージ店の名前を入力してください"/>
      </div>
    </div>
  )
}

export default AdminSearch