
import React from 'react';
import styles from './BubbleLoading.module.css';

const BubblesLoading = ({ className }) => {
  const classes = `${styles["bubbles-loading"]} + ${className || ""}`

  return (
    <div className={classes}>
      <div className={styles.bubble}></div>
      <div className={styles.bubble}></div>
      <div className={styles.bubble}></div>
    </div>
  );
};

export default BubblesLoading;
