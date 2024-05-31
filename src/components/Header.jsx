import { basename } from "../config";
import styles from "./Header.module.css";
import SearchBar from "./SearchBar";

const Header = (props) => {
  const onLogoClickHandler = () => {
    window.location.replace(basename);
  }

  return (
    <div className={styles["header-container"]}>
      <header>
        <div className={styles["logo"]} onClick={onLogoClickHandler}>
          <h1>This is a blog!</h1>
        </div>
        <nav className={styles["nav-header"]}>
          <SearchBar />
        </nav>
      </header>
    </div>
  );
};

export default Header;
