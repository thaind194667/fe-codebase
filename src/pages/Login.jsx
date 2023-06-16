import Header from "@/layouts/Header"

import React from 'react'
import { Icon } from "react-icons-kit"
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { useState } from "react"
import { apiURL, publicURL } from "@/hooks/hooks";
import axios from 'axios';
import Login_popup from "./Popup/login_popup"

export default function Login() {
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);
    const [userID, setUserID] = useState(0);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [role, setRole] = useState('');
    const [popup, setPopup] = useState(false);
    const [displayPopup, setDisplayPopup] = useState(false);
    const [txtPopup, setTxtPopup] = useState('');



    const visiblePassword = () => {
        if (type === "password") {
            setType("text");
            setIcon(eye);
        }
        else {
            setType("password");
            setIcon(eyeOff);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiParams = {
            email: email,
            password: pwd,
        }

        try {
            let response = await axios.post(`${apiURL}/login`, apiParams)
            if (response.data.userID >= 0) {
                localStorage.setItem('role', response.data.userType);
                
                //window.location.reload();
                
            }
            else {
                setDisplayPopup(true);
                setTxtPopup('ログイン')
            }
            setUserName('');
            setPwd('');

        }
        catch (err) {
            console.log(err);
        }
    }




    return (
        <>
            <Header />
            <div className="login-form">
                <h2 className="login-title">ログイン</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label htmlFor="mail-input" className="form-lable">メールアドレス</label>
                        <input type="email" id="mail-input" className="form-input" name="mail" placeholder="メールを入力してください" required
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="pass-input" className="form-lable">パスワード</label>
                        <div className="spec">
                            <input type={type} id="pass-input" className="spec-input" name="password" pattern=".{6,18}" placeholder="********" required
                                title="Password from 6 to 18 characters" value={pwd} onChange={(e) => setPwd(e.target.value)}
                            />
                            <span onClick={visiblePassword}><Icon icon={icon} size={18} /></span>
                        </div>
                    </div>
                    <a href="#" className="link">パスワード忘れた</a>
                    <button className="submit-btn">ログイン</button>
                    <div className="line"></div>
                    <div className="login-sub-text">アカウントを持っていない？</div>
                    <div className="latest">
                        <a href="#" className="register-btn">新しいアカウントを作成する</a>
                    </div>
                </form>
            </div>
            <Login_popup display={displayPopup} setDisplay={setDisplayPopup} txtPopup={txtPopup} />
        </>
    )
}