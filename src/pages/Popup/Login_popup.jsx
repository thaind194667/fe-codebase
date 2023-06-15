import React, { useState } from 'react'
import "./popup.scss"
import logo from "./cross.png"

export default function Login_popup({display, setDisplay, txtPopup}) {
  

  return (display)?(
    <>
      <div id="popup1" className="popup-overlay">
        <div className="popup">
          <div className="content">
            <div className='text-content'>
              {txtPopup}が失敗しますた。
              <img src={logo} className='logo' />
            </div>
            <button type="button" className="btn-ok" onClick={ ()=>setDisplay(false)}>OK</button>
          </div>
        </div>
      </div>
    </>
  ) :""
}
