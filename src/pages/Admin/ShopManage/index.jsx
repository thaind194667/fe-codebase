import "./ShopManage.scss"
import Header from "@/layouts/Header"
import Sidebar from "@/layouts/Sidebar"
import AdminSearch from "@/components/AdminSearch"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import ManagePopup from "./ManagePopup"

export default function ShopManage() {

    const location = useLocation();
    const [title, setTitle] = useState("");
    const [tableName, setTableName] = useState("");
    const [displayPopup, setDisplayPopup] = useState(false);
    const [popupType, setPopupType] = useState("deny");


    useEffect(() => {
        if (location.pathname === "/one") {
            setTitle("管理 / リクエスト管理");
            setTableName("リクエスト管理");
        }
        if (location.pathname === "/two") {
            setTitle("管理 / マッサージ部屋管理");
            setTableName("マッサージ部屋管理");
        }
        if (location.pathname === "/three") {
            setTitle("Three");
        }

    }, [location]);

    return (
        <>
            <Header />
            <div className="shop-manage-page row">
                <Sidebar />
                <div className="shop-manage-content">
                    <AdminSearch pageTitle={title} tableName = {tableName}/>
                <button type="button" onClick={()=>{setDisplayPopup(true)}}>OpenPopup</button>
                { 
                    displayPopup ?
                    <ManagePopup display={displayPopup} setDisplay={setDisplayPopup} txtPopup={""} popuptype={popupType}/>:<></>
                }
                </div>

            </div>
        </>
    )
}