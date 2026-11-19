import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ease } from './ease'
import { Arrow, Asterisk } from './icons'
import { MaskLine, Reveal } from './motion'
import { gutter, t } from './tokens'

type Tag = 'Veg' | 'Spicy' | 'Vegan opt.'
type Dish = { name: string; note: string; price: number; tags?: Tag[] }
type Block = { n: string; title: string; kicker: string; img: string; alt: string; pos?: string; dishes: Dish[] }

/* Demo menu: dish names come from greenneko.com, prices are illustrative. */
const MENU: Block[] = [
  {
    n: '01',
    title: 'Ramen',
    kicker: 'ラーメン · Slow broth',
    img: '/images/ramen.webp',
    alt: 'Ramen with chashu, naruto, soft eggs and nori on a dark table',
    pos: '50% 55%',
    dishes: [
      { name: 'Kotteri Ramen', note: 'Rich, creamy chicken paitan, chashu, ajitama egg', price: 595 },
      { name: 'Shoyu Ramen', note: 'Lighter soy broth, nori, menma, spring onion', price: 545, tags: ['Vegan opt.'] },
      { name: 'Naruto Ramen', note: 'Clear broth, narutomaki, bamboo shoots, greens', price: 575 },
      { name: 'Spicy Tofu Tantanmen', note: 'Sesame-chilli broth, silken tofu, bok choy', price: 525, tags: ['Veg', 'Spicy'] },
    ],
  },
  {
    n: '02',
    title: 'Poke',
    kicker: 'ポケ · Fresh bowls',
    img: '/images/poke.webp',
    alt: 'A poke bowl with edamame, corn and sesame',
    dishes: [
      { name: 'Salmon Poke', note: 'Sushi rice, shoyu salmon, avocado, pickled radish', price: 695 },
      { name: 'Spicy Chicken Poke', note: 'Gochujang chicken, edamame, corn, crispy shallots', price: 545, tags: ['Spicy'] },
      { name: 'Tofu & Edamame', note: 'Sesame tofu, red cabbage, cucumber, nori', price: 475, tags: ['Veg'] },
      { name: 'Build Your Own', note: 'A base, a protein, five toppings and a sauce', price: 495 },
    ],
  },
  {
    n: '03',
    title: 'Boba',
    kicker: 'バブルティー · Drinks',
    img: '/images/boba.webp',
    alt: 'Green Neko milk tea with tapioca pearls',
    dishes: [
      { name: 'Brown Sugar Boba', note: 'Fresh milk, slow-cooked brown sugar pearls', price: 295, tags: ['Veg'] },
      { name: 'Taro Milk Tea', note: 'Real taro, jasmine tea, chewy pearls', price: 275, tags: ['Veg'] },
      { name: 'Mango Passion Fruit', note: 'Organic fruit, green tea, popping boba', price: 265, tags: ['Vegan opt.'] },
      { name: 'Matcha Latte', note: 'Ceremonial-grade matcha, oat or dairy milk', price: 325, tags: ['Veg'] },
    ],
  },
  {
    n: '04',
    title: 'Small Plates',
    kicker: '小皿 · To share',
    img: '/images/chicken-gyoza.webp',
    alt: 'Pan-fried chicken gyoza with chilli dip',
    dishes: [
      { name: 'Chicken Gyoza', note: 'Pan-fried, crisp skirt, chilli-soy', price: 345 },
      { name: 'Shrimp Tempura', note: 'Light, crisp batter, tentsuyu dip', price: 445 },
      { name: 'Edamame', note: 'Steamed, flaky sea salt', price: 245, tags: ['Veg'] },
      { name: 'Neko Soufflé Pancake', note: 'Jiggly, berry compote, whipped cream', price: 395, tags: ['Veg'] },
    ],
  },
]

