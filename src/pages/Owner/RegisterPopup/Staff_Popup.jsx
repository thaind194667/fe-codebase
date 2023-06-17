import React from 'react'
import { useState, useEffect } from 'react';
import "./staffpopup.scss"
import { DatePicker } from 'antd';
import { Icon } from 'react-icons-kit'
import { image } from 'react-icons-kit/fa/image'
import { close } from 'react-icons-kit/fa/close'

const Staff_Popup = (props) => {

  const [birthday, setBirthDay] = useState('');
  const [avatar, setAvatar] = useState();
  const [jlptImage, setJlptImage] = useState();


  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.url);
    }
  }, [avatar])

  useEffect(() => {
    return () => {
      jlptImage && URL.revokeObjectURL(jlptImage.url);
    }
  }, [jlptImage])


  const handleUpLoadImg = (e) => {
    const file = e.target.files[0];
    file.url = (URL.createObjectURL(file));
    setAvatar(file);
  }

  const handleUpLoadJLPTImg = (e) => {
    const file = e.target.files[0];
    file.url = (URL.createObjectURL(file));
    setJlptImage(file);
  }

  const upLoadAvatarInput = () => {
    document.querySelector(".avatar-input").click()
  }

  const upLoadJlptImageInput = () => {
    document.querySelector(".jlpt-input").click()
  }


  const closePopup = () => {
    props.setDisplay(false);
  }

  const handle = () => {
    props.setDisplay(false);
  }



  return (props.display) ? (
    <>
      <div className="staff-popup-overlay">
        <div className="popup">
          <div className="content">
            <span className="ti-close" onClick={closePopup}>
              <Icon icon={close} size={18} />
            </span>
            <div className="popup-title">
              スタッフの追加
            </div>
            <div className='popup-form'>
              <div className='row'>
                <div className='avatar-col col'>
                  <div className='col-title'>
                    アバター <span>*</span>
                  </div>
                  <input type="file" className='avatar-input' onChange={handleUpLoadImg} hidden />
                  <div className='avatar center-item'>
                    {avatar ?
                      <div className='img-upload'>
                        <img src={avatar.url} onClick={upLoadAvatarInput} alt={"アバター"} />
                        <span className='tool-text'>変える</span>
                      </div>
                      :
                      <span className='icon-img' onClick={upLoadAvatarInput}>
                        <Icon icon={image} />
                      </span>
                    }
                  </div>
                </div>
                <div className=' form-col col'>
                  <div className='form-input'>
                    <div className='form-title'>
                      名前
                    </div>
                    <input type='text' className='txt-input' placeholder='メールを入力してください' />
                  </div>
                  <div className='row'>
                    <div className='w-200'>
                      <div className='form-input col'>
                        <div className='form-title'>
                          性別 <span>*</span>
                        </div>
                        <div className='form-radio'>
                          <input type='radio' id='man' name='sex' value='man' defaultChecked />
                          <label htmlFor='man'>男性</label>
                          <input type='radio' id='womman' name='sex' value='womman' />
                          <label htmlFor='womman'>女性</label>
                        </div>
                      </div>
                    </div>
                    <div className='form-input col'>
                      <div className='form-title'>
                        生年月日
                      </div>

                      <DatePicker
                        className='txt-input'
                        placeholder='11/12/2023'
                        format={"DD/MM/YYYY"}
                        onChange={(value, dateString) => {
                          setBirthDay(dateString)
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='pdt-10 row'>
                <div className=' form-col col'>
                  <div className='row'>
                    <div className='w-80 mgr-30'>
                      <div className='form-input'>
                        <div className='form-title'>
                          JLPT
                        </div>
                        <select className='txt-input' defaultValue={'N2'} required>
                          <option value='N1'>N1</option>
                          <option value='N2'>N2</option>
                          <option value='N3'>N3</option>
                          <option value='N4'>N4</option>
                          <option value='N5'>N5</option>
                        </select>
                      </div>
                    </div>
                    <div className='form-input'>
                      <div className='form-title'>
                        ホームタウン
                      </div>
                      <input type='text' className='txt-input' placeholder='ベトナム、ハイフォン市' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='form-col col'>
                  <div className='form-input'>

                    <div className='form-title'>
                      証明書のイメージ <span>*</span>
                    </div>
                    <input type="file" className='jlpt-input' onChange={handleUpLoadJLPTImg} hidden />
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

                  </div>
                </div>
              </div>
            </div>
            <div className="btn">
              <div className="space-between">
                <button type='button' onClick={handle} className='btn-add'>保存する</button>
                <button type='button' onClick={closePopup} className='btn-cancel' >キャンセル</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : ""
}

export default Staff_Popup