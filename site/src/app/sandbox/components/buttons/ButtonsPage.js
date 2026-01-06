"use client";

import styles from "../ComponentsPage.module.css";
import { helpTopicsData } from "src/data/helpTopicsData";
import {
  LogoButton,
  CloseButton,
  ArrowButton,
  LaunchButton,
  ExploreButton,
  TooltipButton,
  BlogTagButton,
  HelpTopicButton,
  HelpCategoryButton,
} from "src/components/buttons";

const ButtonsPage = () => {
  return (
    <div className={styles.wrapper}>
      <CloseButton size={16} onClick={() => {}} />
      <TooltipButton
        icon="circleQuestion"
        size={20}
        theme="light"
        position="top"
      />
      <BlogTagButton type="security" />
      <ArrowButton text="Learn more" link="/" onClick={() => {}} />
      <LaunchButton text="Get started" link="/" icon="fox" />
      <HelpTopicButton data={helpTopicsData[0].links[0]} />
      <LogoButton link="/" showText />
      <HelpCategoryButton data={helpTopicsData[2].links[0]} />
      <ExploreButton
        text="Explore features"
        link="/"
        icon="bulb"
        theme="light"
      />
    </div>
  );
};

export default ButtonsPage;
