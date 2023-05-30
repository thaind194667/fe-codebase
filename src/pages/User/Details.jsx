import { useLocation, useNavigate, useParams } from "react-router-dom";
import './Details.scss'
import { shopList } from "@/hooks/FakeData";
import { useState, useEffect } from "react";
import SvgIcon from "@/components/SvgIcon";



export default function Details() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [pageData, setData] = useState({})

  const [imgList, setImgList] = useState([])

  const getDetails = async () => {
    setData(shopList[id]);
  }
  
  const getImgList = async () => {
    let arr = []
    for(let i = 0 ; i < 5 ; i++) {
      arr.push('pic')
    }
  }

  const fetchData = async () => {
    await getDetails();
    getImgList();
  }

  useEffect(() => {
    // console.log(shopList);
    // console.log(id);
    fetchData()
  }, [])

  useEffect(() => {
    console.log(pageData);
  }, [pageData])

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title" onClick={() => navigate("/")}>Seishin massage</div>
        <div className="user-info">
          <div className="user-avatar">
          
          </div>
          <div className="user-name">Duc Anh</div>
        </div>
      </div>

      <div className="page-body-details">
        <div className="row">
          <div className="shop-info">
            <div className="shop-name">
              {pageData.name}
            </div>
            <div className="shop-address"> {pageData.address} </div>
          </div>

          <div className="shop-phone">
            <button className="phone-btn" > Denwa </button>
          </div>
          
        </div>
        <div className="row shop-images">
          <div className="col" style={{flex: '1', }}>
            <div className="row">
              <SvgIcon type={"png"} name={"pic"} alt="shop image 1" className="img1" />
              <SvgIcon type={"png"} name={"pic"} alt="shop image 2" className="img2" />
            </div>
            <div className="row">
              <SvgIcon type={"png"} name={"pic"} alt="shop image 3" className="img3" />
              <SvgIcon type={"png"} name={"pic"} alt="shop image 4" className="img4" />
            </div>
          </div>

          <div className="col" style={{flex: '1', }}>
            <SvgIcon type={"png"} name={"pic"} alt="shop image 5" className="img5" width={"100%"}/>
          </div>
        </div>
      </div>
    </div>
    // <div className="returnHome">
    //     <p>Details page here</p>
    //   <button onClick={() => navigate("/")}>Home</button>
    //   <button onClick={() => navigate("/search")}>Search</button>

    // </div>
  );
}
