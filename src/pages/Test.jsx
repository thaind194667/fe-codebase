import axios from "axios";
import { useEffect, useState } from "react";

export default function Test() {

    const [msg, setMsg] = useState("")

    useEffect(() => {
        axios.get("/")
        .then((res) => {
            console.log(res);
            setMsg(res);
        })
        .catch(err => console.error(err))
    }, [])

    return (
        <>
            <div>
                {msg ? msg : "nothing yet"}
            </div>
        </>
    )

}