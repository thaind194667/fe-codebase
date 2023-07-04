import Header from "@/layouts/Header"

import React from 'react'
import { Icon } from "react-icons-kit"
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { useState } from "react"
import { apiURL, publicURL } from "@/hooks/hooks";
import axios from 'axios';
import Login_popup from "./Popup/Login_popup"
import { Navigate, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';

export default function Login() {
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);
    const [userID, setUserID] = useState(0);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [pwd, setPwd] = useState('');
    const [role, setRole] = useState('');
    const [popup, setPopup] = useState(false);
    // const [displayPopup, setDisplayPopup] = useState(false);
    const [txtPopup, setTxtPopup] = useState('');
    const [error, setError] = useState({
        email : "",
        password: "",
        final: "",
    })
    const navigate = useNavigate();


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

    // const sendToken = async () => {
    //     const headers = {
    //         accept: 'application/json',
    //         Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    //     }

    //     //set token in axios header
    //     axios.get(`${apiURL}/user`, {
    //         headers: headers
    //     })
    //     .then((res) => { console.log(res)})
    //     .catch((err) => { })
    // }

    const handleSubmit = async (e) => {
        let errorCount = 0;
        if(!email) {
            setError( (prev) => ( { ...prev, email: 'イーメールアドバイスは必須です！', } ) )
            errorCount++;
        }
        else if ( email && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ){
            setError(   (prev) => ( { ...prev, email: 'イーメールは正しい形を入力してください！', } )  )
            errorCount++;
        }
        if(!pwd) {
            setError( (prev) => ( { ...prev, password: 'パスワードは必須です！', } ) )
            errorCount++;
        }
        else if(pwd.length < 6 || pwd.length > 18) {
            setError( (prev) => ( { ...prev, password: 'パスワードの長さは6~18文字である必要があります！', } ) )
            errorCount++;
        }
        e.preventDefault();
        if(errorCount) return;
        const apiParams = {
            email: email,
            password: pwd,
        }

        try {
            let response = await axios.post(`${apiURL}/login`, apiParams)
            if (response.data.userID < 0) {
                // setDisplayPopup(true);
                // setTxtPopup('ログイン')
                // toast.error("")
                setError({
                    ...error,
                    final: "アドバイスまたはパスワードはまちがってしまいました",
                });
            }
            else {
                console.log(response.data)
                localStorage.setItem('role', response.data.userType)
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('type_token', response.data.type_token);
                toast.success("ログインが成功しました！");

                setTimeout(() => {
                    window.location.reload();
                }, 600)

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
                        <input //type="email" 
                            id="mail-input" className="form-input" name="mail" placeholder="メールを入力してください"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            onInput={() => setError( (prev) => ( { ...prev, email: '', } ) )}
                        />
                        {error.email ? <span style={{color: 'red'}}> {error.email} </span> : <></>}
                    </div>
                    <div className="input-field">
                        <label htmlFor="pass-input" className="form-lable">パスワード</label>
                        <div className="spec">
                            <input  //type={type}  pattern=".{6,18}"
                                type={type}
                                id="pass-input" className="spec-input" name="password"  placeholder="********"
                                title="パスワードの長さは6~18文字であります！" value={pwd} onChange={(e) => setPwd(e.target.value)}
                                onInput={() => setError("")}
                            />
                            <span onClick={visiblePassword}><Icon icon={icon} size={18} /></span>


                        </div>
                        {error.password ? <span style={{color: 'red'}}> {error.password} </span> : <></>}
                    </div>
                    {error.final ? <span style={{color: 'red'}}> {error.final} </span> : <></>}
                    <a href="#" className="link">パスワード忘れた</a>
                    <button className="submit-btn">ログイン</button>
                    <div className="line"></div>
                    <div className="login-sub-text">アカウントを持っていない？</div>
                    <div className="latest">
                        <a href="#" className="register-btn">新しいアカウントを作成する</a>
                    </div>
                </form>
            </div>
            {/* <Login_popup display={displayPopup} setDisplay={setDisplayPopup} txtPopup={txtPopup} /> */}
        </>
    )
}