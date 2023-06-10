import './Header.scss'
import SvgIcon from '@/components/SvgIcon'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const notiList = [
    "Notification1",
    "Notification2",
    "Notification3", 
    "Testing",
]

export default function Header() {

    const navigate = useNavigate();

    const notiCount = notiList.length;

    const [read, setRead] = useState(false);
    const [openUserTab, setOpenUser] = useState(false);
    const [openNoti, setOpenNoti] = useState(false);

    const logout = () => {
        localStorage.removeItem('role');
        navigate('/')
        window.location.reload();
    }

    // const openNotification = () => {
    //     setOpenUser(false);
    //     setOpenNoti(true);
    // }
    // const open

    return (
        <div className="page-header row">
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
                    <button className='black admin-btn' onClick={logout}>システムアドミン</button> 
                </div>
                : <div className="user-info row">
                    <div className="col" style={{position: 'relative'}}>
                        <div className="notification-btn col" onClick={() => {
                                if(!read) setRead(true);
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
                            <div className="user-avatar">
                            </div>
                            <div className="user-name row" >
                                Duc Anh
                                <SvgIcon name={openUserTab ? 'header-pullup' : 'header-pulldown'} />
                            </div>
                        </div>
                        { openUserTab ? 
                            <div className="user-dropdown-panel col">
                                <div className="user-dropdown-item">
                                    プロファイル
                                </div>
                                <div className="user-dropdown-item">
                                    マッサージ部屋をリクエスト
                                </div>
                                <hr />
                                <button className='logout-btn' onClick={logout}>ログアウト</button>
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
                    <button className='info-btn white' >Sign up</button>
                    <button className='info-btn black' onClick={() => navigate('/login')}>Sign in</button>
                </div>
            }
        </div>
    )
}