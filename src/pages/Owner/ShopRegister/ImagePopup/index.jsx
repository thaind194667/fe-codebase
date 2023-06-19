import { useEffect, useState } from 'react'
import './ImagePopup.scss'
import SvgIcon from '@/components/SvgIcon'
import { image } from 'react-icons-kit/fa/image'
import { Icon } from 'react-icons-kit'

export default function ImagePopup({closePopup, confirmPopup, data}) {

    const [imgList, setImgList] = useState(data);
    const saveData = () => {
        confirmPopup(imgList)
    }

    const addImg = (e) => {

    }

    const removeImg = (index) => {

    }

    const uploadImg = () => {
        document.getElementById('file--').click()
    }

    const handleUploadImg = (e) => {
        const file = e.target.files[0];
        file.url = (URL.createObjectURL(file));
        const arr = imgList;
        arr[arr.length - 1] = file;
        arr[arr.length] = "add";
        console.log(arr);
        setImgList(arr);
        // setJlptImage(file);
    }

    useEffect(() => {
        console.log(imgList);
    }, [imgList])


    return (
        <>
            <div className="iamge-popup-overlay" >
                <div className="popup-content col">
                    <div className="popup-header row">
                        <div className="popup-title">
                            イメージの追加
                        </div>
                        <div onClick={closePopup} className="popup-close-btn">
                            <SvgIcon name={'close-btn'}  />
                        </div>
                    </div>
                    <div className="popup-main-content col" >
                        <div>画像を追加してストアを最も視覚的に説明します。</div>
                        <div className="img-list-choose col">
                        {
                            imgList.map((item, i) => {
                                if(i % 3 === 0)
                                    return (
                                        <div className={`row${i} row`}>
                                        {
                                            [...Array(3)].map((count, j) => {
                                                let index = i + j;
                                                console.log(index);
                                                if(imgList[index] !== 'add')
                                                return (
                                                    <div className={"item"+j} style={{flex: '1'}}>
                                                        {imgList[index]}
                                                    </div>
                                                )
                                                else return (
                                                    <div className={"file-input"} style={{flex: '1'}} >
                                                        {/* {imgList[index]} */}
                                                        <input type="file" name="new-file" id="file--" hidden onChange={handleUploadImg}/>
                                                        <button className='black' onClick={uploadImg}>Upload</button>
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
        </>
    )
}