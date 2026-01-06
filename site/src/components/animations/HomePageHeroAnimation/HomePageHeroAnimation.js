import styles from "./HomePageHeroAnimation.module.css";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HomePageHeroAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 432.81;
    canvas.height = 269.66;

    const fontSize = 12;
    const spacing = 2;
    const rowHeight = fontSize + spacing * 4;
    const columnWidth = fontSize + spacing;
    const columns = Math.floor((canvas.width - spacing) / columnWidth);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const matrix = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(224, 249, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#006792";
      ctx.font = `${fontSize}px 'Fira Code', monospace`;

      matrix.forEach((y, index) => {
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        const x = index * columnWidth + spacing;

        ctx.fillText(text, x, y * rowHeight);

        if (y * rowHeight > canvas.height && Math.random() > 0.95) {
          matrix[index] = 0;
        }
        matrix[index]++;
      });
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.animation}>
      <Image
        className={styles.dataScreens}
        src="/images/animated-illustrations/data-screens.svg"
        alt="data screens"
        width={680}
        height={594}
        priority
      />
      <div className={styles.matrix}>
        <canvas ref={canvasRef} />
      </div>
      <Image
        className={styles.developer}
        src="/images/animated-illustrations/developer.svg"
        alt="developer"
        width={384}
        height={537}
        priority
      />
    </div>
  );
};

export default HomePageHeroAnimation;
