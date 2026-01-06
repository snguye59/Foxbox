import styles from "./BlogPaginationNavigation.module.css";

const BlogPaginationNavigation = () => {
  return <div></div>;
};

const PageNumberButton = ({ number, isActive, onClick }) => {
  return (
    <button
      type="button"
      className={` 
        ${styles.button} 
        ${isActive ? styles.active : ""}
      `}
      onClick={onClick}
    >
      {number}
    </button>
  );
};

BlogPaginationNavigation.PageNumberButton = PageNumberButton;
PageNumberButton.displayName = "PageNumberButton";

export default BlogPaginationNavigation;
