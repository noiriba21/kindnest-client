import { Banner, Features, UpcomingSection, Gallery, Newsletter } from "@/components/HomeSections";
import { QuotesOfKindness, HowItWorks } from "@/components/Extras";

export default function Home() {
  return (
    <>
      <Banner />
      <Features />
      <HowItWorks />
      <UpcomingSection />
      <QuotesOfKindness />
      <Gallery />
      <Newsletter />
    </>
  );
}