import styles from "./BlogTagButton.module.css";
import Link from "next/link";
import { blogTagsData } from "src/data/blogTagsData";
import { SvgIcon } from "src/components/icons";

const BlogTagButton = ({ type }) => {
  const tag = blogTagsData.find((tag) => tag.type === type);

  return (
    <Link
      href={tag.link}
      className={` 
        ${styles.button} 
        ${styles[type]}
      `}
    >
      {tag.label}
      <SvgIcon icon="arrow" size={12} />
    </Link>
  );
};

export default BlogTagButton;
