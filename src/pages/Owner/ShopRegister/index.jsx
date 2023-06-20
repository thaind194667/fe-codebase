import './ShopRegister.scss'
import Header from '@/layouts/Header'
import SvgIcon from '@/components/SvgIcon'
import { useState, useEffect } from 'react'
import Checkbox from '@/components/Checkbox'
import ImagePopup from './ImagePopup'
import Staff_Popup from '../StaffPopup/Staff_Popup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {apiURL, headersWithToken} from '@/hooks/hooks'
import Service from '../ServicePopup/Service'
import StaffCard from '@/components/StaffCard'
import DetailsService from '@/pages/User/Detail/DetailService'

const defaultErrorState = {
    name: false,
    email: false,
    address: false,
    phone: false,
    description: false,
    staffList: false,
    imgList: false,
    serviceList: false,
    confirm: false,
}

export default function ShopRegister() {

    const navigate = useNavigate();

    const [shopData, setData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        description: '',
    });

    const [staffList, setStaffList] = useState([]);
    const [imgList, setImgList] = useState({
        files : FileList, url: []
    });
    const [serviceList, setServiceList] = useState([]);

    const [openImgPopup, setOpenImg] = useState(false);

    const [openStaffPopup, setOpenStaff] = useState(false);
    const [currentStaff, setCurrStaff] = useState();

    const [openServicePopup, setOpenService] = useState(false);
    const [currentService, setCurrService] = useState();

    const [confirm, setConfirm] = useState(false);

    const [error, setError] = useState(defaultErrorState);

    const setTextareaHeight = (e) => {
        const textarea = document.getElementById("shop-info-description");
        textarea.style.height = "176px";
        let scHeight = e.target.scrollHeight;
        if (scHeight > 300)
            textarea.style.height = '300px';
        else
            textarea.style.height = `${scHeight}px`;
    }

    useEffect(() => {
        if(!imgList['url'].length)
            imgList['url'].push("add");
    }, [])

    // useEffect(() => {
    //     if(openImgPopup) 
    //         document.getElementsByClassName('page-body-shop-register')[0].style.overflow = 'hidden'
    //     else
    //         document.getElementsByClassName('page-body-shop-register')[0].style.overflow = 'auto'
    // }, [openImgPopup])

    // useEffect(() => {
    //     console.log(shopData);
    // }, [shopData])

    useEffect(() => {
        setError(   (prev) => ( { ...prev, imgList: false, } )  )
    }, [imgList])

    useEffect(() => {
        setError(   (prev) => ( { ...prev, staffList: false, } )  )
        console.log('staffList', staffList);
    }, [staffList])

    useEffect(() => {
        setError(   (prev) => ( { ...prev, serviceList: false, } )  )
    }, [serviceList])

    const setDataValue = (value, field) => {
        setData((prev) => ({
            ...prev,
            [field]: value,
        })
        );
        setError((prev) => ({ ...prev, [field]: false, }));
    }

    const postData = () => {
        console.log(imgList);
        const arr = {...imgList};
        // arr['url'].pop();
        const apiParams = {
            // token: localStorage.getItem('accessToken'),
            name: shopData.name,
            description: shopData.description,
            location: shopData.address,
            phoneNumber: shopData.phone,
            emailAddress: shopData.email,
            imageLibrary: arr['files'],
            staffList,
            // serviceList,
        }
        console.log(apiParams);
        axios.post(`${apiURL}/massage-facilities/store`, apiParams, {
            headers: headersWithToken,
        })
        .then((res) => {
            alert(res);
            console.log(res);
        })
        alert("Done");
    }

    const checkData = () => {
        let errorCount = 0;
        // setError(defaultErrorState);
        // if(!confirm) {
        //     setError(   (prev) => ( { ...prev, confirm: true, } )  )
        //     errorCount++;
        // }
        // for(const key in shopData)  {
        //     // console.log(key, shopData[key]);
        //     if(!shopData[key]) {
        //         setError(   (prev) => ( { ...prev, [key]: true, } )  );
        //         errorCount++;
        //     }
        // }
        // // if(!staffList.length) {
        // //     setError(   (prev) => ( { ...prev, staffList: true, } )  )
        // //     errorCount++;
        // // }
        // if(imgList.length === 1) {
        //     setError(   (prev) => ( { ...prev, imgList: true, } )  )
        //     errorCount++;
        // }
        // if(!serviceList.length) {
        //     setError(   (prev) => ( { ...prev, serviceList: true, } )  )
        //     errorCount++;
        // }
        if(errorCount) {
            alert("もう一度確認してすべてのフィールドに入力してください");
            return;
        }
        else 
            // alert('a');
            postData();
    }

    const imgListHandle = (data) => {
        setImgList(data);
        console.log(data);
        setOpenImg(false);
    }

    const staffListHandle = (data, index) => {
        let arr = [...staffList];
        if(index === -1)
            arr.push(data);
        else arr[index] = data;
        setStaffList(arr);
        setOpenStaff(false);
        setCurrStaff(undefined);
    }

    const serviceListHandle = (data, index) => {
        console.log(data);
        let arr = [...serviceList];
        if(index === -1)
            arr.push(data);
        else arr[index] = data;
        setServiceList(arr);
        setOpenService(false);
        setCurrService(undefined);
    }

    const setEditStaff = (index) => {
        setCurrStaff({
            data: staffList[index],
            index,
        });
        setOpenStaff(true);
    }

    const deleteStaff = (index) => {
        let arr = [...staffList];
        arr.splice(index, 1);
        setStaffList(arr);
        setCurrStaff(undefined);
    }

    const setEditService = (index) => {
        setCurrService({
            data :serviceList[index],
            index,
        });
        setOpenService(true);
    }

    const deleteService = (index) => {
        let arr = [...serviceList];
        arr.splice(index, 1);
        setServiceList(arr);
        setCurrService(undefined)
    }

    return (
        <>
            <Header />
            <div className="page-body-shop-register col">
                <div className="body-title">
                    今日、あなたのマッサージ部屋をシステムに表示するために登録しましょう！
                </div>

                <div className="body-form col">
                    <div className="shop-info-form col">
                        <div className="row" style={{ gap: '10px' }}>
                            <div className="col input-field">
                                <div className="form-title">
                                    名前 <span className='required-field'>*</span>
                                </div>
                                <div className="form-input col">
                                    <input type="text" required
                                        placeholder='名前を入力してください'
                                        value={shopData.name}
                                        onChange={(e) => setDataValue(e.target.value, 'name')} />
                                    {error.name ?
                                        <span className='error'>名前は必須です！</span> :
                                        <></>}
                                </div>
                            </div>

                            <div className="col input-field">
                                <div className="form-title">
                                    イーメール <span className='required-field'>*</span>
                                </div>
                                <div className="form-input col">
                                    <input type="text"
                                        placeholder='イーメールを入力してください'
                                        value={shopData.email}
                                        onChange={(e) => setDataValue(e.target.value, 'email')}
                                    />
                                    {error.email ?
                                        <span className='error'>イーメールは必須です！</span> :
                                        <></>}
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{ gap: '10px' }}>
                            <div className="col input-field">
                                <div className="form-title">
                                    アドレス <span className='required-field'>*</span>
                                </div>
                                <div className="form-input col">
                                    <input type="text"
                                        placeholder='アドレスを入力してください'
                                        value={shopData.address}
                                        onChange={(e) => setDataValue(e.target.value, 'address')} />
                                    {error.address ?
                                        <span className='error'>アドレスは必須です！</span> :
                                        <></>}
                                </div>
                            </div>

                            <div className="col input-field">
                                <div className="form-title">
                                    電話番号 <span className='required-field'>*</span>
                                </div>
                                <div className="form-input col">
                                    <input type="text"
                                        placeholder='電話番号を入力してください'
                                        value={shopData.phone} 
                                        onChange={(e) => setDataValue(e.target.value, 'phone')}/>
                                    {error.phone ? 
                                        <span className='error'>電話番号は必須です！</span> : 
                                        <></>}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col input-field">
                                <div className="form-title">
                                    説明 <span className='required-field'>*</span>
                                </div>
                                <div className="form-input col">
                                    <textarea
                                        name="description"
                                        id="shop-info-description"
                                        placeholder='説明を入力してください'
                                        onKeyUp={setTextareaHeight}
                                        value={shopData.description}
                                        onChange={(e) => setDataValue(e.target.value, 'description')}
                                    >

                                    </textarea>
                                    {error.description ?
                                        <span className='error'>説明は必須です！</span> :
                                        <></>}
                                    {/* <input type="text" placeholder='説明を入力してください'/> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shop-gallery-form col">
                        <div className="form-title">
                            画像ギャラリー <span className='required-field'>*</span>
                        </div>
                        {error.imgList ?
                            <span className='error'>画像ギャラリーは少なくとも1つが含まれています！</span> :
                            <></>}

                        <div className="form-notice">
                            {imgList['url'].length - 1}枚の写真が選択されています
                        </div>

                        <div>
                            <button className='black form-btn row' onClick={() => setOpenImg(true)}>
                                <SvgIcon width='25px' height="25px" name="icon-plus" className="icon-plus" />
                                <SvgIcon width='25px' height="25px" name="icon-plus-hover" className="icon-plus-hover" />
                                <div style={{ marginLeft: '36px' }}>追加</div>
                            </button>
                        </div>
                    </div>

                    <div className="shop-staff-form col">
                        <div className="form-title">
                            スタッフ <span className='required-field'>*</span>
                        </div>
                        {error.staffList ?
                            <span className='error'>スタッフは少なくとも１人が含まれています！</span> :
                            <></>}

                        <div className="staff-list row">
                        {
                            staffList.map((item, index) => {
                                console.log('111');
                                return (
                                    <StaffCard edit key={`staff${item}`}
                                        data={item}
                                        openEditStaff={() => setEditStaff(index)} 
                                        deleteStaff={() => deleteStaff(index)} 
                                    />
                                )
                            })
                        }
                        </div>

                        <div>
                            <button className='black form-btn row' onClick={() => setOpenStaff(true)}>
                                <SvgIcon width='25px' height="25px" name="icon-plus" className="icon-plus" />
                                <SvgIcon width='25px' height="25px" name="icon-plus-hover" className="icon-plus-hover" />
                                <div style={{ marginLeft: '36px' }}>追加</div>
                            </button>
                        </div>
                    </div>

                    <div className="shop-service-form col">
                        <div className="form-title">
                            提供サービス <span className='required-field'>*</span>
                        </div>
                        {error.serviceList ?
                            <span className='error'>提供サービスは少なくとも1つが含まれています！</span> :
                            <></>}

                        <div className="service-list col">
                        {
                            serviceList.map((item, index) => {
                                return (
                                    <DetailsService edit key={`service${index}`}
                                    data={item} 
                                    openEditService={() => setEditService(index)} 
                                    deleteService={() => deleteService(index)}/>
                                )
                            })
                        }
                        </div>

                        <div>
                            <button onClick={()=>{setOpenService(true)}} className='black form-btn row'>
                                <SvgIcon width='25px' height="25px" name="icon-plus" className="icon-plus"/>
                                <SvgIcon width='25px' height="25px" name="icon-plus-hover" className="icon-plus-hover"/>
                                <div style={{marginLeft: '36px'}}>追加</div>
                            </button>
                        </div>
                    </div>

                    <div className="col" >
                        <div className=' confirm-field row' onClick={() => {
                            setConfirm(!confirm);
                            setError((prev) => ({ ...prev, confirm: false, }))
                        }}>
                            <Checkbox
                                item={{
                                    check: confirm,
                                }}
                                length={20} />
                            上記の情報が真実であることを保証します
                        </div>
                        {error.confirm ?
                            <span className='error'>保証は必須です！</span> :
                            <></>}
                    </div>

                    <div className="btn-field row">
                        <button
                            className="green request-confirm"
                            onClick={checkData}
                        >
                            リクエスト
                        </button>
                        <div style={{ flex: '1' }}></div>
                        <button
                            className="red cancel-confirm"
                            onClick={() => navigate('/')}
                        >
                            キャンセル
                        </button>
                    </div>
                </div>
            </div>
            { openImgPopup ? 
                <ImagePopup confirmPopup={imgListHandle} closePopup={() => setOpenImg(false)} 
                    data={imgList} /> : <></> }
            { openStaffPopup ? 
                <Staff_Popup confirmPopup={staffListHandle} closePopup={() => {setOpenStaff(false); setCurrStaff(undefined)}} 
                    data={currentStaff ? currentStaff.data : undefined} 
                    index={ currentStaff ? currentStaff.index : -1} 
                /> : <></>}
            { openServicePopup ? 
                <Service confirmPopup={serviceListHandle} closePopup={() => {setOpenService(false); setCurrService(undefined)}} 
                    data={currentService ? currentService.data : undefined} 
                    index={ currentService ? currentService.index : -1} 
                /> : <></> }

        </>
    )
}