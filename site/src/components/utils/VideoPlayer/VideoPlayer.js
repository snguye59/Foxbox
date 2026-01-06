import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({ title, link, width, showGradient }) => {
  return (
    <div
      className={`
        ${styles.video} 
        ${showGradient ? styles.showGradient : ""}
      `}
      style={{ width: `clamp(300px, 100%, ${width}` }}
    >
      <iframe
        className={styles.iframe}
        src={link}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
