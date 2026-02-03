import styles from "./AppFooterNavigation.module.css";
import Link from "next/link";
import { footerData } from "src/data/footerData";
import { newUpdatesData } from "src/data/newUpdatesData";
import { NewUpdatesCard } from "src/components/cards";
import { SocialMediaList } from "src/components/lists";

const AppFooterNavigation = () => {
  return (
    <div className={styles.navigation}>
      <div className={styles.sitemap}>
        <div className={styles.subscription}>
          <p>
            Join our <Link href="/">newsletter</Link> for tips and updates.{" "}
            <br />
            We promise to never spam you!
          </p>
          <NewUpdatesCard data={newUpdatesData[0]} />
        </div>
        <div className={styles.navigationLists}>
          {footerData.map((data, index) => {
            const { label, links } = data;

            return (
              <div key={index} className={styles.list}>
                <div className={styles.label}>{label}</div>
                <div className={styles.links}>
                  {links.map((data) => {
                    const { name, link } = data;

                    return (
                      <Link key={name} href={link}>
                        {name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Fobox © 2026. All rights reserved.</p>
        <SocialMediaList />
      </div>
    </div>
  );
};

export default AppFooterNavigation;
