import { MotionConfig, motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { Wordmark } from './components/Wordmark'
import { MaskLine, Reveal } from './components/motion'
import { ease } from './components/ease'
import { Arcs, Arrow, Asterisk } from './components/icons'
import { MenuSection } from './components/MenuSection'
import { gutter, t } from './components/tokens'

const SITE = 'https://greenneko.com'
const MAPS_HUMAYUNPUR = 'https://www.google.com/maps?cid=12885760419563065778'
const MAPS_B6 = 'https://www.google.com/maps?cid=1185388794796302423'

const categories = [
  {
    n: '01', title: 'Ramen', jp: 'ラーメン', kicker: 'Slow broth',
    desc: 'Rich Kotteri to light Shoyu, simmered six hours or more.',
    img: '/images/ramen-bowl.webp', alt: 'Shoyu ramen with chashu, soft eggs, naruto and nori',
  },
  {
    n: '02', title: 'Poke', jp: 'ポケ', kicker: 'Fresh bowls',
    desc: 'Sushi rice, bright vegetables and a protein of your choice.',
    img: '/images/poke-bowl.webp', alt: 'A poke bowl with chicken, avocado, carrot and red cabbage',
  },
  {
    n: '03', title: 'Boba', jp: 'バブルティー', kicker: 'Drinks',
    desc: '15+ flavours, organic fruit and handpicked pearls.',
    img: '/images/boba-trio.webp', alt: 'Four hands holding matcha, milk tea and fruit boba',
  },
  {
    n: '04', title: 'Small Plates', jp: '小皿', kicker: 'To share',
    desc: 'Gyoza, tempura and little bites for the table.',
    img: '/images/gyoza-fly.webp', alt: 'Gyoza tumbling through the air with chilli oil and sesame',
  },
]

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="mx-auto max-w-[1440px] overflow-x-clip bg-cream">
        <Hero />
        <About />
        <Story />
        <MenuSection />
        <Categories />
        <Gallery />
        <Footer />
      </main>
    </MotionConfig>
  )
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <header className={gutter}>
      <motion.nav
        className={`grid grid-cols-3 max-sm:grid-cols-[1fr_auto] items-center pt-[max(16px,calc(var(--u)*2.7))] ${t.nav} font-medium`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <ul className="flex justify-self-start gap-[max(24px,calc(var(--u)*5.4))]">
          {[
            ['About', '#about'],
            ['Menu', '#menu'],
            ['Contact', `${SITE}/contact.html`],
          ].map(([label, href]) => (
            <li key={label}>
              <a href={href} className="transition-colors hover:text-leaf">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <motion.a
          href="#"
          aria-label="Green Neko home"
          className="block size-[max(28px,calc(var(--u)*2.4))] justify-self-center max-sm:justify-self-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          whileHover={{ rotate: -8, scale: 1.06 }}
        >
          <img src="/images/logo-192.png" alt="" className="size-full" />
        </motion.a>
        <span className="justify-self-end text-ink/60 max-sm:hidden">Ramen · Poke · Boba — South Delhi</span>
      </motion.nav>

      <div className="mt-[max(20px,calc(var(--u)*3.6))]">
        <Wordmark />
      </div>

      <motion.div
        ref={ref}
        className="relative mt-[max(16px,calc(var(--u)*3.2))] aspect-[584/300] overflow-hidden max-md:aspect-[4/3]"
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.3, ease, delay: 0.45 }}
      >
        <motion.img
          src="/images/hero.webp"
          alt="The café counter, with Pick Up and Order & Pay Here signs"
          className="absolute inset-0 h-[115%] w-full object-cover"
          style={{ y: imgY }}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease, delay: 0.45 }}
        />
        <motion.a
          href={MAPS_HUMAYUNPUR}
          target="_blank"
          rel="noreferrer"
          className="group absolute bottom-[max(10px,calc(var(--u)*1.5))] right-[max(10px,calc(var(--u)*1.5))] flex items-center gap-[0.5em] bg-cream px-[1em] py-[0.55em] text-[max(11px,calc(var(--u)*1.5))] font-semibold leading-none text-ink"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.4 }}
          whileHover={{ backgroundColor: '#0f5a33', color: '#f7f1e7' }}
        >
          Visit Us
        </motion.a>
      </motion.div>
    </header>
  )
}

