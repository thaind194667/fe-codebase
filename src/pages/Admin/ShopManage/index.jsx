import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'

import "./ShopManage.scss"

import Header from "@/layouts/Header"
import Sidebar from "@/layouts/Sidebar"
import AdminSearch from "@/components/AdminSearch"
import ManagePopup from "./ManagePopup"
import AdminTable from "@/components/AdminTable"
import LoadingPage from "@/pages/Loading";

import {apiURL, headersWithToken} from "@/hooks/hooks"
// import { fakeRequestList } from "@/hooks/FakeData"

const actionListURL = {
    accept:     "request/accept",
    deny:       "request/deny",
    active :    "activeFacility",
    deactive:   "deactiveFacility",
    remove:     "removeFacility",
}

const actionListMsg = {
    accept:     "承認するのが成功しました",
    deny:       "拒否するのが成功しました",
    active :    "活性化するのが成功しました",
    deactive:   "無効化するのが成功しました",
    remove:     "削除するのが成功しました",
}

let actionParam;
let actionType;

export default function ShopManage() {

    let nowToast;

    const location = useLocation();
    const [title, setTitle] = useState("");
    const [tableName, setTableName] = useState("");
    const [displayPopup, setDisplayPopup] = useState(false);
    const [popupType, setPopupType] = useState("deny");
    
    const [data, setData] = useState()

    const [searchValue, setSearchValue] = useState("")
    const [searchData, setSearchData] = useState();    

    useEffect(() => {
        getData(location.pathname.substring(1));
        if (location.pathname === "/request-manage") {
            setTitle("管理 / リクエスト管理");
            setTableName("リクエスト管理");
        }
        if (location.pathname === "/shop-manage") {
            setTitle("管理 / マッサージ部屋管理");
            setTableName("マッサージ部屋管理");
        }
    }, [location]);

    useEffect(() => {
        console.log("parent data", data);   
        setSearchData(data)
    }, [data])

    useEffect(() => {
        if(data) {
            console.log(data, searchValue);
            let arr = [...data]
            setSearchData(arr.filter((e) => e.facilityName.toLowerCase().includes(searchValue.toLowerCase())))
        }
    }, [searchValue])

    const getData = (page) => {
        axios.get(`${apiURL}/admin/${page === "request-manage" ? "requestNotActive" : "requestActive"}`,{
            headers: headersWithToken,
        })
        .then((res) => {
            console.log(res.data);
            setData(res.data);
        })
        .catch((err) => console.error(err))
    }

    const toastWaiting = () => {
        nowToast = toast("Processing ....", {
            autoClose: false,
        });
    }

    const closeWaitToast = () => {
        toast.dismiss(nowToast);
    }

    const setAction = (type, param) => {
        actionParam = param;
        actionType = type;
        console.log(actionType, actionParam);
        setPopupType(type);
        setDisplayPopup(true);
    }

    const makeAction = () => {
        toastWaiting();
        const actionApiURL = `${apiURL}/admin/${actionListURL[actionType]}`
        // console.log(actionType, actionApiURL);
        axios.post(actionApiURL, actionParam, {
            headers: headersWithToken,
        })
        .then((res) => {
            console.log(res.data);
            closeWaitToast();
            if(res.data === "success") {
                toast.success(actionListMsg[actionType])
            }
            else {
                toast.error("Some error has occured :(");
            }
            getData(location.pathname.substring(1));
        })
        .catch((err) => console.error(err))
    }

    const cancelPopupHandler = () => {
        setDisplayPopup(false);
        actionParam = "";
    }

    const confirmPopupHandler = () => {
        setDisplayPopup(false);
        makeAction();
    }

    return (
        data ? 
        <div className="shop-manage-page-container col">
            <Header />
            {
                displayPopup ? 
                    <ManagePopup 
                        popuptype = {popupType}
                        confirmPopup={confirmPopupHandler}
                        cancelPopup={cancelPopupHandler}
                    /> 
                    : <></>
            }
            <div className="shop-manage-page row" style={{flex: '1'}}>
                <Sidebar />
                <div className="shop-manage-content col">
                    <AdminSearch 
                        pageTitle={title} 
                        tableName = {tableName}
                        setSearch={setSearchValue}
                    />
                    <div style={{flex: '1'}}>
                        <AdminTable 
                            type={tableName === "リクエスト管理" ? "request" : "shop"}
                            // parentData={data.filter((e) => e.status !== "承認済み")}
                            parentData={searchData}
                            action={setAction}
                            />
                    </div>
                </div>
            </div>
        </div>
        : <LoadingPage />
    )
}