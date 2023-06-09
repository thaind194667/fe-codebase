import React from 'react'
import { useState, useEffect } from 'react';
import "./Service_.scss"
import { Icon } from 'react-icons-kit'
import { image } from 'react-icons-kit/fa/image'
import { close } from 'react-icons-kit/fa/close'

function Service({ confirmPopup, closePopup, data, index }) {

    const defaultPriceDuration = {
        duration: 60,
        // price: 0,
    }

    const [serviceImg, setImg] = useState(data ? data.serviceImg : '');
    const [serviceName, setName] = useState(data ? data.serviceName : '');
    const [serviceDescription, setDescription] = useState(data ? data.serviceDescription : '');
    const [priceList, setPriceList] = useState(data ? data.priceList : [defaultPriceDuration]);

    //validation
    const defaultErrorState = {
        name: '',
        desc: '',
        imgUrl: '',
        price: ''
    }
    const [validateData, setValidateData] = useState({
        name: serviceName,
        desc: serviceDescription,
        imgUrl: serviceImg,
        price: data ? data.priceList.price : 0
    })

    const [error, setError] = useState(defaultErrorState);

    useEffect(() => {
        setError((prev) => ({ ...prev, name: false, }))
    }, [serviceName])

    useEffect(() => {
        setError((prev) => ({ ...prev, desc: false, }))
    }, [serviceDescription])

    useEffect(() => {
        setError((prev) => ({ ...prev, imgUrl: false, }))
    }, [serviceImg.url])

    useEffect(() => {
        setError((prev) => ({ ...prev, price: false, }))
    }, [priceList.price])

    const setValidateValue = (value, field) => {
        setValidateData((prev) => ({
            ...prev,
            [field]: value,
        })
        );
        setError((prev) => ({ ...prev, [field]: false, }));
    }

    const checkValidation = () => {
        let errorCount = 0;
        setError(defaultErrorState);
        for (const key in validateData) {
            if (!validateData[key]) {
                setError((prev) => ({ ...prev, [key]: 'このフィールドは必須です！' }));
                console.log(key);
                errorCount++;
            }
        }
        if (errorCount == 0) {
            sendData();
        }
    }
    ////////



    const handleUpLoadImg = (e) => {
        const file = e.target.files[0];
        file.url = (URL.createObjectURL(file));
        setImg(file);
    }

    const changeDuration = (index, value) => {
        let arr = [...priceList];
        arr[index].duration = value;
        setPriceList(arr);
    }

    const changePrice = (index, value) => {
        let arr = [...priceList];
        arr[index].price = value;
        setPriceList(arr);
    }

    useEffect(() => {
        console.log(serviceImg);
    }, [serviceImg])

    const upLoadImage = () => {
        document.querySelector(".Img-input").click()
    }

    const addMoreTime = () => {
        let arr = [...priceList];
        arr.push(defaultPriceDuration);
        setPriceList(arr);
    }

    const deleteTime = (index) => {
        let arr = [...priceList];
        arr.splice(index, 1);
        setPriceList(arr);
    }

    const sendData = () => {
        let data = {
            serviceImg,
            serviceName,
            serviceDescription,
            priceList,
        }
        confirmPopup(data, index)
    }

    return (
        <div className='Service-popup-overlay'>
            <div className='service-popup'>
                <div className='service-popup-content'>
                    <span className="ti-close" onClick={closePopup}>
                        <Icon icon={close} size={18} />
                    </span>
                    <div className="service-popup-title">
                        サービスの追加
                    </div>
                    <div className='service-popup-form'>
                        <div className='row'>
                            <div className='col form-col' style={{ flex: '1' }}>
                                <div className='col-title'>
                                    名前<span>*</span>
                                    {error.name ?
                                        <span className='error'>{error.name}</span> :
                                        <></>
                                    }
                                </div>
                                <input type='text' value={serviceName}
                                    className='Input-text'
                                    placeholder='名前を入力してください'
                                    onChange={(e) => {
                                        setName(e.target.value)
                                        setValidateValue(e.target.value, 'name')
                                    }}
                                />

                                <div className='col-title'>
                                    説明<span>*</span>
                                    {error.desc ?
                                        <span className='error'>{error.desc}</span> :
                                        <></>
                                    }
                                </div>
                                <textarea value={serviceDescription}
                                    type='text'
                                    className=' Input-text big-input'
                                    placeholder='説明を入力してください'
                                    style={{ minHeight: '274px' }}
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                        setValidateValue(e.target.value, 'desc')
                                    }}
                                />

                            </div>
                            <div className='col form-col' style={{ flex: '1' }}>
                                <div className='col-title'>
                                    イメージ<span>*</span>
                                    {error.imgUrl ?
                                        <span className='error'>{error.imgUrl}</span> :
                                        <></>
                                    }
                                    <input
                                        type="file" className='Img-input'
                                        onChange={(e) => {
                                            handleUpLoadImg(e)
                                            setValidateValue(e.target.value, 'imgUrl')
                                        }} hidden />
                                </div>

                                <div className='img-input center-item'>
                                    {serviceImg ?
                                        <div className='img-upload'>
                                            <img src={serviceImg.url} onClick={upLoadImage} alt={"アバター"} />
                                            <span className='tool-text'>変える</span>
                                        </div>
                                        :
                                        <span className='icon-img' onClick={upLoadImage}>
                                            <Icon icon={image} />
                                        </span>
                                    }
                                </div>
                                <div className='col-title'>
                                    価格<span>*</span>
                                    {error.price ?
                                        <span className='error'>{error.price}</span> :
                                        <></>
                                    }
                                </div>
                                <div className='time-money-list col'>
                                    {
                                        priceList.map((item, index) => {
                                            return (
                                                <div className={`time-money-item row row${index}`} key={`servicenumber${index}`}>
                                                    <select className='time-select' defaultValue={60}
                                                        value={item.duration}
                                                        onChange={(e) => changeDuration(index, e.target.value)}
                                                        required>
                                                        <option value={60}>60分</option>
                                                        <option value={90}>90分</option>
                                                        <option value={120}>120分</option>
                                                    </select>
                                                    <div className='row' style={{ alignItems: 'center', gap: '2px' }}>
                                                        <input
                                                            type='number' className='Input-text' placeholder='130000'
                                                            value={item.price}
                                                            onChange={(e) => {
                                                                changePrice(index, e.target.value)
                                                                setValidateValue(e.target.value, 'price')
                                                            }}
                                                        />VND
                                                    </div>
                                                    {priceList.length === 1 && index === 0 ? <></> :
                                                        <button
                                                            type='button'
                                                            className=' black btn-delete-time' onClick={() => deleteTime(index)}>-</button>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {
                                    priceList.length < 3 ?
                                        <button type='button' className=' black btn-more-time' onClick={addMoreTime}>+</button> : <></>
                                }
                            </div>
                        </div>
                        <div className="btn">
                            <div className="space-between">
                                <button type='button' onClick={() => {
                                    checkValidation();
                                }} className='green btn-add'>保存する</button>
                                <button type='button' onClick={closePopup} className='red btn-cancel' >キャンセル</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service