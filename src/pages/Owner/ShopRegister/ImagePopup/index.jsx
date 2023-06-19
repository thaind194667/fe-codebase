import { useEffect, useState } from 'react'
import './ImagePopup.scss'
import SvgIcon from '@/components/SvgIcon'

export default function ImagePopup({closePopup, confirmPopup, data}) {

    const [imgList, setImgList] = useState(data);
    const saveData = () => {
        confirmPopup(imgList)
    }

    const handleReUploadImg = (e, index) => {
        const file = e.target.files[0];
        // file.url = (URL.createObjectURL(file));
        const arr = [...imgList];
        arr[index] = {
            image: file,
            url: (URL.createObjectURL(file)),
        }
        setImgList(arr);
    }

    const removeImg = (index) => {
        console.log("remove " + index);
        const arr = [...imgList];
        arr.splice(index, 1);
        setImgList(arr);
    }

    const reUploadImg = (index) => {
        console.log("reupload " + index);
        document.getElementById(`file-choose${index}`).click()
    }

    const uploadImg = () => {
        document.getElementById('file++').click()
    }

    const handleAddImg = (e) => {
        const arr = [...imgList];
        arr.pop();
        for(let i = 0; i < e.target.files.length; i++) {
            let file = e.target.files[i];
            // file.url = (URL.createObjectURL(file));
            arr.push ({
                image: file,
                url: (URL.createObjectURL(file)),
            })
        }
        arr.push('add');
        // arr[arr.length] = "add";
        console.log('arr', arr);
        setImgList(arr);
    }

    useEffect(() => {
        console.log('imgList', imgList);
    }, [imgList])


    return (
        <div className="iamge-popup-overlay" >
            <div className="popup-content col">
                <div className="popup-header row">
                    <div className="popup-title">
                        イメージの追加
                    </div>
                    <div onClick={closePopup} className="popup-close-btn">
                        <SvgIcon name={'close-btn'} width="20px" height="20px"/>
                    </div>
                </div>
                <div className="popup-main-content col" >
                    <div style={{fontSize: '20px'}}>画像を追加してストアを最も視覚的に説明します。</div>
                    <div className="img-list-choose col">
                    {
                        imgList.map((item, i) => {
                            if(i % 3 === 0)
                                return (
                                    <div className={`img-row row`} key={`row${i}`}>
                                    {
                                        [...Array(3)].map((count, j) => {
                                            let index = i + j;
                                            console.log(index);
                                            if(index >= imgList.length) return (
                                                <div className="img-item" style={{flex: '1'}}></div>
                                                
                                            )
                                            else if(imgList[index] !== 'add') 
                                            return (
                                                <div className="img-item" key={`item${index}`}>
                                                    <img className='image-item' src={imgList[index].url} alt={`image${index}`} />
                                                    {index === 0 ? <div className='main-img'>メイン画像</div> : <></>}
                                                    <input type="file" name={`img-file${index}`} id={`file-choose${index}`} hidden onChange={(e) => handleReUploadImg(e, index)}/>
                                                    <div className="img-handle-btn row">
                                                        <div onClick={() => reUploadImg(index)}>
                                                            <SvgIcon 
                                                                className="img-btn" name="edit-icon" 
                                                                width="35px" height="35px" round={true} backgroundColor="#DCDCDC" padding="8px"
                                                            />

                                                        </div>
                                                        <div onClick={() => removeImg(index)}>
                                                            <SvgIcon
                                                                className="img-btn" name="delete-icon" 
                                                                width="35px" height="35px" round={true} backgroundColor="#DCDCDC" padding="8px"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            else return (
                                                <div className={"img-item"} style={{flex: '1'}} >
                                                    <input type="file" name="new-file" id="file++" onChange={handleAddImg} multiple hidden/>
                                                    <div className="add-img row" onClick={uploadImg}>
                                                        <SvgIcon name="add-img" width="40px" height="40px" round={true} backgroundColor="gray" padding="10px"/>
                                                        {/* <SvgIcon name="gallery-add" type="png" width="40px" height="40px"/> */}

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                )
                        })
                    }
                    </div>
                </div>

                <div className="popup-btn row">
                    <button 
                        className="green popup-save-confirm"
                        onClick={saveData}
                    >
                        保存する
                    </button>
                    <div style={{flex: '1'}}></div>
                    <button 
                        className="red popup-cancel-confirm"
                        onClick={closePopup}
                    >
                        キャンセル
                    </button>
                </div>
            </div>
        </div>
    )
}