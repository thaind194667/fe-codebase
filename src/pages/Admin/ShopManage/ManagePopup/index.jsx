import React, { useState } from 'react'
import "./ManagePopup.scss"
import logo from "@/pages/Popup/cross.png"
import Icon from "react-icons-kit"
import { question } from 'react-icons-kit/fa/question'

const popupList = {
  accept: {
    question: "このリクエストを承認してもよろしいですか?",
    message: "承認後、ストアが表示され、システム上で検索できるようになります。"
  },
  deny: {
    question: "このリクエストを断ってもよろしいですか?",
    message: "拒否するとシステム上にこのマッサージ店は表示されなくなります。"
  },
  active : {
    question: "この店を活性化してもよろしいですか？",
    message: "活性後、ストアが表示され、システム上で検索できるようになります。"
  },
  deactive: {
    question: "この店を無効化してもよろしいですか？",
    message: "無効化するとシステム上にこのマッサージ店は表示されなくなります。"
  },
  remove: {
    question: "この店を削除してもよろしいですか？",
    message: "削除するとシステム上にこのマッサージ店は表示されなくなります。"
  },
}

export default function ManagePopup({ popuptype, confirmPopup, cancelPopup }) {

  console.log(popuptype);


  return (popuptype) ? (
    <>
      <div className="manage-popup-overlay">
        <div className="popup">
          <div className="content">
            <div className='popup-title row'>
              {popuptype === "accept" || popuptype === "active" ?
                <div className="icon" style={{background: "#55990159"}}>
                  <Icon icon={question} size={30} style={{ color: "#559901" }} />
                </div>
                :
                <div className="icon" style={{background: "#E2442E8A"}}>
                  <Icon icon={question} size={30} style={{ color: "#8B0000" }} />
                </div>
              }
              <span className='popup-question'>{popupList[popuptype].question}</span>
            </div>
            <div className='popup-title row'>
              <span className='popup-note'>{popupList[popuptype].message}</span>
            </div>
            <div className='popup-button row'>
              <button type="button" 
                className="btn-ok" 
                onClick={() => confirmPopup()}
              >
                オーケー
              </button>
              <button type="button" 
                className="btn-cancel" 
                onClick={() => cancelPopup(false)}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : ""
}