/* ───────────────────────── About ───────────────────────── */

function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <section ref={ref} id="about" className={`${gutter} pt-[max(24px,calc(var(--u)*3.8))] pb-[max(64px,calc(var(--u)*11))]`}>
      <div className="flex items-end justify-between">
        <Reveal>
          <h2 className={`${t.label} font-medium`}>About</h2>
        </Reveal>
        <Asterisk rotate={rotate} className="size-[max(44px,calc(var(--u)*7.8))] text-leaf" />
      </div>

      <p className={`mt-[max(32px,calc(var(--u)*8.5))] ${t.display} font-semibold`}>
        <MaskLine className="pl-[23%] max-md:pl-0">A cozy corner-</MaskLine>
        <MaskLine className="pl-[45%] max-md:pl-[18%]" delay={0.1}>
          for <span className="font-bold tracking-[-0.03em] text-leaf">good ramen</span>
        </MaskLine>
      </p>
    </section>
  )
}

/* ───────────────────────── Story (green split) ───────────────────────── */

function Story() {
  return (
    <section className="flex min-h-[max(320px,calc(var(--u)*47.6))] max-md:flex-col">
      <motion.div
        className="flex basis-[51.3%] flex-col justify-between bg-moss px-[max(16px,calc(var(--u)*3.4))] pt-[max(28px,calc(var(--u)*4.8))] pb-[max(24px,calc(var(--u)*4))] text-cream max-md:min-h-[340px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 1, ease }}
      >
        <h2 className="text-[max(20px,calc(var(--u)*2.9))] font-semibold leading-[1.3] tracking-[-0.01em]">
          <MaskLine delay={0.2}>Made with intention</MaskLine>
          <MaskLine delay={0.3} className="pl-[1.6em]">
            served with love
          </MaskLine>
        </h2>
        <Reveal delay={0.4} y={12}>
          <p className={`${t.small} max-w-[max(180px,calc(var(--u)*16))] text-cream/90`}>
            Every bowl we make is a quiet invitation to slow down. Broth simmered six hours or more, every
            single day.
          </p>
        </Reveal>
      </motion.div>

      <motion.div
        className="relative basis-[48.7%] overflow-hidden max-md:aspect-[4/3]"
        initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 1.3, ease, delay: 0.15 }}
      >
        <motion.img
          src="/images/matcha-pour.webp"
          alt="Matcha being poured over iced milk"
          className="absolute inset-0 size-full object-cover"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease, delay: 0.15 }}
        />
      </motion.div>
    </section>
  )
}

/* ───────────────────────── Categories ───────────────────────── */

function Categories() {
  return (
    <section id="categories" className="pt-[max(64px,calc(var(--u)*11))]">
      <div className={gutter}>
        <h2 className={`${t.display} mx-auto w-fit font-semibold`}>
          <MaskLine className="pl-[0.55em] max-md:pl-0">Ready to serve</MaskLine>
          <MaskLine delay={0.1}>
            you <span className="font-bold tracking-[-0.03em] text-leaf">something good.</span>
          </MaskLine>
        </h2>

        <Reveal className="mt-[max(32px,calc(var(--u)*7.4))]">
          <h3 className={`${t.label} font-medium`}>Category</h3>
        </Reveal>
      </div>

      {/* checkerboard: photo | panel | photo | panel, then flipped on the next row */}
      <ul className="mt-[max(12px,calc(var(--u)*2.2))] grid gap-y-[max(6px,calc(var(--u)*0.6))] md:grid-cols-2">
        {categories.map((c, i) => (
          <CategoryTile key={c.n} c={c} mobileFlip={i % 2 === 1} deskFlip={i >= 2} />
        ))}
      </ul>
    </section>
  )
}

