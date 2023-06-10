import Header from "@/layouts/Header"

import React from 'react'
import { Icon } from "react-icons-kit"
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { useState } from "react"

export default function Login() {
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

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


    return (
        <>
            <Header />
            <div className="login-form">
                <h2 className="login-title">ログイン</h2>
                <form action="#">
                    <div className="input-field">
                        <label htmlFor="mail-input" className="form-lable">メールアドレス</label>
                        <input type="text" id="mail-input" className="form-input" name="mail" placeholder="メールを入力してください" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="pass-input" className="form-lable">パスワード</label>
                        <div className="spec">
                            <input type={type} id="pass-input" className="spec-input" name="password" placeholder="********" />
                            <span onClick={visiblePassword}><Icon icon={icon} size={18} /></span>
                        </div>
                    </div>
                    <a href="#" className="link">パスワード忘れた</a>
                    <button type="submit" className="submit-btn">ログイン</button>
                    <div className="line"></div>
                    <div className="login-sub-text">アカウントを持っていない？</div>
                    <div className="latest">
                        <a href="#" className="register-btn">新しいアカウントを作成する</a>
                    </div>
                </form>
            </div>
        </>
    )
}