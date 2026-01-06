import styles from "./BlogCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { AvatarBadge, BlogTagBadge } from "src/components/badges";

const BlogCard = ({ data, size }) => {
  const { title, introduction, author, background, link, releaseDate, tags } =
    data;
  const displayedTags =
    size === "small" && tags.length > 2 ? tags.slice(0, 2) : tags;

  return (
    <Link href={link} className={`${styles.card} ${styles[size]}`}>
      <div className={styles.background}>
        <div className={styles.image}>
          <Image
            src={background.image}
            alt={background.name}
            sizes="100%"
            fill
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.tags}>
          {displayedTags.map((tag) => (
            <BlogTagBadge key={tag} type={tag} />
          ))}
        </div>
        <div className={styles.texts}>
          {size === "small" ? <h4>{title}</h4> : <h3>{title}</h3>}
          <p>{introduction}</p>
        </div>
        <div className={styles.authorByline}>
          <div className={styles.author}>
            <AvatarBadge data={author} size={44} />
            {author.name}
          </div>
          <p>{releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
