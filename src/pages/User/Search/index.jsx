import "./Search.scss";
import Checkbox from "@/components/Checkbox";
import SvgIcon from "@/components/SvgIcon";
import Pagination from "@/layouts/Pagination";
import ReactSlider from "react-slider";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/layouts/Header";
import { apiURL, publicURL, headersWithToken } from "@/hooks/hooks";
import axios from 'axios';
import LoadingPage from "@/pages/Loading";

const minRate = 0;
const maxRate = 50;

let minPrice = 0;
let maxPrice = Math.ceil(1000000 / 10000) * 10000;
const gap = 5000;

export default function Search() {
  
  const navigate = useNavigate();

  const [searchRes, setRes] = useState([]);
  const [showResList, setShowList] = useState([]);

  const [name, setName] = useState("");

  const [service, setService] = useState([]);
  const [checkCount, setCheckCount] = useState(0);
  const [serviceName, setServiceName] = useState("");
  const [searchServiceList, setSearchServiceList] = useState([]);

  const [rateVal, setRateVal] = useState([minRate, maxRate]);
  const [priceVal, setPrice] = useState([0, 0]);

  const maxPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // const [checkAll, setCheckAll] = useState(false);

  const [loading, setLoading] = useState(true);

  const postSearch = async () => {
    const apiParams = {
      minRate: rateVal[0] / 10, 
      maxRate: rateVal[1] / 10,
      minPrice: priceVal[0],
      maxPrice: priceVal[1],
    }
    let nameVal = document.getElementById("name/address").value;
    if(nameVal) apiParams.input = nameVal
    setName(nameVal);
    let arr  = [];
    for(let  i = 0; i < searchServiceList.length; i++) 
      if(searchServiceList[i].check) arr.push(searchServiceList[i].name);
    if(arr.length) apiParams.serviceList = arr;
    console.log(apiParams);

    // if(localStorage.getItem('role') === "admin") {
    //   axios.post(`${apiURL}/${localStorage.getItem("role") === 'admin' ? "admin" : "massage-facilities"}/filter`, apiParams, {
    //     headers: headersWithToken,
    //   })
    // }
    // else {
      // axios.post(`${apiURL}/massage-facilities/filter`, apiParams, {
    axios.post(
      `${apiURL}/${localStorage.getItem("role") === 'admin' ? "admin" : "massage-facilities"}/filter`, 
      apiParams, {
      headers: headersWithToken,
    })
    .then((result) => {
      console.log(result.data);
      setRes(result.data.result.sort((a,b)=>b.rating-a.rating));
      setCurrentPage(1);
    })
    .catch((err) => console.error(err))

    // }
  }

  const confirmSearch = () => {
    postSearch();
  };

  const clearNameInput = () => {
    document.getElementById("name/address").value = ''
  }

  const saveServiceName = (e) => {
    let val = e.target.value;
    setServiceName(val);
  };


  const getSearchResult = async () => {

    // if(localStorage.getItem('role') === "admin") {
    //   axios.post(`${apiURL}/admin/filter`, {}, {
    //     headers: headersWithToken,
    //   })
    //   .then((result) => {
    //     console.log(result.data);
    //     setRes(result.data.result);
    //     setCurrentPage(1);
    //     const serviceListArr = result.data.serviceList.map((item) => {
    //       return {
    //         name: item.serviceName,
    //         check: false,
    //       }
    //     })
    //     setService(serviceListArr);
    //     minPrice = 0;
    //     maxPrice = Math.ceil(result.data.maxPrice / 10000) * 10000;
    //     setPrice([minPrice, maxPrice]);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })
    // }
    // else 
    // {
    axios.get(
      `${apiURL}/${localStorage.getItem("role") === 'admin' ? "admin" : "massage-facilities"}`, {
      headers: headersWithToken,
    })
    .then((result) => {
      console.log(result.data);
      setRes(result.data.result.sort((a,b)=>b.rating-a.rating));
      setCurrentPage(1);
      let serviceListArr;
      // if(typeof result.data.serviceList === "array")
      serviceListArr = result.data.serviceList.map((item) => {
        return {
          name: item,
          check: false,
        }
      })
      // else if(typeof result.data.serviceList === "object")
      //   serviceListArr = Object.entries(result.data.serviceList).map(([key, item]) => {
      //     console.log(item);
      //     return {
      //       name: item.serviceName,
      //       check: false,
      //     }
      //   })
      setService(serviceListArr);
      minPrice = 0;
      maxPrice = Math.ceil(result.data.maxPrice / 10000) * 10000;
      console.log(maxPrice);
      setPrice([minPrice, maxPrice]);
    })
    .catch((error) => {
      console.error(error);
    })
    // }
  };

  const fetchData = async () => {
    await getSearchResult();
  };

  const saveService = (index) => {
    let i = service.findIndex((e) => e.name === searchServiceList[index].name);
    let data = [...service];
    data[i].check = !data[i].check;

    let newList = [...searchServiceList];
    setService(data);
  };

  const changePage = (index) => {
    setCurrentPage(index);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let arr = [];
    var minIndex = (currentPage - 1) * maxPerPage;
    var maxIndex = currentPage * maxPerPage;
    for (let i = minIndex; i < maxIndex; i++) {
      if (i === searchRes.length) break;
      arr.push(searchRes[i]);
    }
    setShowList(arr);
  }, [searchRes, currentPage]);
  
  useEffect(() => {
    if(searchRes.length) {
      setCurrentPage(1);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500)
    }
    console.log(searchRes);
  }, [searchRes]);

  useEffect(() => {
    console.log(priceVal);
  }, [priceVal])

  useEffect(() => {
    if (!serviceName) {
      setSearchServiceList(service);
      return;
    }
    let data = service.filter((e) => e.name.toLowerCase().includes(serviceName.toLowerCase()));
    setSearchServiceList(data);
  }, [serviceName, service]);

  useEffect(() => {
    setCheckCount(service.filter((e) => e.check).length);
  },[service])

  useEffect(() => {
    if(loading) {
      setTimeout(() => {
        document.getElementById("name/address").value = name;
      }, 500)
    }
  }, [loading])

  return (
    loading === true ? <LoadingPage /> :
    <>
      <Header />
      <div className="page-body-search">
        <div className="side-bar col">
          <div className="search-title row">
            <SvgIcon name={"droplet"} />
            <div>フィールダー</div>
          </div>
          <div className="search-bar col">
            <div className="name-search col">
              <div className="title">目的地・物件名</div>
              <div className="input-field row">
                <SvgIcon name="search" width={18} height={18} />
                <input
                  style={{ flex: 1 }}
                  type="text"
                  name="name/address"
                  id="name/address"
                  placeholder="ハノイ、ダナン"
                  // value={name}
                />
                <button className="clear-input-btn" onClick={clearNameInput}>クリア</button>
              </div>
            </div>
            <div className="service-search col">
              <div className="row">
                <div className="title">提供サービス</div>
                <div className="check-count">
                  {checkCount}アイテム選択される
                </div>
              </div>
              <div className=" col">
                <div
                  className="input-field row"
                  style={{ borderRadius: "5px 5px 0 0 ", zIndex: "1" }}
                >
                  <SvgIcon name="search" width={18} height={18} />
                  <input
                    style={{ flex: 1 }}
                    value={serviceName}
                    onInput={(e) => saveServiceName(e)}
                    type="text"
                    name="name/address"
                    id="name/address"
                    placeholder="サービスを検索"
                  />
                  <button className="clear-input-btn" onClick={() => setServiceName("")}>クリア</button>
                </div>
                <div className="checkbox-list col">
                  {searchServiceList.length
                    ? searchServiceList.map((item, index) => {
                        return (
                          <Checkbox
                            key={`checkboxItem${index}`}
                            item={item}
                            setVal={saveService}
                            index={index}
                            length={17}
                          />
                        );
                      })
                    : "Nothing yet"}
                </div>
              </div>
            </div>
            <div className="rate-search">
              <div className="title row">
                <div style={{ flex: 1 }}>評価</div>
                <div
                  className="row"
                  style={{ alignItems: "center", gap: "5px" }}
                >
                  {rateVal[0] === rateVal[1]
                    ? `${rateVal[0] / 10}`
                    : `${rateVal[0] / 10} - ${rateVal[1] / 10}`}
                  <SvgIcon name="search-star" />
                </div>
              </div>
              <div>
                {
                  priceVal ? 
                  <ReactSlider
                    size="big"
                    className="slider"
                    onChange={setRateVal}
                    value={rateVal}
                    min={minRate}
                    max={maxRate}
                    pearling={true}
                  />
                  : <></>
                }
              </div>
            </div>
            <div className="price-search">
              <div className="title row">
                <div style={{ flex: 1 }}>価格</div>
                <div
                  className="row"
                  style={{ alignItems: "center", gap: "5px" }}
                >
                  {priceVal[0] === priceVal[1]
                    ? `${priceVal[0]}`
                    : `${priceVal[0]} - ${priceVal[1]}`}
                  {` VND`}
                </div>
              </div>
              <div>
                <ReactSlider
                  className="slider"
                  onChange={setPrice}
                  value={priceVal}
                  min={minPrice.toFixed(1)}
                  max={maxPrice.toFixed(1)}
                  step={gap}
                  pearling={true}
                />
              </div>
            </div>
            <div className="button">
              <button id="search-btn" className="black" onClick={confirmSearch}>
                検索する
              </button>
            </div>
          </div>
        </div>

        <div className="main-content col">
          <div className="result-title">
            <b>
              {" "}
              {name ? `${name}：` : ""}
              {searchRes ? `${searchRes.length}マッサージ店が一致しました` : 'Nothing can be found'}
            </b>
          </div>

          <div className="result-list col">
            {showResList.length ? (
              showResList.map((item, index) => {
                return (
                  <div key={index} className="result-item row">
                    <div className="item-picture">
                      <SvgIcon width="100%" src={`${publicURL}${item.imageURL}`} />
                    </div>
                    <div className="item-information row">
                      <div className="col item-col1" style={{ gap: "12px", flex: "2" }}>
                        <div className="item-name">
                          <b>{item.name}</b>
                        </div>
                        <div className="item-address row">
                          <SvgIcon name="map_marker" />
                          {item.address}
                        </div>
                        <div className="item-introduce">{item.description}</div>
                      </div>
                      <div className="col" style={{ gap: "30px" }}>
                        <div className="item-rate col" style={{ gap: "10px" }}>
                          <div className="row" style={{ gap: "12px" }}>
                            <div className="item-review col">
                              <div className="review-text">
                                {item.rating > 4 ? (
                                  <b>素晴しい</b>
                                ) : (
                                  <b>Normal</b>
                                )}
                              </div>
                              <div className="review-count">
                                {item.reviewCount}レビュー
                              </div>
                            </div>
                            <div className="item-star">
                              <div>{item.rating.toFixed(1)}</div>
                            </div>
                          </div>
                        </div>
                        <div className="item-link">
                          <button
                            className="item-details-link orange"
                            onClick={() =>
                              navigate(`/detail/${item.id}`, { id: item.id })
                            }
                          >
                            詳細を表示
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (<></>
              // <div>No result</div>
            )}
          </div>

          <Pagination
            itemPerPage={maxPerPage}
            maxItem={searchRes ? searchRes.length : 0}
            currentPage={currentPage}
            changePage={changePage}
          />
        </div>
      </div>
    </>
  );
}
