import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Nhk4dWoYLj83rV44/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/10 to-neutral-950 pointer-events-none" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Your local AI workspace
          </h1>
          <p className="mt-3 md:mt-4 text-neutral-300">
            Chat with models running on your machine. Built with a clean interface, fast UX, and a futuristic data-visual hero.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
