import "./Search.scss";
import Checkbox from "@/components/Checkbox";
import SvgIcon from "@/components/SvgIcon";
import Pagination from "@/components/Pagination";
import ReactSlider from "react-slider";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shopList, serviceList } from "@/hooks/FakeData";
// import { useNavigateParams } from "@/routes";

const minRate = 0;
const maxRate = 5;

export default function Search() {

  const navigate = useNavigate();

  const maxPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = shopList.length / maxPerPage;

  const [searchRes, setRes] = useState([...shopList]);

  const [rateVal, setRateVal] = useState([minRate, maxRate]);
  const [name, setName] = useState("");
  const [service, setService] = useState([...serviceList]);

  const confirmSearch = () => { };

  const saveName = (e) => {
    let nameVal = e.target.value;
    setName(nameVal);
    console.log(name);
  }

  const getServiceList = async () => {
    console.log(serviceList);
  }

  const getSearchResult = async () => {
    console.log(searchRes);
  }

  const fetchBoth = async () => {
    const data1 = await getServiceList()
    const data2 = await getSearchResult()
  }

  const saveService = (serviceName, val) => {
    console.log(serviceName, val);
  }

  const changePage = (index) => {
    setCurrentPage(index);
  }

  useEffect(() => {
    fetchBoth()
  }, [])

  useEffect(() => {
    let arr = []
    var minIndex = (currentPage - 1) * maxPerPage
    var maxIndex = currentPage * maxPerPage
    for (let i = minIndex; i < maxIndex; i++) {
      if (i >= shopList.length) break;
      arr.push(shopList[i])
    }
    setRes(arr);
  }, [currentPage])

  return (
    <>
      <div className="page-body-search">
        <div className="side-bar">
          <div className="returnHome">
            <button onClick={() => navigate('/')}>Home</button>
          </div>
          <div className="name-search">
            <div className="title">目的地／物件名</div>
            <div className="input-field">
              <SvgIcon name="search" width={15} height={15} />
              <input value={name} onChange={(e) => saveName(e)} type="text" name="name/address" id="name/address" placeholder="ハノイ"></input>
            </div>
          </div>
          <div className="service-search">
            <div className="title">サービス</div>
            <div className="items-list">
              {service.map((item, index) => {
                return (
                  <div className="item" key={index} >
                    <Checkbox length={"15px"} valueIn={item.value} setVal={saveService} name={item.name} />
                    <div className="item-name">{item.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rate-search">
            <div className="title">
              {rateVal[0] === rateVal[1]
                ? `評価: ${rateVal[0]}`
                : `評価: ${rateVal[0]} - ${rateVal[1]}`}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <ReactSlider
                className="slider"
                onChange={setRateVal}
                value={rateVal}
                min={minRate}
                max={maxRate}
              />
            </div>
          </div>
          <div className="button">
            <button id="search-btn" onClick={confirmSearch}>
              検索
            </button>
          </div>
        </div>

        <div className="main-content">
          <div className="result-title">
            <b>ハノイ： {shopList.length} 件の宿泊旅設一致しました</b>
          </div>
          
          <div className="result-list">
            {searchRes.map((item, index) => {
              return (
                <div key={index} className="result-item">
                  <div className="item-picture">
                    <SvgIcon type={"png"} name={"pic"} />
                  </div>
                  <div className="item-description">
                    <div className="row">
                      <div className="item-name"> <b>{item.name}</b> </div>
                    </div>
                    <div className="row">
                      <div className="item-address" style={{ flex: '1' }}> {item.address} </div>
                      <div className="item-rate">
                        <div className="item-review">
                          <div className="review-text"> {item.rate > 4 ? <b>素晴しい</b> : <b>Normal</b>} </div>
                          <div className="review-count"> {item.reviewCount}件のレビュー </div>
                        </div>
                        <div className="item-star">  <div>{item.rate}</div> <SvgIcon name="star" width={20} height={20} style={{ alignSeft: 'center', }} /> </div>

                      </div>
                    </div>
                    <div className="row">
                      <div className="item-introduce" style={{ flex: '1' }}> 
                        {item.introduce} aaaaaaaaaaaaaaaa aaaaaaaaaassssssaa 
                      </div>
                      <div className="item-link">
                        <button
                          className="item-details-link"
                          onClick={() => navigate(`/details/${item.id}`, {id: item.id})}>
                          詳細を表示
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination itemPerPage={3} maxItem={shopList.length} currentPage={currentPage} changePage={changePage} />
        </div>
      </div>
    </>
  );
}
