import React from 'react'
import { useState, useEffect } from 'react';
// import "./Service_.scss"
import { Icon } from 'react-icons-kit'
import { image } from 'react-icons-kit/fa/image'
import { close } from 'react-icons-kit/fa/close'

function Service({display, setDisplay}) {
    const [jlptImage, setJlptImage] = useState();

    const handleUpLoadJLPTImg = (e) => {
        const file = e.target.files[0];
        file.url = (URL.createObjectURL(file));
        setJlptImage(file);
      }

    const closePopup = () => {
        setDisplay(false);
    }
    const upLoadJlptImageInput = () => {
        document.querySelector(".jlpt-input").click()
    }

    const handle = () => {
        setDisplay(false);
    }

    
    return (
        <div className='staff-popup-overlay'>
            <div className='popup'>
                <div className='content'>
                    <span className="ti-close" onClick={closePopup}>
                        <Icon icon={close} size={18} />
                    </span>
                    <div className="popup-title">
                        サービスの追加
                    </div>
                    <div className='popup-form'>
                        <div className='row'>
                            <div className='col' style={{flex: '1'}}>
                                <div className='col-title'>
                                    名前<span>*</span>
                                </div>
                                <input type='text' className='txt-input' placeholder='名前を入力してください' />
                                
                                <div className='col-title'>
                                    説明<span>*</span>
                                </div>
                                <input type='text' className='txt-input' placeholder='説明を入力してください' style={{height: '271px'}} />

                                
                            </div>
                            <div className='col' style={{flex: '1'}}>
                                <div className='col-title'>
                                    イメージ<span>*</span>
                                    <input type="file" className='jlpt-input' onChange={handleUpLoadJLPTImg} hidden />
                                </div>
                                
                                <div className='img-input center-item'>
                                {jlptImage ?
                                    <div className='img-upload'>
                                    <img src={jlptImage.url} onClick={upLoadJlptImageInput} alt={"アバター"} />
                                    <span className='tool-text'>変える</span>
                                    </div>
                                    :
                                    <span className='icon-img' onClick={upLoadJlptImageInput}>
                                    <Icon icon={image} />
                                    </span>
                                }
                                </div>
                                <div className='col-title'>
                                        価格<span>*</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn">
                        <div className="space-between">
                            <button type='button' onClick={handle} className='green btn-add'>保存する</button>
                            <button type='button' onClick={closePopup} className='red btn-cancel' >キャンセル</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service