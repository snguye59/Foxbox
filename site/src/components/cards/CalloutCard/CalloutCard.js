import PricingCard from './variants/PricingCard';
import SchedulingCard from './variants/SchedulingCard';

const CalloutCard = ({ variant }) => {
  return (
    <>
      {
        {
          pricing: <PricingCard />,
          scheduling: <SchedulingCard />,
        }[variant]
      }
    </>
  );
};

export default CalloutCard;
