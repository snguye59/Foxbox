import styles from "./BlogTagBadge.module.css";
import { blogTagsData } from "src/data/blogTagsData";

const BlogTagBadge = ({ type }) => {
  const tag = blogTagsData.find((tag) => tag.type === type);

  return <div className={`${styles.badge} ${styles[type]}`}>{tag.label}</div>;
};

export default BlogTagBadge;
