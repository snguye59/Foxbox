import styles from "./RangeSlider.module.css";

const RangeSlider = ({ value, onChange }) => {
  return (
    <div className={styles.input}>
      <input
        type="range"
        className={styles.slider}
        min={8}
        max={40}
        value={value}
        step={8}
        onChange={onChange}
        style={{
          background: `linear-gradient(to right, #0572EC ${
            ((value - 8) / 32) * 100
          }%, #EEEEEE ${((value - 8) / 32) * 100}%)`,
        }}
      />
    </div>
  );
};

export default RangeSlider;
