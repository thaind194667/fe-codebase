import { useState } from 'react'
import './Checkbox.scss'
import SvgIcon from './SvgIcon'

export default function Checkbox(props) {

    const [value, setValue] = useState(props.value)

    const changeValue = () => {
        let i = value;
        i++;
        if(i > 1) i = -1;
        setValue(i);
    }
    return (
        <>
            <div className="checkbox" style={{width: props.length, height: props.length}} onClick={changeValue}>
                <div className="inside"> 
                    {!value? '' : 
                        value === 1 ? 
                            <SvgIcon name='check' length={props.length}/> : 
                            <SvgIcon name='not-include' length={props.length}/>
                    }
                </div>
            </div>
        </>
    )
}