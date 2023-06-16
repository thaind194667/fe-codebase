import './ShopRegister.scss'
import Header from '@/layouts/Header'
import SvgIcon from '@/components/SvgIcon'

export default function ShopRegister() {

    const setTextareaHeight = (e) => {
        const textarea = document.getElementById("shop-info-description");
        textarea.style.height = "176px";
        let scHeight = e.target.scrollHeight;
        if( scHeight > 300) 
            textarea.style.height = '300px';
        else 
            textarea.style.height = `${scHeight}px`;
    }


    return (
        <>
            <Header />
            <div className="page-body-shop-register col">
                <div className="body-title">
                    今日、あなたのマッサージ部屋をシステムに表示するために登録しましょう！
                </div>

                <div className="body-form col">
                    <div className="shop-info-form col">
                        <div className="row" style={{gap: '10px'}}>
                            <div className="col input-field">
                                <div className="form-title">
                                    名前 <span className='required-field'>*</span>
                                </div>
                                <div className="form-input">
                                    <input type="text" placeholder='名前を入力してください'/>
                                </div>
                            </div>

                            <div className="col input-field">
                                <div className="form-title">
                                    イーメール <span className='required-field'>*</span>
                                </div>
                                <div className="form-input">
                                    <input type="text" placeholder='イーメールを入力してください'/>
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{gap: '10px'}}>
                            <div className="col input-field">
                                <div className="form-title">
                                    アドレス <span className='required-field'>*</span>
                                </div>
                                <div className="form-input">
                                    <input type="text" placeholder='アドレスを入力してください'/>
                                </div>
                            </div>

                            <div className="col input-field">
                                <div className="form-title">
                                    電話番号 <span className='required-field'>*</span>
                                </div>
                                <div className="form-input">
                                    <input type="text" placeholder='電話番号を入力してください'/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col input-field">
                                <div className="form-title">
                                    説明 <span className='required-field'>*</span>
                                </div>
                                <div className="form-input">
                                    <textarea 
                                    name="description" 
                                    id="shop-info-description" 
                                    placeholder='説明を入力してください'
                                    onKeyUp={setTextareaHeight}
                                    >

                                    </textarea>
                                    {/* <input type="text" placeholder='説明を入力してください'/> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shop-gallery-form col">
                        <div className="form-title">
                            画像ギャラリー <span className='required-field'>*</span>
                        </div>

                        <div className="form-notice">
                            3枚の写真が選択されています
                        </div>

                        <div>
                            <button className='black form-btn row'>
                                <SvgIcon width='25px' height="25px" name="icon-plus" className="icon-plus"/>
                                <SvgIcon width='25px' height="25px" name="icon-plus-hover" className="icon-plus-hover"/>
                                <div style={{marginLeft: '36px'}}>追加</div>
                            </button>
                        </div>
                    </div>

                    <div className="shop-staff-form">
                        
                    </div>
                </div>
            </div>
        </>
    )
}