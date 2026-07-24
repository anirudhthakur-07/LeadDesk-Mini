import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
