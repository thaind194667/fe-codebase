import { useNavigate, useParams } from "react-router-dom";
import "./Detail.scss";
import { parlorList, parlorServiceList, commentList } from "@/hooks/FakeData";
import { useState, useEffect, useRef } from "react";
import SvgIcon from "@/components/SvgIcon";
import DetailService from "./DetailService";
import DetailReview from "./DetailReview";
import Header from "@/layouts/Header";
import axios from "axios";
import { apiURL, publicURL, scrollToSection, headersWithToken } from "@/hooks/hooks";
import StaffCard from "@/components/StaffCard";
import LoadingPage from "@/pages/Loading";
import { toast } from 'react-toastify'
import Pagination from "@/layouts/Pagination";
import Error from "@/pages/Error";

export default function Details() {

  let nowToast;
  const section1 = useRef(null);
  const section2 = useRef(null);
  const section3 = useRef(null);
  const section4 = useRef(null);

  const navigate = useNavigate();

  const { id } = useParams();

  const [parlorData, setparlorData] = useState({});
  const [pageData, setData] = useState("default");

  const [imgList, setImgList] = useState([]);

  const [curCommentPage, setCommentPage] = useState(1);
  const [commentCount, setCommentCount] = useState(0);

  const [serviceList, setServiceList] = useState([]);
  const [ratingList, setRatingList] = useState([]);

  const [error, setError] = useState("");

  const [userInfo, setUserInfo] = useState({
    userID: "",
    username: "default",
    avatar: "",
  });

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [userComment, setComment] = useState("")

  const toastWaiting = () => {
    nowToast = toast("Processing ....", {
        autoClose: false,
    });
  }

  const closeWaitToast = () => {
    toast.dismiss(nowToast);
  }

  const getDetails = () => {
    // ${
    //   localStorage.getItem("role") === 'admin' ? 
    //   // "massage-facilities"
    //   "admin" 
    //   : "massage-facilities"
    // }
    axios.get(`${apiURL}/massage-facilities/detail/${id}`, {
      headers: headersWithToken,
    })
    .then((res) => {
      console.log(res.data[0]);
      setData(res.data[0]);
      if(res.data[0])
        setCommentCount(res.data[0].review_count);
    });
    // setData(parlorList[id]);
  };

  const getUserData = () => {
    // axios.get();
    // const headers = {
    //   accept: "application/json",
    //   Authorization: "Bearer " + localStorage.getItem("accessToken"),
    // };

    //set token in axios header
    axios
      .get(`${apiURL}/user`, {
        headers: headersWithToken,
      })
      .then((res) => {
        setUserInfo({
          userID: res.data.userID,
          username: res.data.userName,
          avatar: res.data.userAvatar,
        });
        console.log(res);
      })
      .catch((err) => {});
  };

  const postNewComment = () => {
    if(!userComment) {
      setError("レビューが必須です！！");
      return;
    }
    console.log(rating, userComment, userInfo.userID, id);
    toastWaiting();
    const apiParam = {
      shopId: Number(id),
      userID: userInfo.userID,
      comment: userComment,
      rate: rating,
    }
    axios.post(`${apiURL}/ratings/store`, apiParam, {
      headers: headersWithToken
    })
    .then((res) => {
      closeWaitToast();
      if(res.data === "ok") {
        toast.success("新しいレビューの追加が成功しました");
        setComment("");
        setRating(5);
        changeCommentPage(1);
      } 
      console.log(res);
    })
  }

  useEffect(() => {
    // console.log(parlorList);
    // console.log(id);
    getDetails();
    getUserData();
  }, []);

  useEffect(() => {
    if(pageData) {
      setServiceList(pageData.serviceList);
      setRatingList(pageData.ratingList);
      console.log(pageData.staffList);
    }
  }, [pageData]);

  useEffect(() => {
    getComment();
  }, [curCommentPage])

  const changeCommentPage = (index) => {
    if(curCommentPage === index) getComment();
    else
      setCommentPage(index);
  }

  const getComment = () => {
    axios.get(`${apiURL}/ratings/index/${id}/${curCommentPage}`,{
      headers: headersWithToken,
    })
    .then((res) => {
      console.log(res.data.ratingList);
      setRatingList(res.data.ratingList);
      setCommentCount(res.data.review_count);
    })
    .catch(error => console.error(error))
  }

  return pageData === "default" ?
    <LoadingPage /> :
    pageData ?
   (
    <div className="page col">
      <Header />

      <div className="page-nav row">
        <div
          className="nav-item cur-nav"
          onClick={() => scrollToSection(section1)}
        >
          詳細情報
        </div>
        <div className="nav-item" onClick={() => scrollToSection(section2)}>
          画像ギャラリー
        </div>
        <div className="nav-item" onClick={() => scrollToSection(section3)}>
          提供サービス
        </div>
        <div className="nav-item" onClick={() => scrollToSection(section4)}>
          お客様のレビュー
        </div>
      </div>

      <div className="page-body-details col">
        <div className="row" ref={section1}>
          <div className="parlor-info col">
            <div className="parlor-name">{pageData.name}</div>
            <div className="parlor-address row">
              <SvgIcon name="map_marker" />
              {pageData.address}
            </div>
          </div>

          <div className="parlor-phone">
            <button className="phone-btn orange"> 電話する </button>
          </div>
        </div>
        {pageData.imgList ? (
          <div className="parlor-images col" ref={section2}>
            <div className="row ">
              <div className="col" style={{ flex: "1" }}>
                <SvgIcon
                  src={`${publicURL}${pageData.imgList[1]}`}
                  alt="parlor image 1"
                  className="parlor-img"
                  style={{ flex: "1" }}
                />

                <SvgIcon
                  src={`${publicURL}${pageData.imgList[2]}`}
                  alt="parlor image 2"
                  className="parlor-img"
                  style={{ flex: "1" }}
                />
              </div>

              <div className="col" style={{ flex: "2" }}>
                <SvgIcon
                  src={`${publicURL}${pageData.image_url}`}
                  alt="main img"
                  className="main-img"
                />
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
          </div>
        ) : (
          <></>
        )}

        <div className="parlor-description">
          <div className="title">概要</div>
          <div className="description"> {pageData.description} </div>
        </div>
        <div className="col">
          <div
            className="title"
            style={{ fontSize: "35px", fontWeight: "700" }}
          >
            スタッフ
          </div>
          <div className="parlor-staffs row">
            {pageData.staffList ? (
              pageData.staffList.map((item, index) => {
                return <StaffCard data={item} />;
              })
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="parlor-services col" ref={section3}>
          <div className="title"> 提供サービス </div>
          <div className="service-list col">
            {serviceList ? (
              serviceList.map((item, index) => (
                <DetailService
                  key={`service${index}`}
                  data={item}
                  role="user"
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="parlor-reviews col" ref={section4}>
          <div className="title"> ユーザーの評価 </div>
          {
            userInfo.userID ? 
            <div className="new-review col">
              <div className="user-info row">
                <div className="user-avatar">
                  <img
                    src={
                      userInfo.avatar
                        ? `${publicURL}${userInfo.avatar}`
                        : "/avatar-default.jpg"
                    }
                  ></img>
                </div>

                <div className="user-name row" style={{alignItems: 'center'}}>{userInfo.username}</div>
                <div className="user-rating row">
                  {
                    [...Array(5)].map((star, index) => {
                      // let status = "add";
                      index += 1;
                      return ( //status === "add" ? 
                        <button
                          type="button"
                          key={index}
                          className={index <= (hover || rating) ? "on" : "off"}
                          onClick={() => setRating(index)}
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                        >
                          {index <= (hover || rating) ? (
                            <SvgIcon
                              // onClick={rating}
                              className={`${status}star num${index}`}
                              key={"starnumber" + index}
                              name="comment-star"
                            />
                          ) : (
                            <SvgIcon
                              className={`${status}star num${index}`}
                              name="comment-star-disabled"
                              key={"starnumber" + index}
                            />
                          )}
                          {/* <span className="star">&#9733;</span> */}
                        </button>
                      ) 
                    })
                  }
                </div>
              </div>
              <div className="user-comment">
                <textarea
                  name="comment"
                  className={`comment-field`}
                  id={`comment`}
                  placeholder="ここにあなたの気持ちを説明してください"
                  value={userComment}
                  onInput={(e) => {
                    setComment(e.target.value)
                    setError("")
                  }}
                ></textarea>
                {error ? <span style={{color: "red"}}> {error} </span> : <></>}
                {/* <span>  </span> */}
              </div>

              <button className="submit-rating orange" onClick={postNewComment}>レビューを送る</button>
            </div> : <></>
          }
          {ratingList ? (
            <>
              <DetailReview data={ratingList} />
              <Pagination 
                maxItem={commentCount}
                itemPerPage={3}
                currentPage={curCommentPage}
                changePage={changeCommentPage}
              />
            </>
          ) : <></>}
        </div>
      </div>
    </div>
  ) : <Error />
}
