import styles from "./PricingCard.module.css";
import Link from "next/link";
import { Divider } from "src/components/utils";
import { FeatureCheckList } from "src/components/lists";

const PricingCard = ({ data, plan, theme }) => {
  const {
    name,
    description,
    monthlyLink,
    monthlyPrice,
    yearlyLink,
    yearlyPrice,
    features,
  } = data;
  const billingCycle = name === "Free" ? "Forever" : "Per month";
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(plan === "monthly" ? monthlyPrice : yearlyPrice);

  return (
    <div className={`${styles.card} ${styles[theme]}`}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>
            <h5>{name}</h5>
            <p>{description}</p>
          </div>
          <div className={styles.badge}>
            <h5>{price}</h5>
            <p>{billingCycle}</p>
          </div>
        </div>
        <Divider direction="vertical" theme={theme} />
      </div>
      <div className={styles.features}>
        <FeatureCheckList>
          {features.map((feature) => {
            return (
              <FeatureCheckList.KeyFeature
                key={feature.name}
                data={feature}
                tooltipPosition="top"
                theme={theme}
              />
            );
          })}
        </FeatureCheckList>
      </div>
      <Link
        href={plan === "monthly" ? monthlyLink : yearlyLink}
        className={styles.button}
      >
        Get started
      </Link>
    </div>
  );
};

export default PricingCard;
