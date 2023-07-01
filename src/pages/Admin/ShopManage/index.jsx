import "./ShopManage.scss"
import Header from "@/layouts/Header"
import Sidebar from "@/layouts/Sidebar"
import AdminSearch from "@/components/AdminSearch"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import ManagePopup from "./ManagePopup"

import AdminTable from "@/components/AdminTable"

import {apiURL} from "@/hooks/hooks"
import { fakeRequestList } from "@/hooks/FakeData"
import axios from 'axios'
import LoadingPage from "@/pages/Loading";

export default function ShopManage() {

    const location = useLocation();
    const [title, setTitle] = useState("");
    const [tableName, setTableName] = useState("");
    const [displayPopup, setDisplayPopup] = useState(false);
    const [popupType, setPopupType] = useState("deny");
    
    const [data, setData] = useState([...fakeRequestList])

    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        if (location.pathname === "/request-manage") {
            setTitle("管理 / リクエスト管理");
            setTableName("リクエスト管理");
        }
        if (location.pathname === "/shop-manage") {
            setTitle("管理 / マッサージ部屋管理");
            setTableName("マッサージ部屋管理");
        }
        if (location.pathname === "/three") {
            setTitle("Three");
        }

    }, [location]);

    useEffect(() => {
        console.log("parent data", data);   
    }, [data])

    useEffect(() => {
        let arr = [...data]
        setData(arr.filter((e) => e.facilityName.includes(searchValue)))
    }, [searchValue])

    const deleteItem = (index) => {
        console.log("remove " + index);
        let arr = [...data]
        // console.log("after remove arr", arr.filter((e) => e.startIndex !== index));
        setData(arr.filter((e) => e.startIndex !== index))
    }

    const acceptItem = (index) => {
        console.log("accept " + index);
    }

    const denyItem = (index) =>  {
        console.log("deny " + index);
    }

    return (
        data ? 
        <div className="shop-manage-page-container col">
            <Header />
            <div className="shop-manage-page row" style={{flex: '1'}}>
                <Sidebar />
                <div className="shop-manage-content col">
                    <AdminSearch 
                        pageTitle={title} 
                        tableName = {tableName}
                        setSearch={setSearchValue}
                    />
                {/* <button type="button" onClick={()=>{setDisplayPopup(true)}}>OpenPopup</button>
                { 
                    displayPopup ?
                    <ManagePopup display={displayPopup} setDisplay={setDisplayPopup} txtPopup={""} popuptype={popupType}/>:<></>
                } */}
                    <div style={{flex: '1'}}>
                        <AdminTable 
                            type="request"
                            // parentData={data.filter((e) => e.status !== "承認済み")}
                            parentData={data}
                            setDelete = {deleteItem}
                            setAccept = {acceptItem}
                            setDeny = {denyItem}
                            />
                    </div>
                </div>
            </div>
        </div>
        : <LoadingPage />
    )
}