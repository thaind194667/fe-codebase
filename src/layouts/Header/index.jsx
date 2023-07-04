import './Header.scss'
import SvgIcon from '@/components/SvgIcon'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {apiURL, publicURL} from '@/hooks/hooks'
import axios from 'axios';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {
    
    const [notiList, setNotiList] = useState(localStorage.getItem('noti')?['あなたのリクエストはシステムのアドミンに送信されました。リクエストが処理されると通信が送信されます']:[])
    const navigate = useNavigate();

    const notiCount = notiList.length;

    const [read, setRead] = useState(localStorage.getItem('seen'));
    const [openUserTab, setOpenUser] = useState(false);
    const [openAdminTab, setOpenAdmin] = useState(false);
    const [openNoti, setOpenNoti] = useState(false);

    const [userInfo, setUserInfo] = useState({});

    const getUserData = () => {
        // axios.get();
        const headers = {
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }

        //set token in axios header
        axios.get(`${apiURL}/user`, {
            headers: headers
        })
        .then((res) => { 
            setUserInfo({
                username: res.data.userName,
                avatar: res.data.userAvatar,
            })
            console.log(res)
        })
        .catch((err) => { })
    }

    useEffect(() => {
        getUserData();
    }, [])

    const logout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('type_token');
        localStorage.removeItem('noti');
        navigate('/')
        window.location.reload();
    }

    // const openNotification = () => {
    //     setOpenUser(false);
    //     setOpenNoti(true);
    // }

    return (
        <div className="page-header row">
            {/* <div className="toast-container" style={{position: 'fixed'}}> */}
                <ToastContainer 
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    // draggable
                    pauseOnHover
                    theme="colored"
                />
            {/* </div> */}
            <div className='header-title'>
                <div className='col' onClick={() => navigate('/')}>
                    <p>Seishin</p>
                    <p>Massage</p>
                </div>
            </div>
            
            {
                localStorage.getItem('role') ? 
                localStorage.getItem('role') === 'admin' ? 
                <div className='admin-info row'>
                    <button className='black admin-btn' onClick={() => {
                        setOpenAdmin(!openAdminTab);
                        // alert(openAdminTab)
                    }}>システムアドミン</button> 
                    { openAdminTab ? 
                        <div className="admin-dropdown-panel col">
                            <div className="admin-dropdown-item" onClick={() => navigate('/search')}>
                                マッサージ店を探す
                            </div>
                            <hr />
                            <button className='green logout-btn' onClick={logout}>ログアウト</button>
                        </div> 
                        : <></>}
                </div>
                : <div className="user-info row">
                    <div className="col" style={{position: 'relative'}}>
                        <div className="notification-btn col" onClick={() => {
                                if(!read) {
                                    setRead(true);
                                    localStorage.setItem('seen', true)
                                }
                                setOpenNoti(!openNoti);
                                if(openUserTab) setOpenUser(false);
                            }}>
                            <SvgIcon name="notification-bell" />
                            {
                                notiCount && !read ? <div className='notification-number' >
                                    {notiCount}
                                </div> : <></>
                            }
                        </div>
                        
                    </div>
                    {/* <div className='user-control row'> */}
                    <div className="col" style={{position: 'relative',}}>
                        {/* <div className="row"> */}
                        <div className='user-control row' onClick={() => {
                                if(openNoti) setOpenNoti(false)
                                setOpenUser(!openUserTab)
                            }}>
                            <div className="user-avatar" style={{backgroundImage: `url(${publicURL}${userInfo.avatar})`}}>
                            </div>
                            <div className="user-name row" >
                                {userInfo.username}
                                <SvgIcon name={openUserTab ? 'header-pullup' : 'header-pulldown'} />
                            </div>
                        </div>
                        { openUserTab ? 
                            <div className="user-dropdown-panel col">
                                <div className="user-dropdown-item">
                                    プロファイル
                                </div>
                                {
                                    localStorage.getItem('role') === 'user' ?
                                    <div className="user-dropdown-item" onClick={()=>navigate("/my-shop")}>
                                        マッサージ部屋をリクエスト
                                    </div> : 
                                    <div className="user-dropdown-item">
                                        私のマッサージ部屋
                                    </div> 
                                }
                                <hr />
                                <button className='green logout-btn' onClick={logout}>ログアウト</button>
                            </div> 
                            : <></>}

                        { openNoti ? 
                            <div className="notification-panel col">
                            {
                                notiList.map((item, index) => {
                                    return (
                                        <div className={`notification-item ${index === 0 ? 'first' : ''}`} key={'noti-item'+index}> {item}</div>
                                    )
                                })
                            }
                            </div> : <></>
                        }
                    </div>
                </div>
                : <div className="non-user-action row">
                    <button className='info-btn white' >サインアップ</button>
                    <button className='info-btn black' onClick={() => navigate('/login')}>ログイン</button>
                </div>
            }
        </div>
    )
}