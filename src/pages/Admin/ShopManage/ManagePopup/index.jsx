import React, { useState } from 'react'
import "./ManagePopup.scss"
import logo from "@/pages/Popup/cross.png"
import Icon from "react-icons-kit"
import { question } from 'react-icons-kit/fa/question'

export default function ManagePopup({ display, setDisplay, txtPopup, popuptype }) {


  return (display) ? (
    <>
      <div className="manage-popup-overlay">
        <div className="popup">
          <div className="content">
            <div className='popup-title row'>
              {popuptype === "access" ?
                <div className="icon" style={{background: "#55990159"}}>
                  <Icon icon={question} size={30} style={{ color: "#559901" }} />
                </div>
                :
                <div className="icon" style={{background: "#E2442E8A"}}>
                  <Icon icon={question} size={30} style={{ color: "#8B0000" }} />
                </div>
              }
              <span className='popup-question'>{popuptype === "access" ? "このリクエストを承認してもよろしいですか?" : "このリクエストを断ってもよろしいですか?"}</span>
            </div>
            <div className='popup-title row'>
              <span className='popup-note'>{popuptype === "access" ? "承認後、ストアが表示され、システム上で検索できるようになります。" : "拒否するとシステム上にこのマッサージ部屋は表示されなくなります。"}</span>
            </div>
            <div className='popup-button row'>
              <button popuptype="button" className="btn-ok" onClick={() => setDisplay(false)}>オーケー</button>
              <button popuptype="button" className="btn-cancel" onClick={() => setDisplay(false)}>キャンセル</button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : ""
}
