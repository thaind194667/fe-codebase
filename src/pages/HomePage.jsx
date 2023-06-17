import Header from "@/layouts/Header"
import axios from 'axios'
import {apiURL} from '@/hooks/hooks'

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export default function HomePage() {

    const setRole = (role) => {
        localStorage.setItem('role', role);
        window.location.reload();
    }

    const handleSendImg = () => {
        const fileList = document.getElementById('files').files;
        const apiParams = new FormData();
        apiParams.append('name', 'abc');
        apiParams.append('fileList', fileList);
        // {
        //     name: 'abc', 
        //     fileList : document.getElementById('files').files
        // };

        console.log(fileList);
        axios.post(`${apiURL}/massage-facilities/store`, apiParams,
            {
                headers: {
                "content-type": "multipart/form-data",
                },
            }
        )
        .then((res) => {
            console.log(res);
        })
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

            <button onClick={handleSendImg}>Send</button>
            
        </>
    )
}