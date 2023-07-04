import "./AdminTable.scss"
import SvgIcon from "@/components/SvgIcon"

import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";


const ASCENDING = 1;    /// tăng dần
const DESCENDING = -1;   /// giảm dần

const requestStatusArray = ['承認待ち', '承認済み', '拒否された']
const shopStatusArray = ["Inactive", "Active"]

export default function AdminTable({
    parentData, 
    action,
    type,
    // setAccept, setDeny, setDelete, 
    // setActive, setDeactive
}) {

    const navigate = useNavigate();

    const tableHead = {
        requestID: "リクエストID",
        facilityID: "マッサージ店ID",
        username: "ユーザ",
        facilityName: "マッサージ店詳細",
        createdDate: "作成日",
        status: "スターテス",
        action: "アクション",
    }

    const [sortParam, setSortParam] = useState({
        key: type === "request" ? "requestID" : "facilityID",
        order: ASCENDING
    })
    const [data, setData] = useState(
        parentData
    )

    const sortByField = ( arr , fieldName, option = ASCENDING ) => 
        arr.sort((a, b) => {
            if(a[fieldName] > b[fieldName]) return option;
            if(a[fieldName] < b[fieldName]) return -option;
            return 0;
        })  

    useEffect(() => {
        sortData();
    }, [sortParam, parentData])

    useEffect(() => {
        if(type === "request") {
            setSortParam({
                key: "requestID",
                order: ASCENDING,
            });
        }
        else {
            setSortParam({
                key: "facilityID",
                order: ASCENDING,
            });
        }
    }, [type])

    const sortData = () => {
        if(parentData) {
            let arr = [...parentData];
            setData(sortByField(arr, sortParam.key, sortParam.order ));
            console.log("sorting", parentData);
        }
    }

    const chooseSortParam = (param) => {
        if(param === "action") return;
        if(param === sortParam.key) {
            setSortParam({
                key: param,
                order: sortParam.order === ASCENDING ? DESCENDING : ASCENDING,
            });
        }
        else {
            setSortParam({
                key: param,
                order: ASCENDING
            })
        }
    }

    return (
        <div className="admin-table">
            <table>
                <thead>
                    <tr>
                    {
                        Object.keys(tableHead).map((key, index) => {
                            const length = "25px"
                            if(type === "request" && key === "facilityID") return <></>;
                            if(type === "shop" && key === "requestID") return <></>;
                            return (
                                <th className="table-head" key={"tablehead" + index} onClick={() => chooseSortParam(key)}>
                                    <div className="row" style={{alignItems: 'center'}}>
                                    { 
                                        tableHead[key] 
                                    }
                                    {
                                        key !== "action" && key === sortParam.key ? (
                                            sortParam.order === ASCENDING ? 
                                            <SvgIcon name="triangle-down" width={length} height={length} />:
                                            <SvgIcon name="triangle-up" width={length} height={length} />
                                        ) : <></>
                                    }
                                    </div>
                                </th>
                            )
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                { data ? data.length ?
                    data.map((item, index) => {
                        return (
                            <tr className="table-row" key={'row' + index}>
                                <td>
                                    <div>
                                        {type === "request" ? item.requestID : item.facilityID}
                                    </div>
                                </td>

                                <td>
                                    <div>
                                        {item.username}
                                    </div>
                                </td>

                                <td >
                                    <div className="cell-shopid" onClick={() => navigate(`/detail/${item.facilityID}`, { id: item.facilityID })}>
                                        {item.facilityName} 
                                        {type === "request" ? " - " + item.facilityID : ""}
                                    </div>
                                </td>

                                <td>
                                    <div>
                                        {item.createdDate}
                                    </div>
                                </td>

                                <td>
                                    {
                                        type === "request" ? 
                                        requestStatusArray[item.status] : shopStatusArray[item.isActive]
                                    }
                                </td>
                                <td>
                                    <div 
                                        className="row"  
                                        style={{alignItems: 'center', justifyContent: 'center', gap: '5px'}}
                                    >
                                    {
                                        item.status !== 1 || !item.isActive ?
                                        <SvgIcon onClick={() => 
                                                item.status !== 1 ? 
                                                action("accept", {
                                                    requestID: item.requestID,
                                                }) :
                                                action("active", {
                                                    facilityID : item.facilityID 
                                                })
                                            }
                                            className={"action-btn" }//+ (item.status !== "承認待ち" ? " disabled" : "")} 
                                            name="Check-mark" 
                                            width="35px" height="35px" round={true} 
                                            backgroundColor="#559901" padding="8px"
                                        /> : <></>
                                    }

                                    {
                                        item.status !== 1 || item.isActive ?
                                        <SvgIcon onClick={() => 
                                                item.isActive ? 
                                                action("deactive", {
                                                    facilityID: item.facilityID
                                                }) : 
                                                item.status !== 2 ?
                                                action("deny", {
                                                    requestID: item.requestID 
                                                }) : {}
                                            }
                                            className={"action-btn" + (item.status === 2 ? " disabled" : "")} 
                                            name="X-mark" 
                                            width="35px" height="35px" round={true} 
                                            backgroundColor="#E2442E" padding="8px"
                                        /> : <></>
                                    }

                                    {
                                        item.status === 1 ?
                                        <SvgIcon onClick={() => 
                                                action("remove", {
                                                    requestID: item.requestID, 
                                                    facilityID :item.facilityID 
                                                })
                                            }
                                            className={"action-btn" }//+ (item.status === "承認待ち" ? " disabled" : "")} 
                                            name="delete-icon" 
                                            width="35px" height="35px" round={true}
                                            backgroundColor="#DCDCDC" padding="8px"
                                        /> : <></>
                                    }
                                    </div>
                                </td>
                            </tr>
                        )
                    }) :
                    <tr>まだ記録がありません</tr> :
                    <tr>Loading</tr>
                }
                </tbody>
            </table>
        </div>
    )
}