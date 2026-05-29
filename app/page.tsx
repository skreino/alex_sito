"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Lang = "it" | "en";
type Category = "all" | "chicano" | "lettering" | "blackwork" | "realism";

const whatsapp = "https://wa.me/393429966237";
const maps =
  "https://www.google.com/maps/search/?api=1&query=Via+Giosu%C3%A8+Carducci+85+20874+Busnago+MB";
const logo = "/images/brand/alex-rox-logo.png";

const tattoos = Array.from({ length: 19 }, (_, i) => ({
  src: `/images/tattoos/tattoo (${i + 1}).jpeg`,
  alt: `ALEX ROX tattoo work ${i + 1}`,
  category: (["chicano", "lettering", "blackwork", "realism"] as Category[])[i % 4]
}));

const dictionary = {
  it: {
    nav: {
      work: "Lavori",
      styles: "Stili",
      studio: "Studio",
      booking: "Prenota",
      contact: "Contatti",
      cta: "Prenota un tatuaggio",
      open: "Apri menu",
      close: "Chiudi menu"
    },
    hero: {
      label: "Busnago MB / cultura black and grey",
      headline: "CHICANO SOUL. BLACK INK. REAL STORIES.",
      copy: "Tatuaggi custom costruiti intorno a identita, stile e significato. Black and grey, lettering e lavori di ispirazione chicano.",
      whatsapp: "Prenota su WhatsApp",
      work: "Guarda i lavori",
      marquee: "CHICANO / LETTERING / BLACKWORK / REALISMO / TATUAGGI CUSTOM"
    },
    intro: {
      label: "Dietro il segno",
      title: "Non solo inchiostro. Un segno con peso.",
      copy: "Ogni tatuaggio parte da una storia. Dal lettering al blackwork, ogni pezzo nasce con contrasto, precisione e personalita.",
      details: ["Disegni custom", "Appuntamenti privati", "Studio pulito", "Specialista black and grey"],
      note: "sessioni private / lavori custom"
    },
    styles: {
      label: "Stili",
      title: "Linguaggi d'inchiostro",
      copy: "Quattro direzioni visive, una sola disciplina black and grey: contrasto, dettaglio e presenza.",
      cards: [
        ["Chicano", "Peso culturale, ritmo del lettering e contrasti black and grey disegnati sul corpo."],
        ["Lettering", "Lettere custom con flow forte, spazi negativi netti e lettura pulita."],
        ["Blackwork", "Inchiostro pieno, bordi decisi e struttura grafica pensata per durare."],
        ["Realismo", "Ritratti, rose e simboli con sfumature morbide e ombre cinematografiche."]
      ]
    },
    work: {
      label: "Portfolio",
      title: "Lavori selezionati",
      copy: "Black and grey, chicano, lettering e pezzi custom.",
      open: "Apri immagine tatuaggio",
      previous: "Tatuaggio precedente",
      next: "Tatuaggio successivo",
      close: "Chiudi lightbox"
    },
    gallery: {
      title: "Galleria",
      categories: {
        all: "Tutti",
        chicano: "Chicano",
        lettering: "Lettering",
        blackwork: "Blackwork",
        realism: "Realismo"
      }
    },
    process: {
      title: "Idea. Disegno. Pelle.",
      steps: [
        ["Consulenza", "Manda idea, reference, misura e zona del corpo."],
        ["Disegno", "Il concetto diventa un disegno custom."],
        ["Sessione", "Setup pulito, mano precisa, esperienza calma."],
        ["Cura", "Indicazioni chiare per guarire bene."]
      ]
    },
    booking: {
      label: "Prenotazioni",
      title: "PRONTO PER IL PROSSIMO PEZZO?",
      copy: "Invia reference, posizione preferita e idea del tatuaggio direttamente su WhatsApp.",
      whatsapp: "Prenota su WhatsApp",
      maps: "Apri su Google Maps",
      note: "Risposta di solito entro 24/48h."
    },
    testimonials: {
      title: "Parole",
      label: "note dai clienti",
      quotes: [
        "Linee pulite, sessione tranquilla e lo stile era esattamente quello che volevo.",
        "Il lettering e uscito ancora meglio della reference.",
        "Professionale, preciso e sincero dal primo messaggio."
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        ["Come prenoto?", "Manda idea, reference, misura e posizione su WhatsApp. Riceverai indicazioni su tempi, caparra e prossimi passi."],
        ["Crei disegni custom?", "Si. Ogni pezzo viene adattato al corpo, alla storia, alla scala e alla direzione visiva."],
        ["Quanto costa un tatuaggio?", "Dipende da dimensione, posizione, dettaglio e tempo di sessione. Manda reference chiare per un preventivo preciso."],
        ["Posso portare reference?", "Si. Le reference aiutano a definire mood, soggetto, lettering e contrasto."],
        ["Come mi preparo?", "Dormi bene, mangia prima dell'appuntamento, idratati ed evita alcol prima della sessione."],
        ["Come curo il tatuaggio?", "Dopo la sessione riceverai indicazioni dirette per pulizia, guarigione e protezione del pezzo."]
      ]
    },
    footer: {
      title: "INK YOUR STORY",
      credits: "ALEX ROX / cultura tattoo black and grey / sito custom creative build"
    }
  },
  en: {
    nav: {
      work: "Work",
      styles: "Styles",
      studio: "Studio",
      booking: "Booking",
      contact: "Contact",
      cta: "Book a Tattoo",
      open: "Open menu",
      close: "Close menu"
    },
    hero: {
      label: "Busnago MB / Black & Grey Tattoo Culture",
      headline: "CHICANO SOUL. BLACK INK. REAL STORIES.",
      copy: "Custom tattoos built around identity, style and meaning. Black and grey, lettering and chicano-inspired work.",
      whatsapp: "Book on WhatsApp",
      work: "View Work",
      marquee: "CHICANO / LETTERING / BLACKWORK / REALISM / CUSTOM TATTOOS"
    },
    intro: {
      label: "The Work Behind The Mark",
      title: "Not just ink. A mark with meaning.",
      copy: "Every tattoo starts from a story. From lettering to blackwork, each piece is designed with contrast, precision and personality.",
      details: ["Custom designs", "Private appointments", "Clean studio", "Black & grey specialist"],
      note: "private sessions / custom work"
    },
    styles: {
      label: "Styles",
      title: "Ink Dialects",
      copy: "Four visual languages, one black and grey discipline: contrast, detail and presence.",
      cards: [
        ["Chicano", "Cultural weight, script rhythm and black and grey contrast shaped around the body."],
        ["Lettering", "Custom letters with heavy flow, sharp negative space and disciplined readability."],
        ["Blackwork", "Dense ink, hard edges and graphic structure built to hold power over time."],
        ["Realism", "Portraits, roses and symbolic pieces with smooth gradients and cinematic shadow."]
      ]
    },
    work: {
      label: "Portfolio",
      title: "Selected Works",
      copy: "Black and grey, chicano, lettering and custom pieces.",
      open: "Open tattoo image",
      previous: "Previous tattoo",
      next: "Next tattoo",
      close: "Close lightbox"
    },
    gallery: {
      title: "Gallery",
      categories: {
        all: "All",
        chicano: "Chicano",
        lettering: "Lettering",
        blackwork: "Blackwork",
        realism: "Realism"
      }
    },
    process: {
      title: "From idea to skin",
      steps: [
        ["Consultation", "Send your idea, references, size and placement."],
        ["Design", "The concept becomes a custom tattoo design."],
        ["Session", "Clean setup, precise work, calm experience."],
        ["Aftercare", "Clear instructions to heal properly."]
      ]
    },
    booking: {
      label: "Booking",
      title: "READY FOR YOUR NEXT PIECE?",
      copy: "Send your references, preferred placement and tattoo idea directly on WhatsApp.",
      whatsapp: "Book on WhatsApp",
      maps: "Open in Google Maps",
      note: "Replies usually within 24/48h."
    },
    testimonials: {
      title: "Words",
      label: "client notes",
      quotes: [
        "Clean lines, calm session and exactly the style I wanted.",
        "The lettering came out even better than the reference.",
        "Professional, precise and honest from the first message."
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        ["How do I book?", "Send your idea, references, size and placement on WhatsApp. You will receive guidance on timing, deposit and next steps."],
        ["Do you create custom designs?", "Yes. Every piece is adapted around the body, story, scale and visual direction."],
        ["How much does a tattoo cost?", "Price depends on size, placement, detail and session time. Send clear references for an accurate quote."],
        ["Can I bring references?", "Yes. References help define mood, subject, lettering direction and contrast."],
        ["How should I prepare?", "Sleep well, eat before the appointment, hydrate and avoid alcohol before the session."],
        ["How do I take care of the tattoo?", "You will receive direct aftercare instructions after the session for cleaning, healing and protecting the piece."]
      ]
    },
    footer: {
      title: "INK YOUR STORY",
      credits: "ALEX ROX / Premium black and grey tattoo culture / Site credits: custom creative build"
    }
  }
};

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BrandLogo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={logo}
      alt="ALEX ROX chicano calligraphy logo"
      width={900}
      height={520}
      priority={priority}
      className={`object-contain mix-blend-screen ${className}`}
    />
  );
}

