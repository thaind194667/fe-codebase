import "./Search.scss";
import Checkbox from "@/components/Checkbox";
import SvgIcon from "@/components/SvgIcon";
import ReactSlider from "react-slider";
import { useState } from "react";

const minRate = 0;
const maxRate = 5;

const fakeData = []

for(let i = 0; i < 3; i++) {
    fakeData.push(
        {
            id: i,
            imgUrl: '',
            name: `shop${i}`,
            address: `address${i}`,
            rate: Math.random * (5),
            introduce: `This is shop${i} at address${i}`,
            reviewCount: Math.round( Math.random * (50) ),
        }
    )
}

export default function Search() {
  const serviceList = [
    { name: "マッサージ", value: 0 },
    { name: "ホットストーンマッサージ", value: 0 },
  ];

  const [searchRes, setRes] = useState(fakeData);

  const [rateVal, setRateVal] = useState([minRate, maxRate]);

  const [name, setName] = useState("");

  const [edit, setEdit] = useState(false);

  const makeEdit = () => {
    setEdit(true);
    setName(name ? name : "");
    console.log(name);
  };

  const makeNormal = () => {
    setEdit(false);
    // setName(name ? name : 'ハノイ')
  };

  const saveName = () => {
    const input = document.getElementsByClassName("input")[0].innerText;
    setName(input);
    setEdit(false);
  };

  const confirmSearch = () => {};

  return (
    <>
      <div className="page-body">
        <div className="side-bar">
          <div className="name-search">
            <div className="title">目的地／物件名</div>
            <div className="input-field" onFocus={makeEdit} onBlur={saveName}>
              <SvgIcon name="search" length={15} />
              <div
                contentEditable
                // onInput={saveName}
                className={`input ${name ? "name" : "placeholder"}`}
              >
                {edit ? (name ? name : "") : name ? name : "ハノイ"}
              </div>
            </div>
          </div>
          <div className="service-search">
            <div className="title">サービス</div>
            <div className="items-list">
              {serviceList.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <Checkbox length={"15px"} value={item.value} />
                    <div className="item-name">{item.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rate-search">
            <div className="title">
              評価:{" "}
              {rateVal[0] === rateVal[1]
                ? rateVal[0]
                : `${rateVal[0]} - ${rateVal[1]}`}{" "}
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
            <b>ハノイ：56 件の宿泊旅設一致しました</b>
          </div>
          <div className="result-list">
            {
                searchRes.map((item, index) => {
                    return (
                        <div key={index} className="result-item">
                            <div className="item-picture">
                                <SvgIcon type={'png'} name={'pic'} />
                            </div>
                            <div className="item-description">
                                <div className="item-name"> {item.name} </div>
                                <div className="item-address"> {item.address} </div>
                                <div className="item-introduce"> {item.introduce} </div>
                            </div>
                            <div className="item-rate">
                                
                            </div>
                        </div>
                    )
                })
            }
          </div>
          <div className="pagination"></div>
        </div>
      </div>
    </>
  );
}
