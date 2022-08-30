import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortType } from "../redux/filterSlice";
import img from "../assets/Vector.svg";
import { sortList } from "../redux/constants";
import { fetchCard } from "../redux/cardSlice";

const Sort = ({ currentPage, setCurrentPage, sort }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);

  const handleSelect = (obj) => {
    dispatch(setSortType(obj));
    dispatch(fetchCard({ currentPage, sort: obj.sortProperty }));
    setCurrentPage((currentPage = 8));
    setVisible(false);
  };

  return (
    <div className="sort">
      <b>Фильтр:</b>
      <div className={`${!visible ? "sort__option" : "sort__popup"}`}>
        <div className="sort__label">
          <span>{sort.name}</span>
          <img onClick={() => setVisible(!visible)} src={img} alt="" />
        </div>
        {visible && (
          <ul>
            {sortList.map((obj, i) => (
              <li className="sortName" key={i} onClick={() => handleSelect(obj)}>
                {obj.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sort;
