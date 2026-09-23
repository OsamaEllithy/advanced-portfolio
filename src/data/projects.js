/**
 * Every project lives here. The work rail on the home page and the project
 * template both read from this one list, so adding a project is a single edit.
 *
 *   slug        - the URL: /work/<slug>
 *   title       - shown on the card sticker and as the page heading
 *   tagline     - one line under the title on the project page
 *   cover       - card image and the big image at the top of the project page
 *   year/role   - meta line on the project page
 *   stack       - chips under the meta line
 *   intro       - the opening paragraph of the case study
 *   sections    - the body of the case study, in order
 *   beforeAfter - the two shots behind the comparison slider. Only the
 *                 projects that had a previous design carry this key; leave
 *                 it off and the block does not render at all. Point
 *                 `before` at the shot of the old design.
 *   summary     - the wrap-up at the very bottom: how you approached it,
 *                 what you decided, and what came out of it
 *   tilt/lift   - how the card sits in the rail on the home page
 *
 * The two PLACEHOLDER constants below are only a safety net for a project
 * added without copy. Every project in the list is written.
 */
const PLACEHOLDER_SECTIONS = [
  {
    heading: 'The brief',
    body: [
      'What the client came in with, and the state of things before the work started.',
      'Who the site is for, and what it had to do for them.',
    ],
  },
  {
    heading: 'How I approached it',
    body: [
      'The thinking behind the structure: what got prioritised, what got cut, and why.',
      'Decisions on the stack, the design direction, and anything that shaped the build.',
    ],
  },
  {
    heading: 'The build',
    body: [
      'What was actually built, and the parts worth calling out.',
      'Anything tricky, and how it was solved.',
    ],
  },
  {
    heading: 'The result',
    body: ['What changed once it shipped, in plain numbers where you have them.'],
  },
]

const PLACEHOLDER_SUMMARY = {
  body: [
    'A short recap of the whole project in one place: the problem, the idea behind the '
      + 'solution, and how it landed.',
    'This is the section to write last, once the rest of the page is filled in.',
  ],
  highlights: [
    'The one decision that mattered most',
    'What you would keep for the next project',
    'What the client got out of it',
  ],
}

function project(config) {
  return {
    tagline: 'A short line about what this project is.',
    year: '2026',
    role: 'Design & development',
    stack: ['React', 'Node.js'],
    intro:
      'One paragraph that sets the project up: who it is for, what it needed to do, and '
      + 'where it ended up.',
    sections: PLACEHOLDER_SECTIONS,
    summary: PLACEHOLDER_SUMMARY,
    ...config,
  }
}

