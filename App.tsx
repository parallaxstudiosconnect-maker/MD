import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

type CursorState = {
  x: number;
  y: number;
  size: number;
  label: string;
};

type Project = {
  title: string;
  client: string;
  year: string;
  type: string;
  role: string;
  blurb: string;
  accent: string;
  video: string;
  poster: string;
};

type Experiment = {
  title: string;
  format: string;
  note: string;
  video?: string;
  image?: string;
  className: string;
};

const projects: Project[] = [
  {
    title: "Nova Signals",
    client: "Aether Systems",
    year: "2024",
    type: "Brand film",
    role: "Direction / Design / Motion",
    blurb:
      "A launch film built from precise grid choreography, emissive gradients, and restrained typography.",
    accent: "from-fuchsia-400 via-orange-300 to-amber-200",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Quiet Current",
    client: "Blueform",
    year: "2023",
    type: "Explainer system",
    role: "Creative lead / Story / 3D",
    blurb:
      "An identity-led motion system where soft circular masks and modular diagrams reveal the product story.",
    accent: "from-cyan-300 via-sky-300 to-indigo-200",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    poster:
      "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Pulse Atlas",
    client: "Northstar Studio",
    year: "2022",
    type: "Title sequence",
    role: "Design / Compositing",
    blurb:
      "A tactile sequence of monolithic typography, ambient texture, and sharp editorial cuts for a documentary release.",
    accent: "from-lime-300 via-emerald-200 to-teal-100",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    poster:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  },
];

const experiments: Experiment[] = [
  {
    title: "Daily Render 018",
    format: "Loop / Cinema 4D",
    note: "Glass ring study with chromatic falloff and noisy bloom.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Rig Freebie",
    format: "After Effects",
    note: "Elastic lower-third with editable geometric handles.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Frame Lab",
    format: "Styleframe set",
    note: "Posterized color blocking inspired by transit maps.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Sound Test",
    format: "Reactive shapes",
    note: "Audio-linked squares and circles for a live opener concept.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Sketch Sprint",
    format: "Process / Notes",
    note: "Fast ideation board with timing notes and camera paths.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    className: "md:col-span-2 md:row-span-1",
  },
];

