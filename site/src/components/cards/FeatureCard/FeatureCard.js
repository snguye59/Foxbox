import Card1 from "./variants/Card1";
import Card2 from "./variants/Card2";
import Card3 from "./variants/Card3";
import Card4 from "./variants/Card4";
import Card5 from "./variants/Card5";

const FeatureCard = ({ variant }) => {
  return (
    <>
      {
        {
          1: <Card1 />,
          2: <Card2 />,
          3: <Card3 />,
          4: <Card4 />,
          5: <Card5 />,
        }[variant]
      }
    </>
  );
};

export default FeatureCard;
