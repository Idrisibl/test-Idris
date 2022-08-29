import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortType } from "../redux/filterSlice";
import img from "../assets/Vector.svg";

const sortList = [
  {
    name: "Нет",
    sortProperty: false,
  },
  {
    name: "Только активные",
    sortProperty: true,
  },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);

  const [visible, setVisible] = React.useState(false);

  const handleSelect = (obj) => {
    dispatch(setSortType(obj));

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
              <li key={i} onClick={() => handleSelect(obj)}>
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
