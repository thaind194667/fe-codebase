import { useState } from "react"


export default function InputField({
    element ,
    type, 
    width ,
    height,
    // validation,
    setValue,
    value,
    error,
}) {

    // const [val, setVal] = useState(value ? value : '');
    // const [error, setError] = useState('');

    return (
        <div className="input-field-component col" style={{width, height,}}>
            {
                !element ?  (
                    <>
                        <textarea
                            name="description"
                            id="shop-info-description"
                            placeholder='説明を入力してください'
                            onKeyUp={setTextareaHeight}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        >

                        </textarea>
                        {
                        error ? <span className='error'>
                                {error}
                            </span> :  <></>
                        }
                    </>
                ) : (
                    <>
                        <input type={type && 'text'}
                            placeholder='イーメールを入力してください'
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        {
                        error? <span className='error'>
                                {error}
                            </span> : <></>
                        }
                    </>
                )
            }
        </div>
    )
}