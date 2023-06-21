import React, { useState } from 'react'
import './StaffCard.scss'
import SvgIcon from '@/components/SvgIcon'
import { Icon } from 'react-icons-kit'
import { calendar } from 'react-icons-kit/fa/calendar'
import { user } from 'react-icons-kit/fa/user'
import { home } from 'react-icons-kit/fa/home'
import {publicURL} from '@/hooks/hooks'

const StaffCard = ({ data, edit, openEditStaff, deleteStaff}) => {

    // const [canChange, setCanChange] = useState(true)

    return (
        <div className='col staff-card-element'>
            <div className='staff-card-info col'>
                <div className='staff-card-avatar' 
                    style={{ 
                        backgroundImage: `url(${edit ? data.image.url : publicURL + data.image})` 
                }}>
                </div>
                <div className='staff-card-name'>
                    <span>{data.name}</span>
                </div>
                <div className='staff-card-jlpt'>
                    <span className='txt-bold'>JLPT: </span>N{data.jlpt}
                </div>
                <div className='staff-card-birth'>
                    <span className='mgr-10'><Icon icon={calendar} /></span>
                    <span className='txt-bold'>生年月日: </span>{edit ? data.DOB : data.dob}
                </div>
                <div className='staff-card-sex'>
                    <span className='mgr-10'><Icon icon={user} /></span>
                    <span className='txt-bold'>性別: </span> {data.gender === '1' ? '男性' : '女性'}
                </div>
                <div className='staff-card-hometown'>
                    <span className='mgr-10'><Icon icon={home} /></span>
                    <span className='txt-bold'>ホームタウン: </span>{data.hometown}
                </div>
            </div>
                {
                    edit ? (
                        <>
                            <div className='staff-card-change center-item row'>
                                <div onClick={openEditStaff}>
                                    <SvgIcon
                                        className="img-btn" name="edit-icon"
                                        width="35px" height="35px" round={true} backgroundColor="#fff" padding="8px"
                                    />
                                </div>
                                <div onClick={deleteStaff}>
                                    <SvgIcon
                                        className="img-btn" name="delete-icon"
                                        width="35px" height="35px" round={true} backgroundColor="#ffff" padding="8px"
                                    />
                                </div>
                            </div>
                        </>
                    ) : <></>
                }

        </div>
    )
}

export default StaffCard