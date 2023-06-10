import Header from "@/layouts/Header"

export default function HomePage() {

    const setRole = (role) => {
        localStorage.setItem('role', role);
        window.location.reload();
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
            
        </>
    )
}