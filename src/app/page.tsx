import ScrollyCanvas from "@/components/ScrollyCanvas";
import MenuSection from "@/components/MenuSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505]">
      <ScrollyCanvas frameCount={254} />
      
      <MenuSection />
      
      <AboutSection />
      
      <ContactSection />

      {/* Footer */}
      <footer className="relative z-20 py-24 bg-[#050505] flex flex-col items-center justify-center border-t border-white/5">
        <div className="max-w-4xl px-8 text-center">
          <div className="text-[10px] tracking-[0.5em] text-white/20 uppercase font-manrope">
            © 2024 CAFEXO INDUSTRIES. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </main>
  );
}
