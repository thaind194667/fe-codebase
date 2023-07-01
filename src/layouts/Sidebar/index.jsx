import "./Sidebar.scss"
import Icon from "react-icons-kit"
import { ic_assignment_outline } from 'react-icons-kit/md/ic_assignment_outline'
import { ic_home_outline } from 'react-icons-kit/md/ic_home_outline'
import { ic_supervisor_account_outline } from 'react-icons-kit/md/ic_supervisor_account_outline'
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {

    // const location = useLocation();

    const isActive = (currentPath, pagePath) => {
        if (currentPath === pagePath) return "active";
        else return "";
    }


    return (
        <>
            <div className="sidenav">
                <ul className="nav-menu-items">
                    <Link to="/one">
                        <li className={"menu-item " + isActive(location.pathname, "/one")}>
                            <div className="menu-item-icon"><Icon icon={ic_assignment_outline} size={30} /></div>
                            <span>リクエスト管理</span>
                        </li>
                    </Link>
                    <Link to="/two">
                        <li className={"menu-item " + isActive(location.pathname, "/two")}>
                            <div className="menu-item-icon"><Icon icon={ic_home_outline} size={30} /></div>
                            <span>マッサージ店管理</span>
                        </li>
                    </Link>
                    <div className="underline"></div>
                    <Link to="/three">
                        <li className={"menu-item mrt-15 " + isActive(location.pathname, "/three")}>
                            <div className="menu-item-icon"><Icon icon={ic_supervisor_account_outline} size={30} /></div>
                            <span>ユーザー管理</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </>
    )
}