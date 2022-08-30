import React from "react";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchCard } from "../../redux/cardSlice";
import Sort from "../../components/Sort";

const MainPage = () => {
  const [currentPage, setCurrentPage] = React.useState(8);
  const [fetching, setFetching] = React.useState(true);

  const data = useSelector((state) => state.card.card);
  const sort = useSelector((state) => state.filter.sort);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (fetching) {
      currentPage !== data?.total && setCurrentPage(currentPage + 8);
      dispatch(fetchCard({ currentPage, sort: sort.sortProperty })).finally(
        () => setFetching(false)
      );
    }
  }, [fetching, sort]);

  React.useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true);
    }
  };

  return (
    <>
      <Sort currentPage={currentPage} setCurrentPage={setCurrentPage} sort={sort} />
      <div className="cards">
        {data?.items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default MainPage;
