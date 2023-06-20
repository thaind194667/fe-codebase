import Header from "@/layouts/Header"
import { useState } from "react";
import Staff_Popup from "./StaffPopup/Staff_Popup";
import { useNavigate } from "react-router-dom"


export default function HomeOwner () {
    const [displayStaff, setDisplayStaff] = useState(false);

    const navigate = useNavigate();

    const fakeStaffData = [
        {
            "name": "aaaaaa",
            "DOB": "01/01/2001",
            "gender": 1,
            "jlpt": "3",
            "hometown": "aaaaaaaaaaaaaaaaaaaaa",
            // "image": {
            //     "url": "blob:http://127.0.0.1:5173/ff06675c-c42f-4900-acbe-cd4b218af9c5"
            // },
            // "certificateImage": {
            //     "url": "blob:http://127.0.0.1:5173/5d5b55bd-6083-49d7-8961-379abbca85c6"
            // }
        },
        {
            "name": "bbbbbbbb",
            "DOB": "07/06/2023",
            "gender": 0,
            "jlpt": "1",
            "hometown": "bbbbbbbbbbbbbbbbbbbbbbbb"
        }
    ]
    return (
        <>
            <Header></Header>
            <div>This is owner homepage</div>
            <div> &emsp; If you want to change role, <b>Inspect</b> then choose <b>Application</b>, then delete value in <b>local storage</b>. Then reaload the page</div>
            <button type="button" onClick={()=>setDisplayStaff(true)}><span>+</span> 追加</button>
            {
                displayStaff ? 
                <Staff_Popup data={fakeStaffData[1]} index={0} closePopup={() => setDisplayStaff(false)}/>
                : <></>
            }
            <button onClick={() => navigate('/my-shop')}>To my shop</button>
        </>
    )
}