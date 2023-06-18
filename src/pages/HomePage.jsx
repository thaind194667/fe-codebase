import Header from "@/layouts/Header"
import axios from 'axios'
import {apiURL} from '@/hooks/hooks'

export default function HomePage() {

    const setRole = (role) => {
        localStorage.setItem('role', role);
        window.location.reload();
    }

    const handleSendImg = () => {
        const fileList = document.getElementById('files').files;
        const apiParams = {
            name: 'abc',
            fileList,
        }
        console.log(apiParams);

        axios.post(`${apiURL}/massage-facilities/store`, apiParams, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            // handle the response
            console.log(response);
        })
        .catch((err) => console.error(err));
    }

    return (
        <>
            <Header />
            <style>
            {`
                .home-btn {
                    align-self: center;
                    width: 60%;
                    margin: 20px;
                    font-size: 28px;
                    border-radius: 20px;
                }
            `}
            </style>
            <div className="col homepage">
                {
                    localStorage.getItem('role') !== 'user' ? 
                    <button className="black home-btn" onClick={() => setRole('user')}> Click to become user </button>  : <></>
                }
                {
                    localStorage.getItem('role') !== 'owner' ? 
                    <button className="black home-btn" onClick={() => setRole('owner')}> Click to become owner </button>  : <></>
                }
                {
                    localStorage.getItem('role') !== 'admin' ? 
                    <button className="black home-btn" onClick={() => setRole('admin')}> Click to become admin </button>  : <></>
                }
            </div>

            <input type="file" name="file" id="files" multiple/>

            <button className="black" onClick={handleSendImg}>Send</button>
            
        </>
    )
}