import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Pillars } from './components/Pillars';
import { Horizon } from './components/Horizon';
import { Guide } from './components/Guide';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Problem />
      <Pillars />
      <Horizon />
      <Guide />
      <Footer />
    </div>
  );
}
