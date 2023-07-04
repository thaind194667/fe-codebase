import { useEffect, useState } from 'react'
import './ImagePopup.scss'
import SvgIcon from '@/components/SvgIcon'
import { Icon } from 'react-icons-kit'
import { close } from 'react-icons-kit/fa/close'

let sendList = new DataTransfer();

export default function ImagePopup({closePopup, confirmPopup, data}) {

    const [imgList, setImgList] = useState(data);
    const saveData = () => {
        // let arr = new DataTransfer();
        // imgList.files;
        // for(let i = 0; i < arr.length; i++) {
        //     arr.push(arr[i]);
        //     console.log(arr[i]);
        // }
        // console.log(arr);
        confirmPopup(imgList)
    }

    const handleReUploadImg = (e, index) => {
        const newFile = e.target.files[0];
        const newUrl = (URL.createObjectURL(newFile));

        let fileArr = new DataTransfer();   /// use to copy imgList.files
        let urlArr = [...imgList.url];      /// copy imgList.url 
        // urlArr.pop();
        for(let i = 0 ; i < imgList.files.length; i++) { /// copy imgList.files
            if(i === index) {
                fileArr.items.add(newFile);
                urlArr[index] = newUrl;
            }
            else 
                fileArr.items.add(imgList.files[i]);
        }
        console.log('arr', fileArr, urlArr);
        setImgList({
            files : fileArr.files,
            url: urlArr,
        });
    }

    const removeImg = (index) => {
        console.log("remove " + index);

        let fileArr = new DataTransfer();   /// use to copy imgList.files
        let urlArr = [...imgList.url];      /// copy imgList.url 
        urlArr.splice(index, 1);
        // urlArr.pop();
        for(let i = 0 ; i < imgList.files.length; i++) { /// copy imgList.files
            if(i === index) 
                continue;
            else 
                fileArr.items.add(imgList.files[i]);
        }
        setImgList({
            files : fileArr.files,
            url: urlArr,
        });
    }

    const reUploadImg = (index) => {
        console.log("reupload " + index);
        document.getElementById(`file-choose${index}`).click()
    }

    const uploadImg = () => {
        document.getElementById('file++').click()
    }

    const handleAddImg = (e) => {
        let fileArr = new DataTransfer();   /// use to copy imgList.files
        let urlArr = [...imgList.url];      /// copy imgList.url 
        urlArr.pop();
        for(let i = 0 ; i < imgList.files.length; i++) { /// copy imgList.files
            fileArr.items.add(imgList.files[i]);
        }
        for(let i = 0; i < e.target.files.length; i++) {
            let file = e.target.files[i];
            fileArr.items.add(file);
            urlArr.push(URL.createObjectURL(file));
        }
        urlArr.push('add');
        console.log('arr', fileArr, urlArr);
        setImgList({
            files : fileArr.files,
            url: urlArr,
        });
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
                    <span className="popup-close-btn" onClick={closePopup}>
                        <Icon icon={close} size={18} />
                    </span>
                    {/* <div onClick={closePopup} className="popup-close-btn">
                        <SvgIcon name={'close-btn'} width="20px" height="20px"/>
                    </div> */}
                </div>
                <div className="popup-main-content col" >
                    <div style={{fontSize: '20px'}}>画像を追加してストアを最も視覚的に説明します。</div>
                    <div className="img-list-choose col">
                    {
                        imgList.url.map((item, i) => {
                            if(i % 3 === 0)
                                return (
                                    <div className={`img-row row`} key={`row${i}`}>
                                    {
                                        [...Array(3)].map((count, j) => {
                                            let index = i + j;
                                            if(index >= imgList.url.length) return (
                                                <div className="img-item" style={{flex: '1'}} key={`item${index}`}></div>
                                            )
                                            else if(imgList.url[index] !== 'add') 
                                            return (
                                                <div className="img-item" key={`item${index}`}>
                                                    <img className='image-item' src={imgList.url[index]} alt={`image${index}`} />
                                                    {index === 0 ? <div className='main-img'>メイン画像</div> : <></>}
                                                    <input type="file" name={`img-file${index}`} id={`file-choose${index}`} hidden onChange={(e) => handleReUploadImg(e, index)}/>
                                                    <div className="img-handle-btn row">
                                                        <div onClick={() => reUploadImg(index)}>
                                                            <SvgIcon 
                                                                className="img-btn" name="edit-icon" 
                                                                width="35px" height="35px" round={true} 
                                                                backgroundColor="#DCDCDC" padding="8px"
                                                            />

                                                        </div>
                                                        <div onClick={() => removeImg(index)}>
                                                            <SvgIcon
                                                                className="img-btn" name="delete-icon" 
                                                                width="35px" height="35px" round={true} 
                                                                backgroundColor="#DCDCDC" padding="8px"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            else return (
                                                <div className={"img-item"} style={{flex: '1'}} key={`item${index}`}>
                                                    <input type="file" name="new-file" id="file++" onChange={handleAddImg} multiple hidden/>
                                                    <div className="add-img row" onClick={uploadImg}>
                                                        <SvgIcon name="add-img" width="40px" height="40px" round={true} backgroundColor="gray" padding="10px"/>
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