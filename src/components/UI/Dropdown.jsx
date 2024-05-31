import styles from "./Dropdown.module.css";

const Dropdown = (props) => {
  return (
    <select
      value={props.currentTag}
      className={styles["dropdown"]}
      onChange={props.onChange}
    >
      {props.items.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
