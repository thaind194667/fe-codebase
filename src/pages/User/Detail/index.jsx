import { useNavigate, useParams } from "react-router-dom";
import './Detail.scss'
import { parlorList, parlorServiceList, commentList } from "@/hooks/FakeData";
import { useState, useEffect, useRef } from "react";
import SvgIcon from "@/components/SvgIcon";
import DetailService from "./DetailService";
import DetailReview from "./DetailReview";
import Header from "@/layouts/Header";
import axios from "axios";
import {apiURL, publicURL, scrollToSection} from "@/hooks/hooks";
import StaffCard from "@/components/StaffCard";

export default function Details() {

  const section1 = useRef(null)
  const section2 = useRef(null)
  const section3 = useRef(null)
  const section4 = useRef(null)
  
  const navigate = useNavigate();

  const { id } = useParams();

  const [parlorData, setparlorData] = useState({})
  const [pageData, setData] = useState({})

  const [imgList, setImgList] = useState([])

  const [serviceList, setServiceList] = useState([])
  const [ratingList, setRatingList] = useState([])

  const getDetails = async () => {
    axios.get(`${apiURL}/massage-facilities/detail/${id}`)
    .then((res) => {
      console.log(res.data[0]);
      setData(res.data[0])
    })
    // setData(parlorList[id]);
  }
  
  // const getImgList = async () => {
  //   let arr = []
  //   for(let i = 0 ; i < 5 ; i++) {
  //     arr.push('pic')
  //   }
  // }

  // const fetchData = async () => {
  //   await getDetails();
  //   // getImgList();
  // }

  useEffect(() => {
    // console.log(parlorList);
    // console.log(id);
    getDetails()
  }, [])

  useEffect(() => {
    // console.log(pageData);
    setServiceList(pageData.serviceList);
    setRatingList(pageData.ratingList);
    console.log(pageData.staffList);
  }, [pageData])

  return (
    pageData ? 
    <div className="page col">
      <Header />

      <div className="page-nav row">
        <div className="nav-item cur-nav" onClick={() => scrollToSection(section1)}>詳細情報</div>
        <div className="nav-item" onClick={() => scrollToSection(section2)}>画像ギャラリー</div>
        <div className="nav-item" onClick={() => scrollToSection(section3)}>提供サービス</div>
        <div className="nav-item" onClick={() => scrollToSection(section4)}>お客様のレビュー</div>
      </div>

      <div className="page-body-details col">
        <div className="row" ref={section1}>
          <div className="parlor-info col">
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
        {
          pageData.imgList ? 
        <div className="parlor-images col" ref={section2}>
          <div className="row ">
            <div className="col" style={{flex: '1', }}>
                <SvgIcon 
                  src={`${publicURL}${pageData.imgList[1]}`}
                  alt="parlor image 1" 
                  className="parlor-img" 
                  style={{flex: '1', }}/>
                
                <SvgIcon 
                  src={`${publicURL}${pageData.imgList[2]}`}
                  alt="parlor image 2" 
                  className="parlor-img" 
                  style={{flex: '1', }}/>
            </div>

            <div className="col" style={{flex: '2', }}>
              <SvgIcon 
                src={`${publicURL}${pageData.image_url}`}
                alt="main img" 
                className="main-img" />
            </div>
          </div>
          {/* <div className="row" style={{gap: '10px', flex: '1'}}>
            <div style={{flex: '1'}}>
              {
                pageData.imgList[3] ?
                  <SvgIcon type={"png"} 
                  name={"pic"} alt="parlor image 4"
                  className="parlor-img" /> : <></>
              }
            </div>
            <div style={{flex: '1'}}>
              {
                pageData.imgList[4] ?
                  <SvgIcon type={"png"} 
                  name={"pic"} alt="parlor image 5"
                  className="parlor-img" /> : <></>
              }
              
            </div>
            <div style={{flex: '1'}}>
            {
              pageData.imgList[5] ?
                <SvgIcon type={"png"} 
                name={"pic"} alt="parlor image 5"
                className="parlor-img" /> : <></>
            }
            </div>
            <div className="more-img-container" style={ pageData.imgList[6] ? {
                  backgroundImage: `url(`+`${publicURL}${pageData.imgMain}`+`)`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center', 
              } : {}
              
              }>
              {
                pageData.imgList[6] ? 
                <div className="more-img">＋{pageData.imgList.length - 6}写真</div>
                : <></>
              }
            </div>
          </div> */}
        </div> : <></>

        }
        
        <div className="parlor-description">
          <div className="title">概要</div>
          <div className="description"> {pageData.description} </div>
        </div>
          
        <div className="parlor-staffs row" >
        { pageData.staffList ? 
          pageData.staffList.map((item, index) => {
            return (<StaffCard data={item}/>)
          }) : <></>
        }
        </div>
        <div className="parlor-services col" ref={section3}>
          <div className="title"> 提供サービス  </div>
          <div className="service-list col">
            {
              serviceList ? 
              serviceList.map( 
                ( item, index 
                )=> <DetailService 
                    key={`service${index}`} 
                    data={item} 
                    role="user" 
                  />
              ) :<></>
            }
          </div>
        </div>

        <div className="parlor-reviews col" ref={section4}>
          <div className="title"> ユーザーの評価  </div>
          {ratingList ? <DetailReview data={ratingList} /> : <></>}
          
        </div>
      </div>
    </div>
    :
    <div>Loading...</div>
    // <div className="returnHome">
    //     <p>Details page here</p>
    //   <button onClick={() => navigate("/")}>Home</button>
    //   <button onClick={() => navigate("/search")}>Search</button>

    // </div>
  );
}
