import { useState } from 'react'
import './Checkbox.scss'
import SvgIcon from './SvgIcon'

export default function Checkbox( {valueIn, length, setVal, name}) {

    const [value, setValue] = useState(valueIn)

    const changeValue = () => {
        let i = value;
        i++;
        if(i > 1) i = 0;
        setValue(i);
        setVal(name, i);
    }
    return (
        <>
            <div className="checkbox" style={{width: `${length}px`, height: `${length}px`}} onClick={changeValue}>
                <div className={`inside ${value ? 'checked' : ''}`} > 
                    {!value? '' : 
                            <SvgIcon name='check' width={`${length}px`} height={`${length}px`}/>
                            // <SvgIcon name='not-include' width={length} height={length}/>
                    }
                </div>
            </div>
        </>
    )
}