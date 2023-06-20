import React, { useState } from 'react'
import './StaffCard.scss'
import SvgIcon from '@/components/SvgIcon'
import { Icon } from 'react-icons-kit'
import { calendar } from 'react-icons-kit/fa/calendar'
import { user } from 'react-icons-kit/fa/user'
import { home } from 'react-icons-kit/fa/home'

const StaffCard = () => {

    const [canChange, setCanChange] = useState(true)



    return (
        <>
            <div className="staff-card-list row">
                <div className='staff-card-element col'>
                    <div className='staff-card-avatar' style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg8-1YS5F5gtLy0gjKnyxuh6PtmmffLVwrSzGvNDeYQw&s")` }}></div>
                    <div className='staff-card-name'>
                        <span>広瀬すず</span>
                    </div>
                    <div className='staff-card-jlpt'>
                        <span className='txt-bold'>JLPT: </span>N2
                    </div>
                    <div className='staff-card-birth'>
                        <span className='mgr-10'><Icon icon={calendar} /></span>
                        <span className='txt-bold'>生年月日: </span>12/09/1998
                    </div>
                    <div className='staff-card-sex'>
                        <span className='mgr-10'><Icon icon={user} /></span>
                        <span className='txt-bold'>性別: </span> 女性
                    </div>
                    <div className='staff-card-hometown'>
                        <span className='mgr-10'><Icon icon={home} /></span>
                        <span className='txt-bold'>ホームタウン: </span>ベトナム、ハイフォン市
                    </div>
                    {
                        canChange ? (
                            <>
                                <div className='staff-card-change center-item row'>
                                    <SvgIcon
                                        className="img-btn" name="edit-icon"
                                        width="35px" height="35px" round={true} backgroundColor="#fff" padding="8px"
                                    />

                                    <SvgIcon
                                        className="img-btn" name="delete-icon"
                                        width="35px" height="35px" round={true} backgroundColor="#ffff" padding="8px"
                                    />
                                </div>
                            </>

                        ) : <></>
                    }
                </div>
                <div className='staff-card-element col'>
                    <div className='staff-card-avatar' style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg8-1YS5F5gtLy0gjKnyxuh6PtmmffLVwrSzGvNDeYQw&s")` }}></div>
                    <div className='staff-card-name'>
                        <span>広瀬すず</span>
                    </div>
                    <div className='staff-card-jlpt'>
                        <span className='txt-bold'>JLPT: </span>N2
                    </div>
                    <div className='staff-card-birth'>
                        <span className='mgr-10'><Icon icon={calendar} /></span>
                        <span className='txt-bold'>生年月日: </span>12/09/1998
                    </div>
                    <div className='staff-card-sex'>
                        <span className='mgr-10'><Icon icon={user} /></span>
                        <span className='txt-bold'>性別: </span> 女性
                    </div>
                    <div className='staff-card-hometown'>
                        <span className='mgr-10'><Icon icon={home} /></span>
                        <span className='txt-bold'>ホームタウン: </span>ベトナム、ハイフォン市
                    </div>
                    {
                        canChange ? (
                            <>
                                <div className='staff-card-change center-item row'>
                                    <SvgIcon
                                        className="img-btn" name="edit-icon"
                                        width="35px" height="35px" round={true} backgroundColor="#fff" padding="8px"
                                    />

                                    <SvgIcon
                                        className="img-btn" name="delete-icon"
                                        width="35px" height="35px" round={true} backgroundColor="#ffff" padding="8px"
                                    />
                                </div>
                            </>

                        ) : <></>
                    }
                </div>
                <div className='staff-card-element col'>
                    <div className='staff-card-avatar' style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg8-1YS5F5gtLy0gjKnyxuh6PtmmffLVwrSzGvNDeYQw&s")` }}></div>
                    <div className='staff-card-name'>
                        <span>広瀬すず</span>
                    </div>
                    <div className='staff-card-jlpt'>
                        <span className='txt-bold'>JLPT: </span>N2
                    </div>
                    <div className='staff-card-birth'>
                        <span className='mgr-10'><Icon icon={calendar} /></span>
                        <span className='txt-bold'>生年月日: </span>12/09/1998
                    </div>
                    <div className='staff-card-sex'>
                        <span className='mgr-10'><Icon icon={user} /></span>
                        <span className='txt-bold'>性別: </span> 女性
                    </div>
                    <div className='staff-card-hometown'>
                        <span className='mgr-10'><Icon icon={home} /></span>
                        <span className='txt-bold'>ホームタウン: </span>ベトナム、ハイフォン市
                    </div>
                    {
                        canChange ? (
                            <>
                                <div className='staff-card-change center-item row'>
                                    <SvgIcon
                                        className="img-btn" name="edit-icon"
                                        width="35px" height="35px" round={true} backgroundColor="#fff" padding="8px"
                                    />

                                    <SvgIcon
                                        className="img-btn" name="delete-icon"
                                        width="35px" height="35px" round={true} backgroundColor="#ffff" padding="8px"
                                    />
                                </div>
                            </>

                        ) : <></>
                    }
                </div>
                <div className='staff-card-element col'>
                    <div className='staff-card-avatar' style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg8-1YS5F5gtLy0gjKnyxuh6PtmmffLVwrSzGvNDeYQw&s")` }}></div>
                    <div className='staff-card-name'>
                        <span>広瀬すず</span>
                    </div>
                    <div className='staff-card-jlpt'>
                        <span className='txt-bold'>JLPT: </span>N2
                    </div>
                    <div className='staff-card-birth'>
                        <span className='mgr-10'><Icon icon={calendar} /></span>
                        <span className='txt-bold'>生年月日: </span>12/09/1998
                    </div>
                    <div className='staff-card-sex'>
                        <span className='mgr-10'><Icon icon={user} /></span>
                        <span className='txt-bold'>性別: </span> 女性
                    </div>
                    <div className='staff-card-hometown'>
                        <span className='mgr-10'><Icon icon={home} /></span>
                        <span className='txt-bold'>ホームタウン: </span>ベトナム、ハイフォン市
                    </div>
                    {
                        canChange ? (
                            <>
                                <div className='staff-card-change center-item row'>
                                    <SvgIcon
                                        className="img-btn" name="edit-icon"
                                        width="35px" height="35px" round={true} backgroundColor="#fff" padding="8px"
                                    />

                                    <SvgIcon
                                        className="img-btn" name="delete-icon"
                                        width="35px" height="35px" round={true} backgroundColor="#ffff" padding="8px"
                                    />
                                </div>
                            </>

                        ) : <></>
                    }
                </div>
                <div className='staff-card-element col'>
                    <div className='staff-card-avatar' style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg8-1YS5F5gtLy0gjKnyxuh6PtmmffLVwrSzGvNDeYQw&s")` }}></div>
                    <div className='staff-card-name'>
                        <span>広瀬すず</span>
                    </div>
                    <div className='staff-card-jlpt'>
                        <span className='txt-bold'>JLPT: </span>N2
                    </div>
                    <div className='staff-card-birth'>
                        <span className='mgr-10'><Icon icon={calendar} /></span>
                        <span className='txt-bold'>生年月日: </span>12/09/1998
                    </div>
                    <div className='staff-card-sex'>
                        <span className='mgr-10'><Icon icon={user} /></span>
                        <span className='txt-bold'>性別: </span> 女性
                    </div>
                    <div className='staff-card-hometown'>
                        <span className='mgr-10'><Icon icon={home} /></span>
                        <span className='txt-bold'>ホームタウン: </span>ベトナム、ハイフォン市
                    </div>
                    {
                        canChange ? (
                            <>
                                <div className='staff-card-change center-item row'>
                                    <SvgIcon
                                        className="img-btn" name="edit-icon"
                                        width="35px" height="35px" round={true} backgroundColor="#fff" padding="8px"
                                    />

                                    <SvgIcon
                                        className="img-btn" name="delete-icon"
                                        width="35px" height="35px" round={true} backgroundColor="#ffff" padding="8px"
                                    />
                                </div>
                            </>

                        ) : <></>
                    }
                </div>
            </div>

        </>
    )
}

export default StaffCard