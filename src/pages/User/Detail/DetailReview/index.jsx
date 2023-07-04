
import './DetailReview.scss';
// import './ReviewCard';
import ReviewCard from './ReviewCard';
import { useState, useEffect } from 'react';
// import {apiURL} from '@/hooks/hooks';
// import axios from 'axios';

export default function DetailReview({data, postData}) {

    const [listData, setData] = useState([]);
    // console.log(data);
    // const [curPage, setCurPage] = useState(1);
    // const maxPerPage = 2;

    // const changePage = (i) => {
    //     setCurPage(i);
    // }

    useEffect(() => {
        // setCurPage(1);
        setData(data);
    }, [data])

    return (
        // <div className='row' style={{width: '100%',}}>
        <div className='review-list row'>
            {/* <div className="add-review-form">
                <ReviewCard status="add" data={{name: 'myname'}}/>
            </div> */}
            <div className="review-list-info row">
            {
                listData.length ?
                listData.map((item, index) => {
                    return (
                        <ReviewCard 
                            key={index}
                            status={"normal"} 
                            data={item}  />
                    )
                })
                : <></>
            }
            </div>
            
            
        </div>
        // </div>
    )
}