import { IconContext } from "react-icons";
import { IoIosSearch } from "react-icons/io";

import styles from "./SearchBar.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [ searchParams ] = useSearchParams();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const tag = searchParams.get("tag");
      const order = searchParams.get("order");
      const queryStr = encodeURIComponent(query.replace(/ /g, ','));
      const url = `?query=${queryStr}` + (tag ? `&tag=${tag}` : "") + (order ? `&order=${order}` : "");
      navigate(url);
    }
  };

  useEffect(() => {
    if(state?.reset) {
      setQuery("");
    }
  }, [state])

  return (
    <div className={styles["input-container"]}>
      <IconContext.Provider value={{ className: styles["search-icon"] }}>
        <IoIosSearch />
      </IconContext.Provider>
      <input
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