function CategoryTile({
  c,
  mobileFlip,
  deskFlip,
}: {
  c: (typeof categories)[number]
  mobileFlip: boolean
  deskFlip: boolean
}) {
  const photoOrder = `${mobileFlip ? 'order-2' : 'order-1'} ${deskFlip ? 'md:order-2' : 'md:order-1'}`
  const panelOrder = `${mobileFlip ? 'order-1' : 'order-2'} ${deskFlip ? 'md:order-1' : 'md:order-2'}`

  return (
    <li>
      <motion.a
        href="#menu"
        className="grid aspect-[2/1.2] grid-cols-2 text-cream"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <motion.div
          className={`relative overflow-hidden bg-forest ${photoOrder}`}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.2, ease }}
        >
          <motion.img
            src={c.img}
            alt={c.alt}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.07 } }}
            transition={{ duration: 0.9, ease }}
          />
        </motion.div>

        <motion.div
          className={`flex flex-col justify-between bg-forest p-[max(16px,calc(var(--u)*2.8))] ${panelOrder}`}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          variants={{ shown: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease }}
            className="flex items-start justify-between text-[max(9px,calc(var(--u)*1.1))] font-medium leading-none text-cream/60"
          >
            <span>({c.n})</span>
            <span>{c.jp}</span>
          </motion.div>

          <div>
            <motion.h4
              variants={fadeUp}
              transition={{ duration: 0.8, ease }}
              className="text-[max(22px,calc(var(--u)*3.2))] font-bold uppercase leading-[0.95] tracking-[-0.03em]"
            >
              {c.title}
            </motion.h4>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8, ease }}
              className="mt-[0.4em] text-[max(13px,calc(var(--u)*1.4))] italic text-cream/70"
            >
              {c.kicker}
            </motion.p>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8, ease }}
              className={`${t.small} mt-[max(10px,calc(var(--u)*1.6))] max-w-[30ch] text-cream/65 max-sm:hidden`}
            >
              {c.desc}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8, ease }}
              className="mt-[max(14px,calc(var(--u)*2.2))] flex items-center gap-[0.7em] text-[max(12px,calc(var(--u)*1.3))] font-medium"
            >
              <span>view more</span>
              <span aria-hidden className="relative -top-[0.1em] flex-1 border-b border-dotted border-cream/35" />
              <motion.span
                className="inline-flex"
                variants={{ rest: { x: 0 }, hover: { x: 6 } }}
                transition={{ duration: 0.5, ease }}
              >
                <Arrow className="size-[0.85em]" />
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      </motion.a>
    </li>
  )
}

const fadeUp = { hidden: { opacity: 0, y: 14 }, shown: { opacity: 1, y: 0 } }

/* ───────────────────────── Gallery ───────────────────────── */

