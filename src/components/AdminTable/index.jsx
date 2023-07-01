import "./AdminTable.scss"
import SvgIcon from "@/components/SvgIcon"

import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";


const ASCENDING = 1;    /// tăng dần
const DESCENDING = -1;   /// giảm dần

export default function AdminTable({parentData, setAccept, setDeny, setDelete, type}) {

    const navigate = useNavigate();

    const tableHead = {
        // remove: "削除",
        requestID: "リクエストID",
        username: "ユーザ",
        facilityID: "マッサージ店詳細",
        createdDate: "作成日",
        status: "スターテス",
        action: "アクション",
    }

    const [sortParam, setSortParam] = useState({
        key: "requestID",
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

    // useEffect(() => {
    //     setSortParam({
    //         key: "requestID",
    //         order: ASCENDING
    //     })
    // }, [])

    useEffect(() => {
        sortData();
    }, [sortParam, parentData])

    const sortData = () => {
        if(parentData.length) {
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
        <div className="admin-table row">
            <table>
                <thead>
                    <tr>
                    {
                        Object.keys(tableHead).map((key, index) => {
                            const length = "25px"
                            return (
                                <th className="table-head" key={"tablehead" + index} onClick={() => chooseSortParam(key)}>
                                    <div className="row" style={{alignItems: 'center'}}>
                                    {tableHead[key]}
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
                { data.length ?
                    data.map((item, index) => {
                        return (
                            <tr className="table-row" key={'row' + index}>
                                <td>
                                    {item.requestID}
                                </td>

                                <td>
                                    {item.username}
                                </td>

                                <td className="cell-shopid" onClick={() => navigate(`/detail/${item.facilityID}`, { id: item.facilityID })}>
                                    {item.facilityName}
                                </td>

                                <td>
                                    {item.createdDate}
                                </td>

                                <td>
                                    {
                                        type === "request" ? 
                                        item.status : item.isActive
                                    }
                                </td>
                                <td>
                                    <div 
                                        className="row"  
                                        style={{alignItems: 'center', justifyContent: 'center', gap: '5px'}}
                                    >
                                    {
                                        item.status === "承認待ち" || !item.isActive ?
                                        <SvgIcon onClick={() => item.status === "承認待ち" ? setAccept(item.startIndex) : {}}
                                            className={"action-btn" }//+ (item.status !== "承認待ち" ? " disabled" : "")} 
                                            name="Check-mark" 
                                            width="35px" height="35px" round={true} 
                                            backgroundColor="#559901" padding="8px"
                                        /> : <></>
                                    }

                                    {
                                        item.status === "承認待ち" || item.isActive ?
                                        <SvgIcon onClick={() => item.status === "承認待ち" ? setDeny(item.startIndex) : {}}
                                            className={"action-btn" }//+ (item.status !== "承認待ち" ? " disabled" : "")} 
                                            name="X-mark" 
                                            width="35px" height="35px" round={true} 
                                            backgroundColor="#E2442E" padding="8px"
                                        /> : <></>
                                    }

                                    {
                                        item.status !== "承認待ち" ?
                                        <SvgIcon onClick={() => item.status === "承認待ち" ? {} : setDelete(item.startIndex)}
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
                    <tr>まだ記録がありません</tr>
                }
                </tbody>
            </table>
        </div>
    )
}