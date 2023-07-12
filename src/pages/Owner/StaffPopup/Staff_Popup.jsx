import React from 'react'
import { useState, useEffect } from 'react';
import "./staffpopup.scss"
import { DatePicker } from 'antd';
import { Icon } from 'react-icons-kit'
import { image } from 'react-icons-kit/fa/image'
import { close } from 'react-icons-kit/fa/close'
import dayjs from 'dayjs'

const Staff_Popup = ({ confirmPopup, closePopup, data, index, type = "new" }) => {

  console.log(data);

  const DefaultStaffSex = '1'
  const DefaulJLPT = 2

  const [staffName, setStaffName] = useState(data ? data.name : '')
  const [staffSex, setStaffSex] = useState(data ? data.gender.toString() : DefaultStaffSex)
  const [birthday, setBirthDay] = useState(data ? data.DOB : '')
  const [jlpt, setJlpt] = useState(data ? data.jlpt : DefaulJLPT)
  const [hometown, setHometown] = useState(data ? data.hometown : '')
  const [avatar, setAvatar] = useState(data ? data.image : '')
  const [jlptImage, setJlptImage] = useState(data ? data.certificateImage : '')

  //validation
  const defaultErrorState = {
    name: '',
    dob: '',
    avatar_img: '',
    home_town: '',
    jlpt_img: '',
  }
  const [validateData, setValidateData] = useState({
    // name: data ? data.name : '',
    // dob: data ? data.DOB : '',
    // avatar_img: data ? data.image :'',
    // home_town: data ? data.hometown : '',
    // jlpt_img: data ? data.certificateImage : '',
    name: staffName,
    dob: birthday,
    home_town: hometown,
    avatar_img: avatar,
    jlpt_img: jlptImage,
  })

  const [error, setError] = useState(defaultErrorState);

  const setValidateValue = (value, field) => {
    setValidateData((prev) => ({
      ...prev,
      [field]: value,
    })
    );
    setError((prev) => ({ ...prev, [field]: false, }));
  }

  useEffect(() => {
    setError((prev) => ({ ...prev, name: false, }))
  }, [staffName])

  useEffect(() => {
    setError((prev) => ({ ...prev, dob: false, }))
  }, [birthday])

  useEffect(() => {
    setError((prev) => ({ ...prev, avatar_img: false, }))
  }, [avatar])

  useEffect(() => {
    setError((prev) => ({ ...prev, home_town: false, }))
  }, [hometown])

  useEffect(() => {
    setError((prev) => ({ ...prev, jlpt_img: false, }))
  }, [jlptImage])

  const checkValidation = () => {
    let errorCount = 0;
    setError(defaultErrorState);
    for (const key in validateData) {
      if (!validateData[key]) {
        setError((prev) => ({ ...prev, [key]: 'このフィールドは必須です！' }));
        errorCount++;
      }
    }
    if (errorCount == 0) {
      handleSubmit();
    }
  }

  ///

  const handleUpLoadImg = (e) => {
    const file = e.target.files[0];
    file.url = (URL.createObjectURL(file));
    setAvatar(file);
    setValidateValue(file, 'avatar_img');
  }

  const handleUpLoadJLPTImg = (e) => {
    const file = e.target.files[0];
    file.url = (URL.createObjectURL(file));
    setJlptImage(file);
    setValidateValue(file, 'jlpt_img');
  }

  const upLoadAvatarInput = () => {
    document.querySelector(".avatar-input").click()

  }

  const upLoadJlptImageInput = () => {
    document.querySelector(".jlpt-input").click()
  }

  const handleSubmit = () => {
    const staffInfor = {
      name: staffName,
      DOB: birthday,
      gender: staffSex,
      jlpt: jlpt,
      hometown: hometown,
      image: avatar,
      certificateImage: jlptImage
    }
    setAvatar()
    setJlptImage()
    confirmPopup(staffInfor, index);
  }

  return (

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
                      <img src={type === "new" ? `${avatar.url}` : avatar} onClick={upLoadAvatarInput} alt={"アバター"} />
                      <span className='tool-text'>変える</span>
                    </div>
                    :
                    <span className='icon-img' onClick={upLoadAvatarInput}>
                      <Icon icon={image} />
                    </span>
                  }
                </div>
                {error.avatar_img ?
                  <span className='error'>{error.avatar_img}</span> :
                  <></>
                }
              </div>
              <div className=' form-col col'>
                <div className='form-input'>
                  <div className='form-title'>
                    名前 <span>*</span>
                    {error.name ?
                      <span className='error'>{error.name}</span> :
                      <></>
                    }
                  </div>
                  <input type='text' id='staff_name' className='txt-input' value={staffName}
                    placeholder='氏名を入力してください'
                    onChange={(e) => {
                      setStaffName(e.target.value)
                      setValidateValue(e.target.value, 'name')
                    }} />
                </div>
                <div className='row'>
                  <div className='w-200'>
                    <div className='form-input col'>
                      <div className='form-title'>
                        性別 <span>*</span>
                      </div>
                      <div className='form-radio'>
                        {/* {console.log(data.gender)} */}
                        <input type='radio' id='man' name='sex'
                          // value={ data ? data.gender : 1} 
                          value={1}
                          checked={staffSex === '1'}
                          onChange={(e) => setStaffSex(e.target.value)}
                        />
                        <label htmlFor='man'>男性</label>
                        <input type='radio' id='womman' name='sex'
                          // value={ data ? !data.gender : 0} 
                          value={0}
                          checked={staffSex === '0'}
                          onChange={(e) => setStaffSex(e.target.value)} />
                        <label htmlFor='womman'>女性</label>
                      </div>
                    </div>
                  </div>
                  <div className='form-input col'>
                    <div className='form-title'>
                      生年月日 <span>*</span>
                      {error.dob ?
                        <span className='error'>{error.dob}</span> :
                        <></>
                      }
                    </div>

                    <DatePicker
                      className='txt-input'
                      placeholder='11/12/2023'
                      format={"DD/MM/YYYY"}
                      value={birthday ? dayjs(birthday, 'DD/MM/YYYY') : ''}
                      // value={data ? data.DOB : ''}
                      onChange={(value, dateString) => {
                        setBirthDay(dateString)
                        setValidateValue(dateString, 'dob')
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
                        JLPT <span>*</span>
                      </div>
                      <select className='txt-input' value={jlpt} onChange={(e) => setJlpt(e.target.value)} required>
                        <option value={1}>N1</option>
                        <option value={2}>N2</option>
                        <option value={3}>N3</option>
                        <option value={4}>N4</option>
                        <option value={5}>N5</option>
                      </select>
                    </div>
                  </div>
                  <div className='form-input'>
                    <div className='form-title'>
                      ホームタウン <span>*</span>
                      {error.home_town ?
                        <span className='error'>{error.home_town}</span> :
                        <></>
                      }
                    </div>
                    <input type='text' id='input-hometown' className='txt-input'
                      value={hometown}
                      placeholder='ベトナム、ハイフォン市' onChange={(e) => {
                        (setHometown(e.target.value))
                        setValidateValue(e.target.value, 'home_town')
                      }
                      } />
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='form-col col'>
                <div className='form-input'>

                  <div className='form-title'>
                    証明書のイメージ <span>*</span>
                    {error.jlpt_img ?
                      <span className='error'>{error.jlpt_img}</span> :
                      <></>
                    }
                  </div>
                  <input type="file" className='jlpt-input' onChange={handleUpLoadJLPTImg} hidden />
                  <div className='img-input center-item'>
                    {jlptImage ?
                      <div className='img-upload'>
                        <img src={type === "new" ? jlptImage.url : jlptImage} onClick={upLoadJlptImageInput} alt={"アバター"} />
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
          {
          type !== "show"? 
            <div className="btn">
              <div className="space-between">
                <button type='button' onClick={checkValidation} className='green btn-add'>保存する</button>
                <button type='button' onClick={closePopup} className='red btn-cancel' >キャンセル</button>
              </div>
            </div>
            : <></>
          }
          
        </div>
      </div>
    </div>

  )
}

export default Staff_Popup