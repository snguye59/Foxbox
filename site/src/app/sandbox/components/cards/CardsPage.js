"use client";

import styles from "../ComponentsPage.module.css";
import { useState } from "react";
import { faqsData } from "src/data/faqsData";
import { pricingData } from "src/data/pricingData";
import { blogPostsData } from "src/data/blogPostsData";
import { newUpdatesData } from "src/data/newUpdatesData";
import { testimonialsData } from "src/data/testimonialsData";
import { learningResourcesData } from "src/data/learningResourcesData";
import {
  FaqCard,
  BlogCard,
  PricingCard,
  CalloutCard,
  FeatureCard,
  TutorialCard,
  NewUpdatesCard,
  TestimonialCard,
} from "src/components/cards";

const CardsPage = () => {
  const [plan, setPlan] = useState("monthly");

  return (
    <div className={styles.wrapper}>
      <NewUpdatesCard data={newUpdatesData[0]} onClose={() => {}} />
      <FaqCard data={faqsData[0]} />
      <TutorialCard data={learningResourcesData[0]} />
      <TestimonialCard data={testimonialsData[0]} />
      <PricingCard data={pricingData[2]} plan={plan} theme="dark" />
      <CalloutCard variant="scheduling" />
      <BlogCard data={blogPostsData[0]} size="small" />
      <FeatureCard variant="2" />
    </div>
  );
};

export default CardsPage;