export const PROJECTS = [
  project({
    slug: 'loave',
    title: 'Loave',
    cover: '/images/projects/loave.webp',
    beforeAfter: {
      before: '/images/projects/loave-wire.jpg',
      after: '/images/projects/loave.webp',
    },
    role: 'Store build & SEO',
    stack: ['Salla', 'CSS & JS', 'SEO'],
    tagline:
      'A store that looked like every other store on the platform, rebuilt into one people '
      + 'remember.',
    intro:
      'Loave was already selling on Salla, but the storefront ran on a stock arrangement that '
      + 'said nothing about the brand, and the technical SEO score sat at 78%. The job was to '
      + 'give the store a design of its own and clean up everything underneath it, without '
      + 'leaving the platform or interrupting sales.',
    sections: [
      {
        heading: 'The brief',
        body: [
          'The store was live and it worked, but it was flat. It used the default order of blocks '
            + 'that ships with the platform, so nothing on the page told a visitor which brand '
            + 'they were on or what to look at first. Products, offers and information all carried '
            + 'the same visual weight.',
          'Underneath, the SEO audit came back at 78%: missing and duplicated meta, headings that '
            + 'were out of order, images with no alt text, and internal links that led nowhere '
            + 'useful. The client wanted a store that felt considered, and wanted it soon.',
        ],
      },
      {
        heading: 'How I approached it',
        body: [
          'I started with the order of the page rather than the styling. Everything a first-time '
            + 'visitor needs, the main offer, the categories, the reasons to trust the shop, moved '
            + 'up, and the rest was arranged into a clear sequence below it, so the page reads top '
            + 'to bottom instead of all at once.',
          'The visual language came second: one accent colour, one type scale, generous spacing, '
            + 'and a single card style reused everywhere, so the store reads as one product '
            + 'instead of a set of unrelated sections.',
        ],
      },
      {
        heading: 'The build',
        body: [
          'Everything was built inside Salla, extending the theme with custom CSS and JavaScript '
            + 'rather than fighting it, so the client keeps the full dashboard, the checkout and '
            + 'every platform update.',
          'Alongside the design work I rewrote the head of every template: unique titles and '
            + 'descriptions, one H1 per page, a heading order that actually nests, alt text across '
            + 'the catalogue, and an internal linking pattern that connects categories to products '
            + 'and back again.',
        ],
      },
      {
        heading: 'The result',
        body: [
          'The technical SEO score moved from 78% to 98%, and the store now reads as a brand '
            + 'rather than a template.',
          'The whole rebuild took roughly two working days, and the client was genuinely happy '
            + 'with it, which was the part that mattered most.',
        ],
      },
    ],
    summary: {
      body: [
        'Loave was less about adding things and more about deciding what a visitor should see '
          + 'first. Once the order of the page was right, the design work became straightforward '
          + 'and the technical cleanup could run alongside it.',
        'The store kept every advantage of staying on Salla and lost the one thing that made it '
          + 'look like everyone else.',
      ],
      highlights: [
        'SEO from 78% to 98%',
        'Custom design on top of Salla, no migration',
        'Delivered in about two working days',
      ],
    },
    tilt: -7,
    lift: 30,
  }),
  project({
    slug: 'eyescape',
    title: 'EyeScape',
    cover: '/images/projects/eyescape.webp',
    role: 'Store build, SEO & product copy',
    stack: ['Zid', 'SEO', 'Product Copywriting'],
    previewLink: 'https://eye-scape.com/en-eg/',
    tagline: 'A store on Zid tuned for search, starting from the product copy.',
    intro:
      'EyeScape came in with a working Zid store and one clear goal: be findable. The technical '
      + 'SEO score was at 80%, the product pages were thin on copy, and the internal link '
      + 'structure was doing nothing for the catalogue.',
    sections: [
      {
        heading: 'The brief',
        body: [
          'The store was selling, but almost entirely to people who already knew the brand. '
            + 'Search brought in very little, and the product pages gave neither a shopper nor a '
            + 'crawler much to work with.',
          'The client wanted the store to rank, and to look professional doing it, without a '
            + 'redesign.',
        ],
      },
      {
        heading: 'How I approached it',
        body: [
          'I treated the catalogue as the main asset. Every product page is a landing page, so the '
            + 'work went into making each one worth landing on: real descriptions, the details a '
            + 'buyer actually asks about, and language that matches how people search.',
          'The second half was structure. Categories, collections and products were linked '
            + 'deliberately, so authority moves through the catalogue instead of stopping at the '
            + 'home page.',
        ],
      },
      {
        heading: 'The build',
        body: [
          'All of it was done inside Zid. Titles, descriptions and headings were rewritten per '
            + 'template, the image library was given alt text, and duplicated or empty meta was '
            + 'cleared out.',
          'Product copy was written item by item instead of generated from a pattern, so every '
            + 'page carries its own text, its own keywords and its own reason to exist.',
        ],
      },
      {
        heading: 'The result',
        body: [
          'The technical SEO score moved from 80% to 95%, with the points left over sitting in '
            + 'platform-level items outside the store owner control.',
          'Product pages now surface on their own instead of leaning on the home page, and the '
            + 'catalogue reads consistently from top to bottom.',
        ],
      },
    ],
    summary: {
      body: [
        'The interesting part of EyeScape is that almost none of the work was visual. The store '
          + 'already looked fine; what it lacked was text and structure.',
        'Writing the catalogue properly and wiring the links together did more for the shop than '
          + 'another round of design would have.',
      ],
      highlights: [
        'SEO from 80% to 95%',
        'Product copy written page by page',
        'Internal linking rebuilt across the catalogue',
      ],
    },
    tilt: 4,
    lift: 0,
  }),
  project({
    slug: 'solera',
    title: 'Solera',
    cover: '/images/projects/solera.webp',
    role: 'UI/UX, Shopify build & SEO',
    stack: ['Shopify', 'Liquid', 'UI/UX', 'SEO'],
    previewLink: 'https://soleraelite.com',
    tagline: 'A perfume house on Shopify, designed and built to sell rather than just to look good.',
    intro:
      'Solera is a perfume brand that needed a storefront worthy of the product. The work covered '
      + 'the whole thing: the UI and UX from a blank page, the build on Shopify, every '
      + 'integration the shop runs on, and the SEO underneath it. It started bringing in real '
      + 'sales noticeably quickly.',
    sections: [
      {
        heading: 'The brief',
        body: [
          'Perfume is a hard thing to sell online, because the one argument that normally closes '
            + 'the sale is not available. Everything has to be carried by the photography, the '
            + 'wording and the way the store feels, and the brand needed all three to say '
            + 'something in the same register as the product.',
          'On top of that it had to be a real shop: findable in search, quick to buy from, and '
            + 'connected to the tools the business actually runs on.',
        ],
      },
      {
        heading: 'How I approached it',
        body: [
          'The UI and UX were designed before anything was built. The store is arranged so the '
            + 'product is always the loudest thing on the screen: restrained type, a lot of space, '
            + 'and a palette that stays out of the way of the bottles.',
          'The path to checkout was kept deliberately short. A visitor can get from the home page '
            + 'to a product to the cart in a few taps, and nothing on the way asks them for a '
            + 'decision that does not help them buy.',
        ],
      },
      {
        heading: 'The build',
        body: [
          'Built on Shopify, in Liquid, rather than assembled from a page builder, so the '
            + 'storefront follows the design instead of the design being bent to fit a theme. '
            + 'Sections were built to be editable, so the team can run a campaign without needing '
            + 'me.',
          'I used Claude throughout the development as part of the workflow, which kept the pace '
            + 'up on the repetitive Liquid work and left more time for the parts that needed '
            + 'judgement.',
          'All the integrations the shop depends on were wired up and tested end to end: payments, '
            + 'shipping, the apps the team works in, and the analytics behind them, so orders flow '
            + 'through without anyone having to chase them.',
        ],
      },
      {
        heading: 'The result',
        body: [
          'The store started producing noticeable sales soon after launch, which is the only '
            + 'metric that settles an argument about a storefront.',
          'Search visibility came along with it: the technical SEO was built into the store rather '
            + 'than added later, so product and collection pages arrive already in shape for '
            + 'search.',
        ],
      },
    ],
    summary: {
      body: [
        'Solera is the project where the design work and the commercial result line up most '
          + 'clearly. Every decision on the page was made against one question: does this help '
          + 'someone buy a bottle they cannot smell?',
        'Doing the design, the Shopify build, the integrations and the SEO in one pass is what '
          + 'kept the store coherent, because nothing had to be retrofitted into someone '
          + "else's structure.",
      ],
      highlights: [
        'Noticeable sales shortly after launch',
        'Custom Liquid build on Shopify, no page builder',
        'UI/UX, integrations and SEO all handled in one pass',
      ],
    },
    tilt: -5,
    lift: 22,
  }),
  project({
    slug: 'nabda-tech',
    title: 'Nabda Tech',
    cover: '/images/projects/nabda.webp',
    beforeAfter: {
      before: '/images/projects/nabda-wire.jpg',
      after: '/images/projects/nabda.webp',
    },
    role: 'Store build & SEO',
    stack: ['Salla', 'SEO', 'Vanilla JS'],
    previewLink: 'https://nabda-tik.com/',
    tagline: 'A simpler storefront, three working days, and a technical SEO score of 100%.',
    intro:
      'Nabda Tech had outgrown the design it was running on and wanted something cleaner, easier '
      + 'to use and far easier to find. The store was rebuilt with a straightforward, fully '
      + 'responsive layout, and the technical SEO taken to 100%.',
    sections: [
      {
        heading: 'The brief',
        body: [
          'The storefront the client was on had become awkward to move around in. They were not '
            + 'asking for decoration; they were asking for a shop where a customer can find a '
            + 'product and buy it without thinking about it.',
          'Search visibility was the other half of the request: the store needed to appear for the '
            + 'terms its customers actually type.',
        ],
      },
      {
        heading: 'How I approached it',
        body: [
          'Simplicity was the brief, so the layout was kept deliberately plain: a short path from '
            + 'the home page to a category to a product, few decisions per screen, and nothing on '
            + 'the page that does not help someone buy.',
          'Responsiveness was designed in from the first screen rather than patched on at the end, '
            + 'because most of the traffic arrives on a phone.',
        ],
      },
      {
        heading: 'The build',
        body: [
          'The store was built on Salla, with the theme extended in custom code wherever the '
            + 'defaults were not enough.',
          'The SEO pass covered the whole technical checklist: unique meta per page, ordered '
            + 'headings, alt text, clean URLs, sitemap and structured data, and internal links '
            + 'that tie the catalogue together.',
        ],
      },
      {
        heading: 'The result',
        body: [
          'The technical SEO score came back at 100%, and the store now shows up consistently on '
            + 'the first page of search for its terms.',
          'The build took three working days on the platform, start to live.',
        ],
      },
    ],
    summary: {
      body: [
        'Nabda Tech is the clearest example of how much a store gains from restraint. Nothing on '
          + 'the page is clever; every screen does exactly one job.',
        'Pairing that with a complete technical pass is what put it on the first page and kept it '
          + 'there.',
      ],
      highlights: [
        'Technical SEO at 100%',
        'Consistent first-page visibility',
        'Three working days from start to live',
      ],
    },
    tilt: -3,
    lift: 46,
  }),
  project({
    slug: 'gym-manager',
    title: 'Gym Manager',
    cover: '/images/projects/gym-manager.webp',
    role: 'Desktop app development',
    stack: ['React', 'Electron', 'SQLite', 'Node.js'],
    tagline:
      'Desktop software that replaced a stack of notebooks, and closed the gap the money was '
      + 'leaking through.',
    intro:
      'The owner of the gym I train at was running the business on paper: subscriptions in one '
      + 'notebook, sales in another, payments remembered rather than recorded. Money went missing '
      + 'and nobody could say where. Gym Manager is the desktop system built to end that.',
    sections: [
      {
        heading: 'The brief',
        body: [
          'Every day started with the same four questions: who paid, who is overdue, what sold, '
            + 'and how much should be in the drawer. The answers were spread across several '
            + 'notebooks and several people, which made honest mistakes and dishonest ones equally '
            + 'easy.',
          'The owner needed one place that holds the truth, and needed to stay in control of '
            + 'anything that touches money.',
        ],
      },
      {
        heading: 'How I approached it',
        body: [
          'The rule the whole system is built around is that nothing affecting the balance happens '
            + 'without the owner approving it. Staff can register members, take payments and '
            + 'record sales, but the actions that matter wait for authorisation. That removes the '
            + 'guesswork and the opportunity to cheat in the same move.',
          'The second rule was speed. Software at a gym counter has to be faster than a notebook '
            + 'or nobody uses it, so every routine task is a couple of keystrokes and the app runs '
            + 'locally with no dependency on a connection.',
        ],
      },
      {
        heading: 'The build',
        body: [
          'It is a desktop application: React for the interface, Electron to ship it as a real '
            + 'Windows app, Node underneath, and SQLite for storage, so the data lives on the '
            + 'machine, stays fast, and needs no server to maintain.',
          'It covers subscriptions and renewals, member records, point of sale for the shop, '
            + 'expense and revenue tracking, order tracking, and reporting that tells the owner '
            + 'where the money went, all behind the approval flow.',
        ],
      },
      {
        heading: 'The result',
        body: [
          'The notebooks are gone. Subscriptions, sales and cash reconcile at the end of the day '
            + 'instead of being estimated, and the owner can read the state of the business at a '
            + 'glance.',
          'It is one of the lightest systems in a field full of heavy ones, and it is being '
            + 'prepared as a product other gyms can buy.',
        ],
      },
    ],
    summary: {
      body: [
        'Gym Manager started as a favour and became the most useful thing I have built, because '
          + 'the problem it solves is measured directly in money.',
        'The approval flow is the whole idea; everything else in the app exists to make that flow '
          + 'fast enough to live with.',
      ],
      highlights: [
        'Nothing touches the balance without owner approval',
        'Offline-first desktop app: React, Electron, Node, SQLite',
        'Being prepared to sell as a SaaS product',
      ],
    },
    tilt: 6,
    lift: 12,
  }),
  project({
    slug: 'weazer',
    title: 'Weazer',
    cover: '/images/projects/weazer.webp',
    beforeAfter: {
      before: '/images/projects/weazer-wire.jpg',
      after: '/images/projects/weazer.webp',
    },
    role: 'UI/UX & development',
    stack: ['UI/UX', 'React'],
    tagline:
      'A self-directed build asking whether the interface and the experience can both win at '
      + 'once.',
    intro:
      'Weazer is a personal project with one question behind it: how far can a design go visually '
      + 'before the experience starts paying for it? Answering it properly turned into a full '
      + 'interface built in React.',
    sections: [
      {
        heading: 'The brief',
        body: [
          'Most work forces a choice. Either the interface is striking and people have to learn '
            + 'it, or it is easy and it looks like everything else. I wanted a build where neither '
            + 'side was allowed to give ground.',
          'There was no client, so the constraint had to come from the brief itself: every visual '
            + 'decision had to survive a usability question, and every usability decision had to '
            + 'survive a design one.',
        ],
      },
      {
        heading: 'How I approached it',
        body: [
          'I designed the flows first and the surface second, so the structure was settled before '
            + 'anything was decorated. The distinctive parts sit in motion, spacing and typography '
            + 'rather than in unusual controls, which keeps the interface familiar to use while '
            + 'still looking like nothing else.',
          'Anything that looked good but slowed a task down was cut, with no exceptions.',
        ],
      },
      {
        heading: 'The build',
        body: [
          'Built in React and componentised, so the same patterns repeat across every screen and '
            + 'nothing has to be relearned from one page to the next.',
          'Interaction states were treated as part of the design instead of an afterthought, and '
            + 'motion is used to explain what just happened rather than to fill time.',
        ],
      },
      {
        heading: 'The result',
        body: [
          'An interface that reads as a design piece and still behaves predictably, which is '
            + 'exactly what the exercise was for.',
          'It also became the reference I work from when I structure interfaces for clients.',
        ],
      },
    ],
    summary: {
      body: [
        'Weazer was a test I set for myself, and the useful part was the discipline: no visual '
          + 'idea survives unless it still works when someone is in a hurry.',
        'It left me with a set of patterns I now reuse instead of reinventing.',
      ],
      highlights: [
        'Interface and experience treated as a single brief',
        'Built in React, fully componentised',
        'Now the reference for my client work',
      ],
    },
    tilt: -6,
    lift: 34,
  }),
  project({
    slug: 'luxury-golf',
    title: 'Luxury Golf',
    cover: '/images/projects/luxury-golf.webp',
    role: 'Development, SEO & part of the UI/UX',
    stack: ['React', 'SEO', 'UI/UX (partial)'],
    tagline:
      'A presence for a company whose clients include tourist facilities and the American '
      + 'University.',
    intro:
      'Luxury Golf is the heaviest project I have taken on. The company operates at a scale where '
      + 'its clients are large institutions, and it had no technical presence to match. The site '
      + 'had to introduce the company, hold up in front of that audience, and send people to the '
      + 'application.',
    sections: [
      {
        heading: 'The brief',
        body: [
          'A company operating at tourist facilities and at the American University does not get a '
            + 'second chance at a first impression. Anyone checking them out expected to find '
            + 'something the size of the operation, and there was very little there.',
          'The site had to explain what the company does, be findable in search, and push visitors '
            + 'towards downloading the app.',
        ],
      },
      {
        heading: 'How I approached it',
        body: [
          'Given the audience, the tone had to be confident without being loud. The structure '
            + 'walks a visitor through who the company is, what it operates and how to get '
            + 'started, and every section ends with a clear route to the app.',
          'The pressure on this one was as much about responsibility as craft. Every decision got '
            + 'checked against how the company would be judged by its own clients.',
        ],
      },
      {
        heading: 'The build',
        body: [
          'Built in React, with GSAP handling the motion so the pages move smoothly without '
            + 'turning into a showreel.',
          'SEO was designed in rather than bolted on: page structure, headings, meta and copy were '
            + 'all written around what the company should be found for.',
        ],
      },
      {
        heading: 'The result',
        body: [
          'The company now has a technical presence that matches its physical one, and a site that '
            + 'carries the weight of the name.',
          'Search visibility improved, and the site became the main route to app downloads.',
        ],
      },
    ],
    summary: {
      body: [
        'Luxury Golf was the project where the constraint was not the code, it was the audience. '
          + 'Everything got weighed against how a large client would read it.',
        'React and GSAP kept the site fast and smooth; the real work was the judgement about what '
          + 'to say and in what order.',
      ],
      highlights: [
        'Built for an audience of large institutions',
        'React with GSAP for the motion',
        'SEO planned into the structure, and a clear path to downloads',
      ],
    },
    tilt: 5,
    lift: 8,
  }),
  project({
    slug: 'spiderman',
    title: 'Spider-Man',
    cover: '/images/projects/spiderman.webp',
    role: 'UI/UX & development',
    stack: ['UI/UX', 'React'],
    tagline: 'If Marvel shipped a site for Brand New Day, this is what it might look like.',
    intro:
      'This one came out of being a Marvel fan more than anything else. The new Spider-Man film, '
      + 'Brand New Day, had an identity worth designing around, so I built the site the studio '
      + 'might have built for it, and designed the whole thing myself.',
    sections: [
      {
        heading: 'The brief',
        body: [
          'A pure self-learning project with an imaginary client and a real constraint: it had to '
            + 'look like it belonged to the film, not like a fan page.',
          'The brief I set myself was a single question. What would this look like if the studio '
            + 'had commissioned it?',
        ],
      },
      {
        heading: 'How I approached it',
        body: [
          'I worked from the language of the film first, the colour, the type, the pacing, and let '
            + 'the layout follow. The design is entirely my own; the film only supplied the '
            + 'palette and the mood.',
          'Motion carries most of the atmosphere here, so it was planned scene by scene rather '
            + 'than applied to finished pages.',
        ],
      },
      {
        heading: 'The build',
        body: [
          'Built in React, with the page broken into sections that each behave like a beat in a '
            + 'trailer.',
          'The heavier visual moments were kept to a budget, so the site still loads quickly and '
            + 'scrolls properly on an ordinary machine.',
        ],
      },
      {
        heading: 'The result',
        body: [
          'It picked up serious attention on LinkedIn, well beyond anything I expected from a '
            + 'personal project.',
          'More usefully, it is the piece people bring up first when they want to see what I can '
            + 'do visually.',
        ],
      },
    ],
    summary: {
      body: [
        'Spider-Man was made for the fun of it, and it turned into the piece of my work that '
          + 'travelled furthest.',
        'It proved that a self-set brief, taken seriously, goes further than another safe demo.',
      ],
      highlights: [
        'Concept, design and build all mine',
        'Strong reception on LinkedIn',
        'React, with the motion planned like a trailer',
      ],
    },
    tilt: -4,
    lift: 42,
  }),
  project({
    slug: 'adham',
    title: 'Adham',
    cover: '/images/projects/adham-hany.webp',
    beforeAfter: {
      before: '/images/projects/adham-wire.jpg',
      after: '/images/projects/adham-hany.webp',
    },
    role: 'UI/UX, development & SEO',
    stack: ['UI/UX', 'React', 'SEO'],
    previewLink: 'https://adhamhany.com',
    tagline:
      'A portfolio for one of the best video editors around, built to show the work and answer '
      + 'for him.',
    intro:
      'Adham is a video editor at the top of his field who had nowhere single to send people. The '
      + 'work was scattered, and every enquiry turned into the same conversation typed out again. '
      + 'The site organises the work and takes the first round of replies off his hands.',
    sections: [
      {
        heading: 'The brief',
        body: [
          'Adham needed two things: his work presented in an order that makes sense, and a way to '
            + 'stop losing time to repeat messages.',
          'Everything he had was spread across platforms, so a potential client had no way to '
            + 'judge the range of the work in one sitting.',
        ],
      },
      {
        heading: 'How I approached it',
        body: [
          'The work comes first on every screen. The site is built around the reels themselves, '
            + 'grouped so someone can take in the range in a minute instead of hunting through a '
            + 'feed.',
          'For communication, the site handles the predictable part of the conversation: what he '
            + 'does, how he works, what a project involves, and a contact route that arrives with '
            + 'the context already attached, so he only answers the questions that are actually '
            + 'specific.',
        ],
      },
      {
        heading: 'The build',
        body: [
          'Built from scratch rather than from a template, so the layout follows the work instead '
            + "of the work being squeezed into someone else's layout.",
          'The SEO work went in alongside the build: page structure, headings, meta and copy '
            + 'written so that searching his name, or his field, lands on this page.',
        ],
      },
      {
        heading: 'The result',
        body: [
          'His work now sits in one professional place, and the volume of repetitive back and '
            + 'forth dropped noticeably.',
          'The site reached 90% on technical SEO, and it is the link he sends before any '
            + 'conversation starts.',
        ],
      },
    ],
    summary: {
      body: [
        'The design problem here was editing, not decoration. Adham had plenty of material; what '
          + 'he needed was an order for it and a page that speaks for him before he does.',
        'Automating the predictable half of the conversation turned out to be worth as much to '
          + 'him as the presentation.',
      ],
      highlights: [
        'Work organised into one professional showcase',
        'Routine replies handled by the site',
        'Technical SEO at 90%',
      ],
    },
    tilt: 6,
    lift: 16,
  }),
  project({
    slug: 'portfolio',
    year: '2025',
    title: 'Portfolio',
    cover: '/images/projects/Portfolio.webp',
    role: 'UI/UX & development',
    stack: ['UI/UX', 'React'],
    tagline: 'The self-taught build everything after it came out of.',
    intro:
      'This is where the approach I use now took shape. It started as a self-learning exercise in '
      + 'designing a layout of this kind, and it ended up as the foundation for both my own '
      + 'portfolio and the one I built for Adham.',
    sections: [
      {
        heading: 'The brief',
        body: [
          'No client, no deadline, just a format I wanted to understand properly: how a portfolio '
            + 'should be arranged so the work does the talking.',
          'The point was to learn it by building the whole thing rather than by reading about it.',
        ],
      },
      {
        heading: 'How I approached it',
        body: [
          'I designed it from a blank page, which meant making every decision at least twice: '
            + 'once badly, then again once I understood why the first version did not hold up.',
          'Layout, rhythm and type were the focus, because those are the parts that carry a '
            + 'portfolio when the work itself is already good.',
        ],
      },
      {
        heading: 'The build',
        body: [
          'Built in React, and rebuilt more than once as the design settled. Most of the value '
            + 'came out of the second and third passes.',
          'The component patterns that came out of it are the ones I still start from.',
        ],
      },
      {
        heading: 'The result',
        body: [
          "It became the base for my own portfolio and for Adham's site, which is a better "
            + 'outcome than the project itself.',
          'Treat it as the starting point: everything else in this list is built on what this one '
            + 'taught me.',
        ],
      },
    ],
    summary: {
      body: [
        'This one is here as a milestone rather than a client win. It is where the design '
          + 'language and the build habits started.',
        'Two shipped portfolios came directly out of it.',
      ],
      highlights: [
        'Self-directed learning project',
        'Design done entirely from scratch',
        'Became the base for two shipped portfolios',
      ],
    },
    tilt: -3,
    lift: 2,
  }),
]

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug)
}

/** the projects that follow this one, wrapping back round to the start */
export function getNextProjects(slug, count = 3) {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  if (i === -1) return []
  return Array.from({ length: Math.min(count, PROJECTS.length - 1) }, (_, n) =>
    PROJECTS[(i + n + 1) % PROJECTS.length],
  )
}
