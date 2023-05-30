import { useLocation, useNavigate, useParams } from "react-router-dom";
import './Details.scss'
import { shopList } from "@/hooks/FakeData";
import { useState, useEffect } from "react";


export default function Details() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [pageData, setData] = useState({})

  const getDetails = async () => {
    setData(shopList[id]);
  }

  useEffect(() => {
    // console.log(shopList);
    // console.log(id);
    getDetails();
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
        {pageData.name}
      </div>
    </div>
    // <div className="returnHome">
    //     <p>Details page here</p>
    //   <button onClick={() => navigate("/")}>Home</button>
    //   <button onClick={() => navigate("/search")}>Search</button>

    // </div>
  );
}
