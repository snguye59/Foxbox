"use client";

import styles from "../ComponentsPage.module.css";
import { usePathname } from "next/navigation";
import { headerData } from "src/data/headerData";
import { pricingData } from "src/data/pricingData";
import {
  SocialMediaList,
  FeatureCheckList,
  StatHighlightList,
  PageNavigationList,
} from "src/components/lists";

const ListsPage = () => {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      <PageNavigationList>
        {headerData.map((navItem) => {
          return (
            <PageNavigationList.PageNavigationButton
              key={navItem.link}
              data={navItem}
              isActive={pathname === navItem.link}
            />
          );
        })}
      </PageNavigationList>
      <SocialMediaList />
      <FeatureCheckList>
        {pricingData[0].features.map((feature) => {
          return (
            <FeatureCheckList.KeyFeature
              key={feature.name}
              data={feature}
              tooltipPosition="right"
              theme="light"
            />
          );
        })}
      </FeatureCheckList>
      <StatHighlightList
        title="100%"
        description="of APIs requests are secured using Foxbox."
        theme="light"
      />
    </div>
  );
};

export default ListsPage;