function LogoWatermark({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`pointer-events-none absolute right-[-7vw] top-8 z-0 hidden w-[42vw] max-w-[620px] opacity-[0.055] lg:block ${dark ? "invert mix-blend-multiply" : "mix-blend-screen"}`}>
      <BrandLogo />
    </div>
  );
}

function LanguageSwitcher({ lang, setLang, dark = false }: { lang: Lang; setLang: (lang: Lang) => void; dark?: boolean }) {
  return (
    <div className={`flex items-center border text-[11px] font-black uppercase tracking-[0.2em] ${dark ? "border-blackdeep/25" : "border-paper/20"}`}>
      {(["it", "en"] as Lang[]).map((item) => (
        <button
          key={item}
          onClick={() => setLang(item)}
          className={`px-3 py-2 transition ${lang === item ? (dark ? "bg-blackdeep text-paper" : "bg-paper text-blackdeep") : dark ? "text-blackdeep/55 hover:text-blackdeep" : "text-warm hover:text-paper"}`}
          aria-pressed={lang === item}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Nav({ lang, setLang, t }: { lang: Lang; setLang: (lang: Lang) => void; t: typeof dictionary.it }) {
  const [open, setOpen] = useState(false);
  const items = [
    [t.nav.work, "work"],
    [t.nav.styles, "styles"],
    [t.nav.studio, "studio"],
    [t.nav.booking, "booking"],
    [t.nav.contact, "contact"]
  ];

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-paper/10 bg-blackdeep/78 px-4 py-3 backdrop-blur-md md:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5">
          <a href="#home" className="block h-14 w-40 shrink-0 md:h-16 md:w-52" aria-label="ALEX ROX home">
            <BrandLogo priority className="h-full w-full" />
          </a>
          <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.22em] text-warm lg:flex">
            {items.map(([item, id]) => (
              <a key={id} href={`#${id}`} className="transition hover:text-paper">
                {item}
              </a>
            ))}
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <a href={whatsapp} className="rough-border bg-paper px-5 py-3 font-bold text-blackdeep transition hover:bg-warm">
              {t.nav.cta}
            </a>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <button
              className="rough-border grid h-11 w-11 place-items-center"
              onClick={() => setOpen(true)}
              aria-label={t.nav.open}
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] bg-paper px-5 py-5 text-blackdeep"
          >
            <div className="flex items-center justify-between gap-4">
            <div className="h-20 w-56 invert">
                <BrandLogo className="h-full w-full" />
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher lang={lang} setLang={setLang} dark />
                <button className="grid h-11 w-11 place-items-center border border-blackdeep/30" onClick={() => setOpen(false)} aria-label={t.nav.close}>
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="mt-16 flex flex-col gap-3">
              {items.map(([item, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="display border-b border-blackdeep/20 py-4 text-[17vw]">
                  {item}
                </a>
              ))}
              <a href={whatsapp} className="mt-8 inline-flex items-center justify-center gap-3 bg-blackdeep px-6 py-5 text-sm font-bold uppercase tracking-[0.2em] text-paper">
                <MessageCircle size={18} /> {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero({ t, lang }: { t: typeof dictionary.it; lang: Lang }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);
  return (
    <section id="home" className="grain relative min-h-screen overflow-hidden pt-24">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image src={tattoos[0].src} alt="Chicano leg tattoo by ALEX ROX" fill priority sizes="100vw" className="object-cover opacity-52 grayscale" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,.84)_34%,rgba(5,5,5,.3)_100%)]" />
      </motion.div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1500px] flex-col justify-end px-4 pb-20 md:px-8">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} className="mb-8 h-36 w-80 md:h-48 md:w-[620px]">
          <BrandLogo priority className="h-full w-full" />
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <p className="mb-5 text-xs uppercase tracking-[0.38em] text-warm">{t.hero.label}</p>
            <h1 className="display max-w-6xl text-[18vw] text-paper md:text-[12vw] xl:text-[10rem]">{t.hero.headline}</h1>
            <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,560px)_auto]">
              <p className="max-w-xl text-lg leading-relaxed text-warm md:text-2xl">{t.hero.copy}</p>
              <div className="flex flex-wrap items-start gap-3">
                <a href={whatsapp} className="inline-flex items-center gap-3 bg-paper px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-blackdeep transition hover:bg-warm">
                  <MessageCircle size={18} /> {t.hero.whatsapp}
                </a>
                <a href="#work" className="rough-border px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-paper transition hover:bg-paper hover:text-blackdeep">
                  {t.hero.work}
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative z-10 border-y border-paper/15 bg-blackdeep/70 py-4">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="display flex w-max gap-8 whitespace-nowrap text-4xl text-paper/90 md:text-6xl">
          <span>{t.hero.marquee} / </span>
          <span>{t.hero.marquee} / </span>
        </motion.div>
      </div>
    </section>
  );
}

