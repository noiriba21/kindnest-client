import { Banner, UpcomingSection, Newsletter } from "@/components/HomeSections";
import { QuotesOfKindness, HowItWorks } from "@/components/Extras";
import {
  Ticker,
  Wave,
  FeaturesAlive,
  DailyKindness,
  GalleryAlive,
  ScrollExtras,
} from "@/components/Creative";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <ScrollExtras />
      <Banner />
      <Ticker />
      <FeaturesAlive />
      <HowItWorks />
      <UpcomingSection />
      <Wave />
      <div className="bg-base-200">
        <DailyKindness />
        <QuotesOfKindness />
      </div>
      <GalleryAlive />
      <Reveal>
        <Newsletter />
      </Reveal>
    </>
  );
}