import "./Search.scss";
// import Checkbox from "@/components/Checkbox";
import CheckboxList from "@/components/CheckboxList";
import SvgIcon from "@/components/SvgIcon";
import Pagination from "@/layouts/Pagination";
import ReactSlider from "react-slider";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { parlorList, serviceList } from "@/hooks/FakeData";
import Header from "@/layouts/Header";
// import Slider from "@/components/Slider";

const minRate = 0;
const maxRate = 50;

const minPrice = 100000;
const maxPrice = Math.ceil(305000 / 10000) * 10000;
const gap = 10000;

export default function Search() {
  const navigate = useNavigate();

  const [searchRes, setRes] = useState([]);
  const [showResList, setShowList] = useState([]);

  const [name, setName] = useState("");

  const [service, setService] = useState([]);
  // let service = serviceList;
  const [checkCount, setCheckCount] = useState(0);
  const [serviceName, setServiceName] = useState("");
  const [searchServiceList, setSearchServiceList] = useState([]);

  const [rateVal, setRateVal] = useState([minRate, maxRate]);
  const [priceVal, setPrice] = useState([minPrice, maxPrice]);

  const maxPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = parlorList.length / maxPerPage;

  const confirmSearch = () => {
    console.log(service);
    let nameVal = document.getElementById("name/address").value;
    if (!nameVal) {
      setRes(parlorList);
      return;
    }
    setName(nameVal);
    let data = parlorList.filter(
      (e) => e.name.includes(nameVal) || e.address.includes(nameVal)
    );
    console.log(data);
    setRes(data);
    setCurrentPage(1);
    // waitForRes()
  };

  // const saveName = (e) => {
  //   let nameVal = e.target.value;
  //   setName(nameVal);
  //   console.log(name);
  // }

  const clearNameInput = () => {
    document.getElementById("name/address").value = ''
  }

  const saveServiceName = (e) => {
    let val = e.target.value;
    setServiceName(val);
  };

  const getServiceList = async () => {
    console.log(serviceList);
    // service = serviceList;
    // console.log(service);
    setService(serviceList);
    setSearchServiceList(serviceList);
  };

  const getSearchResult = async () => {
    setRes(parlorList);
    // setShowList(parlorList);
    console.log(parlorList);
    setCurrentPage(1);
  };

  const fetchBoth = async () => {
    await getSearchResult();
    await getServiceList();
  };

  const saveService = (index) => {
    // console.log(index, searchServiceList[index], service);
    let i = service.findIndex((e) => e.name === searchServiceList[index].name);
    // console.log(i);
    let data = [...service];
    data[i].check = !data[i].check;

    let newList = [...searchServiceList];
    // console.log(newList[index].check);
    // console.log(newList);
    setService(data);
    setSearchServiceList(newList);
    setCheckCount(service.filter((e) => e.check).length);

    // console.log(data);
  };

  const changePage = (index) => {
    setCurrentPage(index);
  };

  useEffect(() => {
    fetchBoth();
  }, []);

  useEffect(() => {
    // if(!searchRes.length) return;
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
    setCurrentPage(1);
  }, [searchRes]);

  useEffect(() => {
    if (!serviceName) {
      setSearchServiceList(service);
      return;
    }
    let data = service.filter((e) => e.name.includes(serviceName));
    setSearchServiceList(data);
  }, [serviceName]);

  return (
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
                />
                <button onClick={clearNameInput}>クリア</button>
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
                    placeholder="ハノイ、ダナン"
                  />
                  <button onClick={() => setServiceName("")}>クリア</button>
                </div>
                <div className="checkbox-list col">
                  {searchServiceList.length
                    ? searchServiceList.map((item, index) => {
                        return (
                          <CheckboxList
                            key={`checkboxItem${index}`}
                            item={item}
                            setVal={saveService}
                            index={index}
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
                <ReactSlider
                  className="slider"
                  onChange={setRateVal}
                  value={rateVal}
                  min={minRate}
                  max={maxRate}
                  pearling={true}
                  // type="double"
                  // color="black"
                />
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
                  {/* <SvgIcon name="search-star" /> */}
                  {` VND`}
                </div>
              </div>
              <div>
                <ReactSlider
                  className="slider"
                  onChange={setPrice}
                  value={priceVal}
                  min={minPrice}
                  max={maxPrice}
                  step={gap}
                  pearling={true}
                  // type="double"
                  // color="black"
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
              {searchRes.length} マッサージ部屋が一致しました
            </b>
          </div>

          <div className="result-list col">
            {showResList.length ? (
              showResList.map((item, index) => {
                return (
                  <div key={index} className="result-item row">
                    <div className="item-picture">
                      <SvgIcon width="100%" type={"png"} name={"pic"} />
                    </div>
                    <div className="item-description row">
                      <div className="col" style={{ gap: "12px", flex: "2" }}>
                        <div className="item-name">
                          <b>{item.name}</b>
                        </div>
                        <div className="item-address row">
                          <SvgIcon name="map_marker" />
                          {item.address}
                        </div>
                        <div className="item-introduce">{item.introduce}</div>
                      </div>
                      <div className="col" style={{ gap: "30px" }}>
                        <div className="item-rate col" style={{ gap: "10px" }}>
                          <div className="row" style={{ gap: "12px" }}>
                            <div className="item-review col">
                              <div className="review-text">
                                {item.rate > 4 ? (
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
                              <div>{item.rate}</div>
                            </div>
                          </div>
                        </div>
                        <div className="item-link">
                          <button
                            className="item-details-link orange"
                            onClick={() =>
                              navigate(`/details/${item.id}`, { id: item.id })
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
            ) : (
              <div>No result</div>
            )}
          </div>

          <Pagination
            itemPerPage={maxPerPage}
            maxItem={searchRes.length}
            currentPage={currentPage}
            changePage={changePage}
          />
        </div>
      </div>
    </>
  );
}