function Intro({ t }: { t: typeof dictionary.it }) {
  return (
    <section id="studio" className="relative overflow-hidden bg-paper text-blackdeep torn-top">
      <LogoWatermark dark />
      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-12 px-4 py-24 md:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-36">
        <Reveal>
          <p className="mb-5 text-xs uppercase tracking-[0.32em] text-blackdeep/55">{t.intro.label}</p>
          <h2 className="display max-w-4xl text-[16vw] md:text-[7.8rem]">{t.intro.title}</h2>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-blackdeep/70 md:text-2xl">{t.intro.copy}</p>
          <div className="mt-10 grid grid-cols-2 border-y border-blackdeep/20">
            {t.intro.details.map((item) => (
              <div key={item} className="border-b border-r border-blackdeep/20 p-4 text-xs font-black uppercase tracking-[0.18em] last:border-r-0 md:p-6">
                {item}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="relative min-h-[520px] overflow-hidden bg-blackdeep">
          <Image src={tattoos[18].src} alt="Tattoo artist studio work" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover grayscale transition duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-blackdeep/20" />
          <span className="absolute bottom-5 left-5 accent text-3xl text-paper">{t.intro.note}</span>
        </Reveal>
      </div>
    </section>
  );
}

function Styles({ t }: { t: typeof dictionary.it }) {
  const cards = t.styles.cards.map(([name, text], i) => ({
    no: String(i + 1).padStart(2, "0"),
    name,
    text,
    img: [tattoos[0].src, tattoos[10].src, tattoos[8].src, tattoos[13].src][i]
  }));

  return (
    <section id="styles" className="relative mx-auto max-w-[1500px] overflow-hidden px-4 py-24 md:px-8 lg:py-36">
      <LogoWatermark />
      <Reveal className="relative z-10 mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.32em] text-warm">{t.styles.label}</p>
          <h2 className="display text-[17vw] md:text-8xl">{t.styles.title}</h2>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-warm">{t.styles.copy}</p>
      </Reveal>
      <div className="relative z-10 grid gap-4 lg:grid-cols-4">
        {cards.map((style) => (
          <motion.article key={style.name} whileHover="hover" className="rough-border group relative min-h-[440px] overflow-hidden bg-ink p-5">
            <motion.div variants={{ hover: { opacity: 0.7, scale: 1.06 } }} className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-70">
              <Image src={style.img} alt={style.name} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover grayscale" />
            </motion.div>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <span className="display text-8xl text-paper/20">{style.no}</span>
              <div>
                <h3 className="display text-6xl">{style.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-warm">{style.text}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function TattooSlider({ t }: { t: typeof dictionary.it }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const active = tattoos[index];
  const prev = tattoos[(index - 1 + tattoos.length) % tattoos.length];
  const next = tattoos[(index + 1) % tattoos.length];
  const go = (dir: number) => setIndex((current) => (current + dir + tattoos.length) % tattoos.length);

  useEffect(() => {
    if (paused || lightbox) return;
    const id = window.setInterval(() => go(1), 5200);
    return () => window.clearInterval(id);
  }, [paused, lightbox]);

  return (
    <section id="work" className="border-y border-paper/10 bg-[#090909] py-24 lg:py-36">
      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        <Reveal className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-warm">{t.work.label}</p>
            <h2 className="display text-[18vw] md:text-9xl">{t.work.title}</h2>
          </div>
          <p className="max-w-md text-lg text-warm">{t.work.copy}</p>
        </Reveal>
        <div className="grain relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="grid items-center gap-5 lg:grid-cols-[.5fr_1.3fr_.5fr]">
            {[prev, active, next].map((item, itemIndex) => (
              <motion.button
                key={`${item.src}-${itemIndex}-${index}`}
                drag={itemIndex === 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  if (info.offset.x > 60) go(-1);
                }}
                onClick={() => (itemIndex === 1 ? setLightbox(true) : setIndex(tattoos.findIndex((tattoo) => tattoo.src === item.src)))}
                initial={{ opacity: 0, scale: itemIndex === 1 ? 0.96 : 0.9 }}
                animate={{ opacity: itemIndex === 1 ? 1 : 0.48, scale: 1 }}
                className={`relative w-full overflow-hidden bg-ink ${itemIndex === 1 ? "h-[70vh] min-h-[520px]" : "hidden h-[48vh] min-h-[360px] lg:block"}`}
                aria-label={t.work.open}
              >
                <motion.div animate={itemIndex === 1 ? { scale: [1, 1.045, 1] } : {}} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0">
                  <Image src={item.src} alt={item.alt} fill sizes={itemIndex === 1 ? "80vw" : "25vw"} className="object-cover grayscale" priority={itemIndex === 1} />
                </motion.div>
              </motion.button>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="display text-4xl text-paper">{String(index + 1).padStart(2, "0")} / {tattoos.length}</span>
            <div className="hidden gap-2 md:flex">
              <button onClick={() => go(-1)} className="rough-border grid h-12 w-12 place-items-center transition hover:bg-paper hover:text-blackdeep" aria-label={t.work.previous}>
                <ArrowLeft size={18} />
              </button>
              <button onClick={() => go(1)} className="rough-border grid h-12 w-12 place-items-center transition hover:bg-paper hover:text-blackdeep" aria-label={t.work.next}>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] grid place-items-center bg-blackdeep/95 p-4">
            <button onClick={() => setLightbox(false)} className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center border border-paper/30" aria-label={t.work.close}>
              <X />
            </button>
            <Image src={active.src} alt={active.alt} width={1400} height={1800} className="max-h-[92vh] w-auto object-contain grayscale" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Gallery({ t }: { t: typeof dictionary.it }) {
  const [filter, setFilter] = useState<Category>("all");
  const categories: Category[] = ["all", "chicano", "lettering", "blackwork", "realism"];
  const visible = useMemo(() => (filter === "all" ? tattoos : tattoos.filter((item) => item.category === filter)), [filter]);
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-24 md:px-8 lg:py-36">
      <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="display text-[18vw] md:text-9xl">{t.gallery.title}</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((category) => (
            <button key={category} onClick={() => setFilter(category)} className={`border px-4 py-3 text-xs font-black uppercase tracking-[0.18em] transition ${filter === category ? "border-paper bg-paper text-blackdeep" : "border-paper/20 text-warm hover:text-paper"}`}>
              {t.gallery.categories[category]}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="masonry">
        {visible.map((item, i) => (
          <Reveal key={item.src} className="masonry-item">
            <div className="group relative overflow-hidden bg-ink">
              <Image src={item.src} alt={item.alt} width={900} height={i % 3 === 0 ? 1200 : 1000} loading="lazy" className="h-auto w-full grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-blackdeep/10 transition group-hover:bg-transparent" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Process({ t }: { t: typeof dictionary.it }) {
  return (
    <section className="relative overflow-hidden bg-paper py-24 text-blackdeep lg:py-32">
      <LogoWatermark dark />
      <div className="relative z-10 mx-auto max-w-[1500px] px-4 md:px-8">
        <Reveal className="mb-12">
          <h2 className="display text-[17vw] md:text-9xl">{t.process.title}</h2>
        </Reveal>
        <div className="grid border-l border-t border-blackdeep/25 md:grid-cols-4">
          {t.process.steps.map(([title, text], i) => (
            <Reveal key={title} className="min-h-[260px] border-b border-r border-blackdeep/25 p-6 md:p-8">
              <span className="display text-7xl text-blackdeep/20">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-10 text-4xl">{title}</h3>
              <p className="mt-5 text-blackdeep/65">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking({ t }: { t: typeof dictionary.it }) {
  return (
    <section id="booking" className="grain relative overflow-hidden bg-blackdeep py-24 lg:py-36">
      <LogoWatermark />
      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-10 px-4 md:px-8 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.32em] text-warm">{t.booking.label}</p>
          <h2 className="display text-[18vw] md:text-9xl">{t.booking.title}</h2>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-warm">{t.booking.copy}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsapp} className="inline-flex items-center gap-3 bg-paper px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-blackdeep">
              <MessageCircle size={18} /> {t.booking.whatsapp}
            </a>
            <a href={maps} className="rough-border inline-flex items-center gap-3 px-6 py-4 text-sm font-black uppercase tracking-[0.18em]">
              {t.booking.maps} <ExternalLink size={17} />
            </a>
          </div>
          <p className="mt-7 text-sm uppercase tracking-[0.22em] text-warm">{t.booking.note}</p>
          <address className="mt-10 max-w-sm not-italic text-lg text-paper">
            Via Giosue Carducci, 85, 20874 Busnago MB, Italy<br />
            +39 342 996 6237
          </address>
        </Reveal>
        <Reveal className="min-h-[420px] overflow-hidden border border-paper/15 bg-ink">
          <iframe
            title="ALEX ROX studio location"
            src="https://www.google.com/maps?q=Via%20Giosu%C3%A8%20Carducci%2085%2020874%20Busnago%20MB&output=embed"
            className="h-full min-h-[420px] w-full grayscale invert"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}

function TestimonialsFaqFooter({ t }: { t: typeof dictionary.it }) {
  return (
    <>
      <section className="border-y border-paper/10 bg-ink py-20">
        <div className="mx-auto max-w-[1500px] px-4 md:px-8">
          <div className="mb-8 flex items-center justify-between gap-6">
            <h2 className="display text-6xl md:text-8xl">{t.testimonials.title}</h2>
            <span className="accent text-2xl text-warm">{t.testimonials.label}</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none">
            {t.testimonials.quotes.map((quote, i) => (
              <article key={quote} className="rough-border min-w-[82vw] bg-blackdeep p-7 sm:min-w-[420px]">
                <span className="display text-6xl text-paper/15">0{i + 1}</span>
                <p className="mt-14 text-2xl leading-tight text-paper">"{quote}"</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1100px] px-4 py-24 md:px-8 lg:py-32">
        <Reveal>
          <h2 className="display mb-10 text-[17vw] md:text-8xl">{t.faq.title}</h2>
        </Reveal>
        <div className="divide-y divide-paper/15 border-y border-paper/15">
          {t.faq.items.map(([q, a]) => (
            <details key={q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-xl font-black uppercase tracking-[0.08em]">
                {q}
                <span className="display text-4xl transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl leading-relaxed text-warm">{a}</p>
            </details>
          ))}
        </div>
      </section>
      <footer id="contact" className="relative overflow-hidden bg-paper px-4 py-12 text-blackdeep md:px-8">
        <div className="absolute bottom-[-5rem] right-[-4rem] hidden w-[44vw] max-w-[680px] opacity-[0.08] invert lg:block">
          <BrandLogo />
        </div>
        <div className="relative z-10 mx-auto max-w-[1500px]">
          <div className="mb-8 h-40 w-80 invert md:h-56 md:w-[760px]">
            <BrandLogo />
          </div>
          <h2 className="display text-[18vw] md:text-[12vw]">{t.footer.title}</h2>
          <div className="mt-10 grid gap-8 border-t border-blackdeep/20 pt-8 text-sm uppercase tracking-[0.18em] md:grid-cols-4">
            <a href="#" className="font-black">Instagram</a>
            <a href={whatsapp} className="font-black">WhatsApp</a>
            <a href="mailto:booking@alexrox.tattoo" className="font-black">booking@alexrox.tattoo</a>
            <p>Via Giosue Carducci, 85<br />20874 Busnago MB, Italy</p>
          </div>
          <p className="mt-12 text-xs uppercase tracking-[0.2em] text-blackdeep/50">{t.footer.credits}</p>
        </div>
      </footer>
    </>
  );
}

export default function Page() {
  const [lang, setLangState] = useState<Lang>("it");
  const t = dictionary[lang];

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    window.localStorage.setItem("alex-rox-lang", nextLang);
    document.documentElement.lang = nextLang;
  };

  useEffect(() => {
    const saved = window.localStorage.getItem("alex-rox-lang");
    const initial = saved === "en" || saved === "it" ? saved : "it";
    setLangState(initial);
    document.documentElement.lang = initial;
  }, []);

  return (
    <main>
      <Nav lang={lang} setLang={setLang} t={t} />
      <motion.div key={lang} initial={{ opacity: 0.94 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
        <Hero t={t} lang={lang} />
        <Intro t={t} />
        <Styles t={t} />
        <TattooSlider t={t} />
        <Gallery t={t} />
        <Process t={t} />
        <Booking t={t} />
        <TestimonialsFaqFooter t={t} />
      </motion.div>
    </main>
  );
}
