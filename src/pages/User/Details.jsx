import { useLocation, useNavigate, useParams } from "react-router-dom";
import './Details.scss'
import { parlorList, parlorServiceList, commentList } from "@/hooks/FakeData";
import { useState, useEffect } from "react";
import SvgIcon from "@/components/SvgIcon";
import DetailsService from "./DetailsService";
import Header from "@/layouts/Header";

export default function Details() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [parlorData, setparlorData] = useState({})
  const [pageData, setData] = useState({})

  const [imgList, setImgList] = useState([])

  const getDetails = async () => {
    setData(parlorList[id]);
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
    // console.log(parlorList);
    // console.log(id);
    fetchData()
  }, [])

  useEffect(() => {
    console.log(pageData);
  }, [pageData])

  return (
    <div className="page">
      <Header />

      <div className="page-nav row">
        <div className="nav-item cur-nav">詳細情報</div>
        <div className="nav-item">画像ギャラリー</div>
        <div className="nav-item">提供サービス</div>
        <div className="nav-item">お客様のレビュー</div>
      </div>

      <div className="page-body-details col">
        <div className="row">
          <div className="parlor-info">
            <div className="parlor-name">
              {pageData.name}
            </div>
            <div className="parlor-address row"> 
              <SvgIcon name="map_marker" />
              {pageData.address} 
            </div>
          </div>

          <div className="parlor-phone">
            <button className="phone-btn orange" > 電話する </button>
          </div>
          
        </div>
        <div className="parlor-images col">
          <div className="row ">
            <div className="col" style={{flex: '1', }}>
                <SvgIcon 
                  type={"png"} 
                  name={"pic"} 
                  alt="parlor image 1" 
                  className="img1" 
                  style={{flex: '1', }}/>
                
                <SvgIcon 
                  type={"png"} 
                  name={"pic"} 
                  alt="parlor image 2" 
                  className="img2" 
                  style={{flex: '1', }}/>
            </div>

            <div className="col" style={{flex: '2', }}>
              <SvgIcon type={"png"} 
                name={"pic"} alt="parlor image 3" 
                className="img3" />
            </div>
          </div>
          <div className="row" style={{gap: '10px', flex: '1'}}>
            <div style={{flex: '1'}}>
              <SvgIcon type={"png"} 
                name={"pic"} alt="parlor image 4"
                className="img4" />
            </div>
            <div style={{flex: '1'}}>
              <SvgIcon type={"png"} 
                name={"pic"} alt="parlor image 5"
                className="img5" />
            </div>
            <div style={{flex: '1'}}>
              <SvgIcon type={"png"} 
                name={"pic"} alt="parlor image 6"
                className="img6" />
            </div>
            <div style={{display: 'flex', flex: '1', backgroundImage: 'url("/pic.png")', backgroundSize: 'cover', backgroundPosition: 'center', }}>
              <div className="more-img">＋20写真</div>
              {/* <SvgIcon type={"png"} 
                name={"pic"} alt="parlor image 6"
                className="img6" /> */}
            </div>
          </div>
        </div>
        
        <div className="parlor-description">
          <div className="title">概要</div>
          <div className="description"> {pageData.introduce} </div>
          
        </div>
        <div className="parlor-services col">
          <div className="title"> 提供サービス  </div>
          <div className="service-list col">
            {
              parlorServiceList.map( 
                ( item, index 
                )=> <DetailsService 
                    key={`service${index}`} 
                    data={item} 
                    role="user" 
                  />
              )
            }
          </div>
        </div>

        <div className="parlor-reviews">
          
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