export function MenuSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <section ref={ref} id="menu" className="scroll-mt-6">
      {/* label row + staggered headline, same rhythm as About */}
      <div className={`${gutter} pt-[max(64px,calc(var(--u)*11))] pb-[max(56px,calc(var(--u)*9))]`}>
        <div className="flex items-end justify-between">
          <Reveal>
            <h2 className={`${t.label} font-medium`}>Menu</h2>
          </Reveal>
          <Asterisk rotate={rotate} className="size-[max(44px,calc(var(--u)*7.8))] text-leaf" />
        </div>

        <p className={`mt-[max(32px,calc(var(--u)*8.5))] ${t.display} font-semibold`}>
          <MaskLine className="pl-[23%] max-md:pl-0">Six hours of broth-</MaskLine>
          <MaskLine className="pl-[45%] max-md:pl-[18%]" delay={0.1}>
            for one <span className="font-bold tracking-[-0.03em] text-leaf">good bowl</span>
          </MaskLine>
        </p>
      </div>

      {/* checkerboard: photo / list, then list / photo */}
      <div className="flex flex-col gap-[max(6px,calc(var(--u)*0.6))]">
        {MENU.map((block, i) => (
          <MenuRow key={block.n} block={block} flip={i % 2 === 1} />
        ))}
      </div>

      <div
        className={`${gutter} flex items-center justify-between gap-6 pt-[max(20px,calc(var(--u)*2.4))] ${t.small} text-ink/60`}
      >
        <span>Demo menu. Prices are illustrative, in INR, plus 5% GST. Halal kitchen.</span>
        <div className="flex shrink-0 items-center gap-[max(16px,calc(var(--u)*2.4))] font-medium text-ink">
          <a href="https://greenneko.com/menu.html" className="group flex items-center gap-[0.4em] hover:text-leaf">
            Full menu
            <Arrow className="size-[0.8em] transition-transform duration-500 group-hover:translate-x-1" />
          </a>
          <a
            href="https://www.zomato.com/ncr/green-neko-safdarjung-new-delhi/order"
            target="_blank"
            rel="noreferrer"
            className="bg-leaf px-[1em] py-[0.6em] leading-none text-cream transition-colors duration-300 hover:bg-forest"
          >
            Order Now
          </a>
        </div>
      </div>
    </section>
  )
}

function MenuRow({ block, flip }: { block: Block; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    <div
      ref={ref}
      className={`grid min-h-[max(420px,calc(var(--u)*50))] grid-cols-2 max-md:grid-cols-1`}
    >
      {/* photo */}
      <motion.div
        className={`relative overflow-hidden bg-forest max-md:aspect-[4/3] ${flip ? 'md:order-2' : ''}`}
        initial={{ clipPath: flip ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 1.3, ease }}
      >
        <motion.img
          src={block.img}
          alt={block.alt}
          loading="lazy"
          className="absolute left-0 top-[-8%] h-[116%] w-full object-cover"
          style={{ y: imgY, objectPosition: block.pos }}
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease }}
        />
      </motion.div>

      {/* list */}
      <div className={`flex items-center bg-forest text-cream ${flip ? 'md:order-1' : ''}`}>
        <motion.div
          className="w-full px-[max(20px,calc(var(--u)*7.5))] py-[max(40px,calc(var(--u)*6))]"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          variants={{ shown: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
        >
          <motion.div variants={item} transition={{ duration: 0.8, ease }} className="flex items-start gap-[0.5em]">
            <span className="mt-[0.5em] text-[max(9px,calc(var(--u)*1.1))] font-medium leading-none text-cream/60">
              ({block.n})
            </span>
            <div>
              <h3 className="text-[max(30px,calc(var(--u)*3.8))] font-bold uppercase leading-none tracking-[-0.03em]">
                {block.title}
              </h3>
              <p className="mt-[0.45em] text-[max(14px,calc(var(--u)*1.5))] font-normal italic text-cream/70">
                {block.kicker}
              </p>
            </div>
          </motion.div>

          <ul className="mt-[max(28px,calc(var(--u)*4))] space-y-[max(20px,calc(var(--u)*2.5))]">
            {block.dishes.map((d) => (
              <motion.li key={d.name} variants={item} transition={{ duration: 0.8, ease }}>
                <div className="flex items-baseline gap-[0.7em] text-[max(15px,calc(var(--u)*1.6))] leading-tight">
                  <span className="font-semibold">{d.name}</span>
                  {d.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="relative -top-[0.15em] shrink-0 rounded-full border border-cream/30 px-[0.6em] py-[0.15em] text-[max(9px,calc(var(--u)*0.72))] font-medium uppercase tracking-[0.06em] text-cream/75 max-sm:hidden"
                    >
                      {tag}
                    </span>
                  ))}
                  {/* dotted leader that draws itself in */}
                  <motion.span
                    aria-hidden
                    className="relative -top-[0.25em] min-w-[2em] flex-1 origin-left border-b border-dotted border-cream/35"
                    variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
                    transition={{ duration: 0.9, ease, delay: 0.15 }}
                  />
                  <span className="font-semibold tabular-nums">₹{d.price}</span>
                </div>
                <p className={`${t.small} mt-[0.35em] max-w-[34ch] text-cream/65`}>{d.note}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

const item = { hidden: { opacity: 0, y: 16 }, shown: { opacity: 1, y: 0 } }