function Gallery() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const centerY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const sideY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section
      ref={ref}
      className={`${gutter} pt-[max(56px,calc(var(--u)*5.8))] pb-[max(48px,calc(var(--u)*5))]`}
    >
      <div className="flex justify-between gap-y-8 md:h-[calc(var(--u)*71.6)] max-md:flex-col">
        {/* left column */}
        <div className="flex w-[17.2%] flex-col justify-between max-md:w-full max-md:flex-row max-md:items-end max-md:gap-6">
          <Reveal>
            <h2 className={`${t.label} font-medium`}>Gallery</h2>
            <p className={`${t.small} mt-[max(12px,calc(var(--u)*2.2))] max-w-[max(180px,calc(var(--u)*15))]`}>
              Every bowl tells a story. Here's a look at the cozy corners, steaming broth and familiar smiles we
              see every day.
            </p>
          </Reveal>
          <div className="flex flex-col gap-[max(12px,calc(var(--u)*3))] max-md:w-[38%] max-md:shrink-0">
            <Reveal>
              <Arcs className="w-[max(48px,calc(var(--u)*12.8))] text-leaf" />
            </Reveal>
            <GalleryImage
              src="/images/hero.webp"
              alt="Espresso grinder and plants by the window"
              className="h-[max(110px,calc(var(--u)*20.7))] w-full"
              y={sideY}
              objectPosition="18% 55%"
            />
          </div>
        </div>

        {/* center column */}
        <GalleryImage
          src="/images/pancake-stack.webp"
          alt="Pancake stack with blueberries, cream and caramel in afternoon light"
          className="w-[46.7%] max-md:aspect-[3/4] max-md:w-full"
          y={centerY}
          delay={0.1}
        />

        {/* right column */}
        <div className="flex w-[25.9%] flex-col justify-between max-md:w-full max-md:flex-row max-md:items-end max-md:gap-6">
          <GalleryImage
            src="/images/shrimp-tempura-bowl.webp"
            alt="Shrimp tempura with dipping sauce"
            className="h-[max(160px,calc(var(--u)*34))] w-full max-md:w-[48%] max-md:shrink-0"
            y={sideY}
            delay={0.2}
          />
          <Reveal delay={0.2}>
            <p className={`${t.small} max-w-[max(180px,calc(var(--u)*15))]`}>
              From slow morning matcha to late-night ramen, this is the world of Green Neko in little frames.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function GalleryImage({
  src,
  alt,
  className,
  y,
  delay = 0,
  objectPosition,
}: {
  src: string
  alt: string
  className: string
  y: MotionValue<string>
  delay?: number
  objectPosition?: string
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.2, ease, delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute left-0 top-[-10%] h-[120%] w-full object-cover"
        style={{ y, objectPosition }}
      />
    </motion.div>
  )
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer() {
  const locations = [
    {
      name: 'Humayunpur',
      address: 'Ground floor, 94A, Humayunpur Village, Safdarjung Enclave, New Delhi 110029',
      hours: 'Daily, 12:30 – 22:30',
      phone: '+91 99716 10230',
      maps: MAPS_HUMAYUNPUR,
    },
    {
      name: 'B6 Market',
      address: 'Ground floor, 298 B6 Market, opposite Deer Park, New Delhi 110029',
      hours: 'Mon 12:30 – 23:00 · Tue–Sun 10:30 – 23:00',
      phone: '+91 73039 48369',
      maps: MAPS_B6,
    },
  ]
  const socials = [
    ['Instagram', 'https://www.instagram.com/greenneko.eats/'],
    ['Zomato', 'https://www.zomato.com/ncr/green-neko-safdarjung-new-delhi/order'],
    ['YouTube', 'https://www.youtube.com/channel/UCZ-bhp1iD_df1LhmqLggkkw'],
    ['Pinterest', 'https://in.pinterest.com/greenneko/'],
  ]

  return (
    <footer id="contact" className={gutter}>
      <div className="border-t border-ink/15 pt-[max(32px,calc(var(--u)*5))] pb-[max(24px,calc(var(--u)*3))]">
        <div className="grid gap-y-10 md:grid-cols-[1.6fr_1fr_1fr_0.5fr] md:gap-x-[calc(var(--u)*3.4)]">
          <Reveal>
            <h2 className={`${t.label} font-medium`}>Find us</h2>
            <p className="mt-[max(12px,calc(var(--u)*2.2))] text-[max(20px,calc(var(--u)*2.9))] font-semibold leading-[1.3] tracking-[-0.01em]">
              Soul of Japan,
              <span className="block whitespace-nowrap pl-[1.6em] text-leaf">served with love.</span>
            </p>
          </Reveal>
          {locations.map((l, i) => (
            <Reveal key={l.name} delay={0.08 * (i + 1)} className={`${t.small} space-y-[0.6em] md:pt-[0.4em]`}>
              <a
                href={l.maps}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-[max(14px,calc(var(--u)*1.4))] font-semibold"
              >
                {l.name}
                <Arrow className="size-[0.7em] transition-transform duration-500 group-hover:translate-x-1" />
              </a>
              <p className="max-w-[28ch] text-ink/75">{l.address}</p>
              <p>{l.hours}</p>
              <a href={`tel:${l.phone.replace(/\s/g, '')}`} className="block hover:text-leaf">
                {l.phone}
              </a>
            </Reveal>
          ))}
          <Reveal delay={0.24} className={`${t.small} md:pt-[0.4em]`}>
            <ul className="space-y-[0.6em]">
              {socials.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" className="hover:text-leaf">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className={`mt-[max(40px,calc(var(--u)*7))] flex justify-between ${t.small} text-ink/55`}>
          <span>© 2026 Green Neko. Est. 2023.</span>
          <span>Ramen · Poke · Boba</span>
        </div>
      </div>
    </footer>
  )
}
