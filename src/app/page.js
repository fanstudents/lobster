import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PainPoints from '@/components/PainPoints';
import Solution from '@/components/Solution';
import TemplateGallery from '@/components/TemplateGallery';
import VisualShowcase from '@/components/VisualShowcase';
import LobsterShowcase from '@/components/LobsterShowcase';
import Instructors from '@/components/Instructors';
import CostBreakdown from '@/components/CostBreakdown';
import LiveEvent from '@/components/LiveEvent';
import FAQ from '@/components/FAQ';
import Enterprise from '@/components/Enterprise';
import EnterpriseSOP from '@/components/EnterpriseSOP';
import ParallaxDivider from '@/components/ParallaxDivider';
import StickyBar from '@/components/StickyBar';
import MobileBottomBar from '@/components/MobileBottomBar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <ParallaxDivider text="所以我們換了一種方式" variant="primary" />
        <Solution />
        <EnterpriseSOP />
        <TemplateGallery />
        <VisualShowcase />
        <LobsterShowcase />
        <Instructors />
        <CostBreakdown />
        <LiveEvent />
        <FAQ />
        <ParallaxDivider text="企業級方案" variant="enterprise" />
        <Enterprise />
      </main>
      <StickyBar />
      <MobileBottomBar />
      <Footer />
    </>
  );
}
