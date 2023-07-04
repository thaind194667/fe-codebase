import { useEffect, useState } from "react";
import "./ReviewCard.scss";
import SvgIcon from "@/components/SvgIcon";
import { apiURL, publicURL } from "@/hooks/hooks";

export default function ReviewCard({ data, status, submitReview }) {
    // console.log(data);
    // const [rate, setRate] = useState(5);
    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(0);

    useEffect(() => {
        if (status === "normal") {
            setRating(data.rate);
            console.log(data.rate);
        }
    }, [data]);

    // const rating = () => {
    // console.log("clcik");
    // setStar(index);
    // }

    return (
        <div className={`review-info col ${status}`}>
            <div className="user-info row">
                <div className="user-avatar"><img  src={data.userAvatarUrl ? `${publicURL}${data.userAvatarUrl}` : '/avatar-default.jpg'}></img></div>

                <div className="user-name">{data.userName}</div>
            </div>
            <div className="user-rating row">
                {
                    [...Array(5)].map((star, index) => {
                        index += 1;
                        return status === "add" ? (
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
                        ) : index - 1 < rating ? (
                            <SvgIcon
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
                        );
                    })

                    // Array(5).fill().map((item, index) =>
                    //     index < ratingStar ?
                    //     <SvgIcon
                    //         onClick={rating}
                    //         className={`${status}star num${index}`}
                    //         key={'starnumber' + index}
                    //         name="comment-star" />
                    //     : <SvgIcon
                    //         className={`${status}star num${index}`}
                    //         name="comment-star-disabled"
                    //         key={'starnumber' + index} />
                    // )
                }
            </div>
            <div className="user-comment">
                {status === "add" ? (
                    <textarea
                        name="comment"
                        className={`${status} comment-field`}
                        id={`comment`}
                    ></textarea>
                ) : (
                    <textarea
                        name="comment"
                        className={`${status} comment-field`}
                        id={`comment`}
                        value={data.comment}
                        disabled
                    ></textarea>
                )}
            </div>
            {status === "add" ? (
                <button className="submit-rating orange">レビューを送る</button>
            ) : (
                <></>
            )}
        </div>
    );
}
