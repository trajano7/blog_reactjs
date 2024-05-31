import { useEffect, useState } from "react";
import Dropdown from "./UI/Dropdown";

import styles from "./FilterMenu.module.css";
import { HiSortDescending, HiSortAscending } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";


const FilterMenu = ({ tags }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [{ tag, order, isSyncing }, setFilterData] = useState({
    tag: "All Tags",
    order: "dateDsc",
    isSyncing: true
  })

  const tagChangeHandler = (event) => {
    setFilterData((prev) => {
      return {
        ...prev,
        tag: event.target.value,
        isSyncing: false
      }
    })
  };

  const orderChangeHandler = () => {
    setFilterData((prev) => {
      return {
        ...prev,
        order: prev.order === "dateDsc" ? "dateAsc" : "dateDsc",
        isSyncing: false
      }
    })
  };

  useEffect(() => {
    if (!isSyncing) {
      const query = searchParams.get("query");
      const queryArg = query ? `?query=${query}&` : "?";
      const tagArg = tag !== "All Tags" ? `tag=${tag}&` : "";
      const path = queryArg + tagArg + `order=${order}`;
      navigate(path);
    } 

    
  }, [tag, order]);

  useEffect(() => {
    const queryTag = searchParams.get("tag") || "All Tags";
    const queryOrder = searchParams.get("order") || "dateDsc";

    setFilterData({
      tag: queryTag,
      order: queryOrder,
      isSyncing: true
    })
  }, [searchParams]);

  let orderIcon = <HiSortDescending />;
  if (order === "dateAsc") {
    orderIcon = <HiSortAscending />
  }

  return (
    <div className={styles["filter-menu"]}>
      <Dropdown
        currentTag={tag}
        onChange={tagChangeHandler}
        items={tags}
      />
      <button onClick={orderChangeHandler} className={styles["order-bttn"]}>
        {orderIcon}
        Sort By Date
      </button>
    </div>
  );
};

export default FilterMenu;
