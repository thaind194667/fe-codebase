import './Header.scss'
import { useNavigate } from "react-router-dom";

export default function Header() {

    const navigate = useNavigate();

    return (
        <div className="page-header row">
            <div className='header-title'>
                <div className='col' onClick={() => navigate('/')}>
                    <p>Seishin</p>
                    <p>Massage</p>
                </div>
            </div>
            
            {
                localStorage.getItem('token') ? 
                (
                    <div className="user-info row">
                        <div className="user-avatar">

                        </div>
                        <div className="user-name">
                            Duc Anh
                        </div>
                    </div>
                )
                : (
                    <div className="user-info row">
                        <button className='info-btn white'>Sign up</button>
                        <button className='info-btn black'>Sign in</button>
                    </div>
                )
            }
        </div>
    )
}