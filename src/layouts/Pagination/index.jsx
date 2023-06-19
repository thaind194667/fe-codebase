import { useState, useEffect } from "react";
import "./Pagination.scss";
import SvgIcon from "@/components/SvgIcon";

export default function Pagination({
  maxItem,
  itemPerPage,
  currentPage,
  changePage,
}) {
  const maxPage = Math.ceil(maxItem / itemPerPage);

  const [startIndex, setStart] = useState();
  const [endIndex, setEnd] = useState();

  const [startNav, setStartNav] = useState(false);
  const [endNav, setEndNav] = useState(false);

  const [pageList, setPageList] = useState([]);

  useEffect(() => {
    const cur = currentPage;
    const max = maxPage;
    let arr = [];
    if (max <= 6) {
      // arr = []
      for (var i = 1; i <= max; i++) arr.push(i);
      setStartNav(false);
      setEndNav(false);
    } else {
      if (cur <= 3) {
        arr = [1, 2, 3, 4];
        setStartNav(false);
        setEndNav(true);
      } else if (cur + 2 >= max) {
        arr = [max - 3, max - 2, max - 1, max];
        setStartNav(true);
        setEndNav(false);
      } else {
        arr = [cur - 1, cur, cur + 1];
        setStartNav(true);
        setEndNav(true);
      }
    }
    setPageList(arr);
    setStart((currentPage - 1) * itemPerPage + 1);
    setEnd(
      currentPage * itemPerPage > maxItem ? maxItem : currentPage * itemPerPage
    );
  }, [currentPage, maxItem]);

  return (
    <>
      {maxItem ? (
        <div className="pagination row">
          <div className="btn-list row">
            <button
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            >
              <SvgIcon name={`left-arrow${currentPage === 1 ? '-disabled' : ''}`} width={14} height={14} />

            </button>
            {pageList[0] !== 1 ? (
              <button onClick={() => changePage(1)}>1</button>
            ) : (
              ""
            )}
            {startNav ? <div className="threeDot">...</div> : ""}
            {pageList.map((page) => {
              return (
                <button key={`page${page}`} onClick={() => changePage(page)} className={page === currentPage ? 'current' : ''} >
                  { page}
                </button>
              );
            })}
            {endNav ? <div className="threeDot">...</div> : ""}
            {pageList[pageList.length - 1] !== maxPage ? (
              <button onClick={() => changePage(maxPage)}>{maxPage}</button>
            ) : (
              ""
            )}
            <button
              disabled={currentPage === maxPage}
              onClick={() => changePage(currentPage + 1)}
            >
              <SvgIcon name={`right-arrow${currentPage === maxPage ? '-disabled' : ''}`} width={14} height={14} />
            </button>
          </div>
          <div className="showInfo">
            {startIndex} - {endIndex} を表示している
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
