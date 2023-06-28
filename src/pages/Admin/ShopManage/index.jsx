import "./ShopManage.scss"
import Header from "@/layouts/Header"
import Sidebar from "@/layouts/Sidebar"

export default function ShopManage() {

    return (
        <>
            <Header />
            <div className="shop-manage-page row">
                <Sidebar />
                <div className="shop-manage-content">
                    
                </div>

            </div>
        </>
    )
}