import "./Checkbox.scss";
import SvgIcon from "../SvgIcon";
import {  useState } from "react";

export default function CheckboxList({ item, setVal, index }) {

    const [check, setCheck] = useState(item.check);

    const changeValue = (index) => {
        setCheck(!check)
        setVal(index)
    }

    return (
        <div
            className="checkbox row"
            onClick={() => changeValue(index)}
        >
            <div
                className={`checkbox-inside ${item.check ? "checked" : ""}`}
            >
                {
                    item.check ? (
                        <SvgIcon name="check" width={`18px`} height={`18px`} />
                    ) : (
                        ""
                    )
                }
            </div>

            <div className="checkbox-value">{item.name} </div>
        </div>
    );
}
