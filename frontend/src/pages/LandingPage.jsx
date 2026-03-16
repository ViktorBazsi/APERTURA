import HeroSection from '../components/sections/HeroSection';
import NewsGrid from '../components/sections/NewsGrid';
import EventsShowcase from '../components/sections/EventsShowcase';
import EnsembleHighlight from '../components/sections/EnsembleHighlight';
import TeaserSplit from '../components/sections/TeaserSplit';
import ContactMini from '../components/sections/ContactMini';

function LandingPage() {
  return (
    <>
      <HeroSection />
      <NewsGrid />
      <EventsShowcase limit={4} />
      <EnsembleHighlight />
      <TeaserSplit />
      <ContactMini />
    </>
  );
}

export default LandingPage;
