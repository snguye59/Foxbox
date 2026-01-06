import styles from "../CalloutCard.module.css";
import Link from "next/link";

const Background = () => {
  return (
    <div className={`${styles.background} ${styles.scheduling}`}>
      <svg
        width="580"
        height="200"
        viewBox="0 0 580 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M156 30C165.389 30 173 22.3888 173 13C173 3.61116 165.389 -4 156 -4C146.611 -4 139 3.61116 139 13C139 22.3888 146.611 30 156 30ZM416 140.5C416 150.165 408.165 158 398.5 158C388.835 158 381 150.165 381 140.5C381 130.835 388.835 123 398.5 123C408.165 123 416 130.835 416 140.5ZM60 190C60 206.569 46.5685 220 30 220C13.4315 220 0 206.569 0 190C0 173.431 13.4315 160 30 160C46.5685 160 60 173.431 60 190Z"
          fill="black"
          fillOpacity="0.1"
        />
        <circle cx="501" cy="70" r="120" fill="black" fillOpacity="0.1" />
        <circle cx="536" cy="70" r="120" fill="#363A5B" />
        <path
          d="M499.413 100.911C499.413 119.185 514.228 134 532.503 134C538.665 134 544.433 132.316 549.373 129.383C551.947 127.855 561.282 134.138 563.344 131.994C565.089 130.178 559.643 120.014 560.94 117.84C563.895 112.887 565.593 107.097 565.593 100.911C565.593 82.6351 550.778 67.8203 532.503 67.8203C514.228 67.8203 499.413 82.6351 499.413 100.911Z"
          fill="#FFCFAC"
        />
        <path
          d="M546.819 77.6777C546.819 98.4154 530.008 115.226 509.27 115.226C502.278 115.226 495.733 113.315 490.128 109.987C488.958 109.293 475.094 116.831 472.753 114.397C469.689 111.21 477.601 97.8929 477.002 96.8886C473.648 91.2687 471.722 84.6977 471.722 77.6777C471.722 56.9399 488.533 40.1289 509.27 40.1289C530.008 40.1289 546.819 56.9399 546.819 77.6777Z"
          fill="#FFA25F"
        />
      </svg>
    </div>
  );
};

const SchedulingCard = () => {
  return (
    <div className={styles.card}>
      <Background />
      <h5 className={styles.title}>Have business sale questions?</h5>
      <Link href="/" className={styles.button}>
        Schedule a demo
      </Link>
    </div>
  );
};

export default SchedulingCard;
