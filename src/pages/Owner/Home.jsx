import Header from "@/layouts/Header"
import { useState } from "react";
import Staff_Popup from "./RegisterPopup/Staff_Popup";
import { useNavigate } from "react-router-dom"


export default function HomeOwner () {
    const [displayStaff, setDisplayStaff] = useState(false);

    const navigate = useNavigate();
    return (
        <>
            <Header></Header>
            <div>This is owner homepage</div>
            <div> &emsp; If you want to change role, <b>Inspect</b> then choose <b>Application</b>, then delete value in <b>local storage</b>. Then reaload the page</div>
            <button type="button" onClick={()=>setDisplayStaff(true)}><span>+</span> 追加</button>
            <Staff_Popup display = {displayStaff} setDisplay = {setDisplayStaff}/>
            <button onClick={() => navigate('/my-shop')}>To my shop</button>
        </>
    )
}