function MagnetButton({
  href,
  children,
  variant = "filled",
  onCursor,
}: {
  href: string;
  children: ReactNode;
  variant?: "filled" | "outline";
  onCursor: (label: string, size?: number) => void;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
    setOffset({ x, y });
  };

  const baseClassName =
    "group inline-flex items-center gap-3 rounded-full px-5 py-3 text-xs font-medium uppercase tracking-[0.26em] transition-all duration-300";

  return (
    <a
      href={href}
      onMouseEnter={() => onCursor("Open", 92)}
      onMouseLeave={() => {
        onCursor("", 18);
        setOffset({ x: 0, y: 0 });
      }}
      onMouseMove={handleMove}
      className={`${baseClassName} ${
        variant === "filled"
          ? "bg-neutral-950 text-stone-50 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          : "border border-black/10 bg-white/60 text-neutral-900 backdrop-blur-sm"
      }`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
          variant === "filled" ? "bg-white/12" : "bg-black/5"
        }`}
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{children}</span>
    </a>
  );
}

export function App() {
  const [cursor, setCursor] = useState<CursorState>({ x: 0, y: 0, size: 18, label: "" });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMove = (event: globalThis.MouseEvent) => {
      setCursor((current) => ({ ...current, x: event.clientX, y: event.clientY }));
    };

    window.addEventListener("mousemove", handleMove);
    const timeout = window.setTimeout(() => setIsLoaded(true), 1100);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.clearTimeout(timeout);
    };
  }, []);

  const updateCursor = (label: string, size = 18) => {
    setCursor((current) => ({ ...current, label, size }));
  };

  return (
    <div className="min-h-screen bg-[#f3f0ea] text-neutral-950 cursor-none">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(244,114,182,0.12),transparent_24%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.08),transparent_26%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div
        className={`pointer-events-none fixed left-0 top-0 z-[120] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[10px] font-medium uppercase tracking-[0.32em] text-neutral-950 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-md transition-[width,height,opacity,transform] duration-300 md:flex ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: cursor.x, top: cursor.y, width: cursor.size, height: cursor.size }}
      >
        <span className={`transition-opacity duration-200 ${cursor.label ? "opacity-100" : "opacity-0"}`}>
          {cursor.label}
        </span>
      </div>

      <div
        className={`fixed inset-0 z-[130] flex items-center justify-center bg-[#f3f0ea] transition-all duration-700 ${
          isLoaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-5 text-neutral-950">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full border border-black/15 animate-ping" />
            <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-neutral-950" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-black/45">Loading</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Atelier Motion</h2>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 pb-12 pt-4 sm:px-6 lg:px-10">
        <header className="sticky top-4 z-50 rounded-full border border-black/10 bg-white/75 px-4 py-3 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a
              href="#home"
              onMouseEnter={() => updateCursor("Home", 88)}
              onMouseLeave={() => updateCursor("", 18)}
              className="flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-neutral-950 text-stone-50">
                <span className="h-3 w-3 rounded-full bg-white" />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.34em] text-black/40">Motion portfolio</p>
                <p className="text-sm font-semibold tracking-[0.08em]">Atelier Motion</p>
              </div>
            </a>

            <nav className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-black/55">
              {[
                ["Work", "#work"],
                ["Process", "#process"],
                ["About", "#about"],
                ["Play", "#play"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onMouseEnter={() => updateCursor(label, 92)}
                  onMouseLeave={() => updateCursor("", 18)}
                  className="rounded-full px-3 py-2 transition-colors duration-200 hover:bg-black/5 hover:text-black"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main className="space-y-8 pt-6">
          <section
            id="home"
            className="overflow-hidden rounded-[2.5rem] border border-black/10 bg-white/70 px-6 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.05)] backdrop-blur-sm sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          >
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div className="flex flex-col justify-between gap-10">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-black/55">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Available for select commissions in 2026
                  </div>

                  <div className="space-y-5">
                    <p className="text-sm uppercase tracking-[0.36em] text-black/40">Geometric elegance / fluid transitions</p>
                    <h1 className="max-w-3xl text-5xl font-semibold leading-none tracking-[-0.07em] text-balance text-neutral-950 sm:text-6xl lg:text-[7rem]">
                      Motion systems that feel quiet, premium, and alive.
                    </h1>
                    <p className="max-w-xl text-base leading-7 text-black/60 sm:text-lg">
                      I design motion identities, title sequences, and brand films with Swiss restraint, sculptural geometry, and immersive movement.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <MagnetButton href="#work" variant="filled" onCursor={updateCursor}>
                    View selected work
                  </MagnetButton>
                  <MagnetButton href="#contact" variant="outline" onCursor={updateCursor}>
                    Start a project
                  </MagnetButton>
                </div>

                <div className="grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-3">
                  {[
                    ["12", "Feature projects"],
                    ["07", "Years designing motion"],
                    ["03", "Disciplines: 2D / 3D / Editorial"],
                  ].map(([value, label]) => (
                    <div key={label} className="space-y-1">
                      <p className="text-3xl font-semibold tracking-[-0.06em]">{value}</p>
                      <p className="text-xs uppercase tracking-[0.26em] text-black/45">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-10 top-8 hidden h-44 w-44 overflow-hidden rounded-full border border-white/40 bg-neutral-950 shadow-[0_20px_70px_rgba(0,0,0,0.18)] lg:block">
                  <video
                    className="h-full w-full object-cover"
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>

                <div
                  className="group relative overflow-hidden rounded-[2.2rem] bg-neutral-950"
                  onMouseEnter={() => updateCursor("Play", 110)}
                  onMouseLeave={() => updateCursor("", 18)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <video
                    className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />

                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-6 top-6 flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-950 transition-transform duration-300 group-hover:scale-110">
                        <svg className="ml-0.5 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 6v12l10-6z" />
                        </svg>
                      </span>
                      <div className="text-white">
                        <p className="text-[10px] uppercase tracking-[0.34em] text-white/60">Featured reel</p>
                        <p className="text-sm font-medium">2026 showreel / 01:24</p>
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.34em] text-white/55">Current highlight</p>
                        <h2 className="mt-2 max-w-md text-3xl font-semibold tracking-[-0.05em]">A cinematic montage of brand worlds, tactile type, and rhythmic shape systems.</h2>
                      </div>
                      <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/75 backdrop-blur-md">
                        Hover-aware / motion-first UI
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="work"
            className="rounded-[2.5rem] border border-black/10 bg-[#f7f4ef]/90 px-6 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.04)] sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          >
            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.34em] text-black/45">Selected work</p>
                <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">Hover-to-play case studies with a sober, spacious rhythm.</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-black/55 sm:text-base">
                Every project balances a rigorous grid with soft geometric interruptions—circular crops, floating controls, and transitions that feel edited rather than merely animated.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.title}
                  onMouseEnter={() => updateCursor("View", 102)}
                  onMouseLeave={() => updateCursor("", 18)}
                  className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_18px_70px_rgba(0,0,0,0.05)]"
                >
                  <div className="relative overflow-hidden">
                    <img src={project.poster} alt={project.title} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <video
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20 mix-blend-screen transition-opacity duration-500 group-hover:opacity-35`} />
                    <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur-md">
                      {project.type}
                    </div>
                    <div className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-5 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.32em] text-black/40">{project.client}</p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em]">{project.title}</h3>
                      </div>
                      <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-black/45">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-sm leading-7 text-black/60">{project.blurb}</p>
                    <dl className="grid gap-3 border-t border-black/10 pt-5 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.28em] text-black/40">Type</dt>
                        <dd className="mt-1 text-black/70">{project.type}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.28em] text-black/40">Role</dt>
                        <dd className="mt-1 text-black/70">{project.role}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="process"
            className="rounded-[2.5rem] border border-black/10 bg-white/80 px-6 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.04)] sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          >
            <div className="mb-10 max-w-3xl space-y-4">
              <p className="text-sm uppercase tracking-[0.34em] text-black/45">Inside the process</p>
              <h2 className="text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">Show how the thinking works, not just the final render.</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)]">
              <aside className="h-fit rounded-[2rem] border border-black/10 bg-[#f7f4ef] p-6 lg:sticky lg:top-28">
                <div className="space-y-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.32em] text-black/40">Project metadata</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em]">Nova Signals launch film</h3>
                  </div>

                  <dl className="space-y-4 border-y border-black/10 py-5 text-sm">
                    {[
                      ["Client", "Aether Systems"],
                      ["Year", "2024"],
                      ["Type", "Brand film + campaign cutdowns"],
                      ["Role", "Direction, design system, animation, edit"],
                    ].map(([label, value]) => (
                      <div key={label} className="space-y-1">
                        <dt className="text-[10px] uppercase tracking-[0.28em] text-black/40">{label}</dt>
                        <dd className="text-black/70">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="text-sm leading-7 text-black/60">
                    The system started as a strict square grid, then softened into circular reveals to express signal flow, stability, and energy.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs uppercase tracking-[0.28em] text-black/55">
                    <div className="rounded-2xl border border-black/10 bg-white px-4 py-4">
                      <p className="text-2xl font-semibold tracking-[-0.06em] text-black">42</p>
                      Frames explored
                    </div>
                    <div className="rounded-2xl border border-black/10 bg-white px-4 py-4">
                      <p className="text-2xl font-semibold tracking-[-0.06em] text-black">05</p>
                      Weeks from pitch to final
                    </div>
                  </div>
                </div>
              </aside>

              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      title: "Styleframe 01",
                      note: "Hero typography anchored to a modular grid with restrained accent color.",
                      image:
                        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
                    },
                    {
                      title: "Styleframe 02",
                      note: "A circular crop interrupts the system to spotlight the product demo.",
                      image:
                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
                    },
                  ].map((frame) => (
                    <article key={frame.title} className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#faf8f4]">
                      <img src={frame.image} alt={frame.title} className="aspect-[4/3] w-full object-cover" />
                      <div className="space-y-2 p-5">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-black/40">Styleframe</p>
                        <h4 className="text-xl font-semibold tracking-[-0.04em]">{frame.title}</h4>
                        <p className="text-sm leading-7 text-black/60">{frame.note}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <article
                  className="group overflow-hidden rounded-[2rem] border border-black/10 bg-neutral-950"
                  onMouseEnter={() => updateCursor("Play", 108)}
                  onMouseLeave={() => updateCursor("", 18)}
                >
                  <div className="relative">
                    <video
                      className="aspect-[16/9] w-full object-cover"
                      src="https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-white backdrop-blur-md">
                      Full-bleed motion pass
                    </div>
                    <div className="absolute bottom-6 left-6 max-w-xl text-white">
                      <h4 className="text-3xl font-semibold tracking-[-0.05em]">Timing, contrast, and hierarchy tuned directly in motion.</h4>
                      <p className="mt-3 text-sm leading-7 text-white/70">
                        A live animation pass reveals where the pauses belong, which transitions should breathe, and how each scene inherits the grid without feeling rigid.
                      </p>
                    </div>
                  </div>
                </article>

                <div className="grid gap-6 md:grid-cols-2">
                  <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#f7f4ef] p-6">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-black/40">Sketches / notes</p>
                    <h4 className="mt-3 text-2xl font-semibold tracking-[-0.05em]">Early composition thinking</h4>
                    <p className="mt-3 text-sm leading-7 text-black/60">
                      Quick grayscale boards clarify pacing before color arrives. The best frames often begin as brutally simple diagrams.
                    </p>
                    <ul className="mt-5 space-y-3 text-sm text-black/60">
                      {[
                        "Start with one dominant shape, then break it with scale.",
                        "Reserve accent color for emotional peaks.",
                        "Use whitespace as timing, not decoration.",
                      ].map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>

                  <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80"
                      alt="Behind the scenes sketchbook"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="p-5">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-black/40">Behind the scenes</p>
                      <p className="mt-2 text-sm leading-7 text-black/60">
                        Storyboards, timing marks, and rough camera notes are kept visible throughout production so the final piece stays rooted in a clear narrative system.
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section id="about" className="overflow-hidden rounded-[2.5rem] bg-neutral-950 px-6 py-8 text-stone-100 shadow-[0_24px_100px_rgba(0,0,0,0.18)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.34em] text-white/45">About / philosophy</p>
                <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                  “Restraint makes the image louder.”
                </h2>
                <p className="max-w-2xl text-base leading-8 text-white/68">
                  I build motion identities for brands, films, and digital products that want clarity without coldness. The work leans on grids, generous spacing, elegant type, and transitions that feel physically believable.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Focus", "Motion branding, launch films, editorial systems"],
                  ["Approach", "Research-led, styleframe-first, edit-aware animation"],
                  ["Tools", "After Effects, Cinema 4D, Figma, Premiere"],
                  ["Vibe", "Swiss structure softened by cinematic movement"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">{label}</p>
                    <p className="mt-3 text-sm leading-7 text-white/72">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="play"
            className="rounded-[2.5rem] border border-black/10 bg-[#f7f4ef]/90 px-6 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.04)] sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          >
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.34em] text-black/45">Play / lab</p>
                <h2 className="text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">A sandbox for loops, freebies, fragments, and daily renders.</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-black/55 sm:text-base">
                This space stays intentionally looser than the case studies—a place to test rigs, color systems, sound-reactive shapes, and motion ideas before they become client work.
              </p>
            </div>

            <div className="grid auto-rows-[180px] gap-6 md:grid-cols-3 xl:grid-cols-4">
              {experiments.map((experiment) => (
                <article
                  key={experiment.title}
                  onMouseEnter={() => updateCursor("Play", 102)}
                  onMouseLeave={() => updateCursor("", 18)}
                  className={`group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.04)] ${experiment.className}`}
                >
                  {experiment.video ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={experiment.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : experiment.image ? (
                    <img
                      src={experiment.image}
                      alt={experiment.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-white backdrop-blur-md">
                    {experiment.format}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <h3 className="text-2xl font-semibold tracking-[-0.05em]">{experiment.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">{experiment.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="contact"
            className="overflow-hidden rounded-[2.5rem] border border-black/10 bg-white/85 px-6 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.04)] backdrop-blur-sm sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.34em] text-black/45">Contact</p>
                <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                  Have a launch, title sequence, or brand world that needs movement?
                </h2>
                <a
                  href="mailto:hello@ateliermotion.studio"
                  onMouseEnter={() => updateCursor("Email", 108)}
                  onMouseLeave={() => updateCursor("", 18)}
                  className="inline-block text-2xl font-semibold tracking-[-0.05em] underline decoration-black/20 underline-offset-8 transition-colors duration-200 hover:text-black/65 sm:text-3xl"
                >
                  hello@ateliermotion.studio
                </a>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.28em] text-black/55">
                  {[
                    ["Instagram", "https://instagram.com"],
                    ["Vimeo", "https://vimeo.com"],
                    ["Behance", "https://behance.net"],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => updateCursor(label, 104)}
                      onMouseLeave={() => updateCursor("", 18)}
                      className="rounded-full border border-black/10 px-4 py-3 transition-colors duration-200 hover:bg-black hover:text-white"
                    >
                      {label}
                    </a>
                  ))}
                </div>
                <p className="max-w-md text-sm leading-7 text-black/55">
                  Based remotely and open to collaborations with studios, founders, and filmmakers who value clarity, pacing, and precise visual systems.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
