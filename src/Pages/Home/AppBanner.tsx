import Background from "../../assets/images/Tripvista_HomeBackgroundImage.svg";
import { Stack } from "rsuite";
import styles from "../../assets/styles/app-banner.module.css";
import HomeCard from "./HomeCard";
import OffersforYou from "./OffersforYou";
import PopularTouristspots from "./PopularTouristspots";
import NoticeBoardPanel from "./Preferences";

export default function AppBanner() {
  return (
    <div>
      <div
        className={styles.bannerContainer}
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className={styles.centeredTextContainer}>
          <Stack className={styles.centeredStack}>
           
          </Stack>
         
          <div style={{ width: "100%" }}>
            <HomeCard />
          </div>
        </div>
      </div>
      <div style={{ margin: "auto", width: "65%" }}>
        <NoticeBoardPanel />
      </div>

      <div style={{ margin: "auto", width: "67%" }}>
        <OffersforYou />
      </div>
      <div className={styles.centeredCard}>
        <div className={styles.centeredpopCard}>
          <PopularTouristspots />
        </div>
      </div>
    </div>
  );
}
