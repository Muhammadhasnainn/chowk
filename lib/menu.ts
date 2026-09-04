export type Category =
  | "Coals"
  | "Karahi"
  | "Bread & rice"
  | "Sides"
  | "Sweet"
  | "Chai";

export type Dish = {
  slug: string;
  name: string;
  urdu: string;
  category: Category;
  price: number;
  heat: "None" | "Mild" | "Medium" | "Hot";
  serves: string;
  blurb: string;
  story: string[];
  built: string[];
  pairs: string[];
  hue: string;
};

export const categories: Category[] = [
  "Coals",
  "Karahi",
  "Bread & rice",
  "Sides",
  "Sweet",
  "Chai",
];

export const dishes: Dish[] = [
  {
    slug: "sikandari-raan",
    name: "Sikandari Raan",
    urdu: "سکندری ران",
    category: "Coals",
    price: 4800,
    heat: "Medium",
    serves: "4 to 6 people",
    blurb: "A whole leg of lamb, steamed overnight, finished on the coals.",
    story: [
      "The raan goes into the marinade on Tuesday night and does not come out until Thursday. Papaya paste, mustard oil, ginger, and a fistful of crushed red chilli do the slow work of taking a tough cut apart from the inside.",
      "It is then steamed for four hours over its own stock before it ever meets fire. The coals are only the last ten minutes, and only for the crust.",
      "We carve it at the table. Order it when you have people with you and time to sit.",
    ],
    built: [
      "Lamb leg, bone in, from Tando Allahyar",
      "Green papaya, mustard oil, ginger, garlic",
      "Kashmiri chilli for colour, dagi mirch for heat",
      "Finished with lemon and raw onion",
    ],
    pairs: ["roghni-naan", "kachumber", "doodh-patti"],
    hue: "#8C3A22",
  },
  {
    slug: "bihari-boti",
    name: "Bihari Boti",
    urdu: "بہاری بوٹی",
    category: "Coals",
    price: 1150,
    heat: "Hot",
    serves: "1 to 2 people",
    blurb: "Beef undercut in papaya and roasted gram, threaded thin so it chars fast.",
    story: [
      "Bihari boti is a Karachi dish now, whatever its name says. Ours follows the Nagan Chowrangi style: thin ribbons of undercut rather than cubes, so every piece picks up smoke.",
      "The roasted gram flour in the marinade is what gives the char its grip. Skip it and the meat browns; include it and it crusts.",
    ],
    built: [
      "Beef undercut, sliced against the grain",
      "Papaya, roasted gram flour, fried onion paste",
      "Mustard oil, garam masala ground the same morning",
    ],
    pairs: ["roghni-naan", "dahi-baray"],
    hue: "#7A2E2E",
  },
  {
    slug: "malai-boti",
    name: "Malai Boti",
    urdu: "ملائی بوٹی",
    category: "Coals",
    price: 1050,
    heat: "Mild",
    serves: "1 to 2 people",
    blurb: "Chicken thigh in cream and green chilli. The one children finish.",
    story: [
      "Thigh, never breast. Cream, cheddar, white pepper, and enough green chilli to be noticed but not enough to stop anyone eating.",
      "It comes off the skewer pale with brown edges. If it comes off golden all over, it stayed on too long and we start again.",
    ],
    built: [
      "Chicken thigh, cut large",
      "Cream, cheddar, hung curd",
      "Green chilli, white pepper, lemon",
    ],
    pairs: ["kaali-mirch-pulao", "kachumber"],
    hue: "#A9873E",
  },
  {
    slug: "kata-kat",
    name: "Kata Kat",
    urdu: "کٹاکٹ",
    category: "Karahi",
    price: 1400,
    heat: "Hot",
    serves: "2 to 3 people",
    blurb: "Mutton offal on the tawa, chopped to the rhythm the dish is named after.",
    story: [
      "Brain, kidney, heart, and a little mince, worked on a flat iron tawa with two heavy blades. The name is the sound of the blades.",
      "It is cooked in front of you at the counter, not in the back. Twelve minutes of noise, and it arrives still spitting.",
      "Ask for it dry or with gravy. Dry is how the cooks eat it.",
    ],
    built: [
      "Mutton brain, kidney, heart",
      "Tomato, green chilli, ginger julienne",
      "Ghee, black pepper, fresh coriander",
    ],
    pairs: ["roghni-naan", "doodh-patti"],
    hue: "#6E3320",
  },
  {
    slug: "white-karahi",
    name: "White Karahi",
    urdu: "وائٹ کڑاہی",
    category: "Karahi",
    price: 1900,
    heat: "Medium",
    serves: "3 to 4 people",
    blurb: "Mutton in yoghurt and black pepper. No tomato, no colour, all weight.",
    story: [
      "Everything a red karahi does with tomato, this does with yoghurt. The yoghurt is whisked in off the heat and brought back slowly so it never splits.",
      "Black pepper is the only real spice here. We crack it coarse so you find it.",
    ],
    built: [
      "Mutton shoulder on the bone",
      "Full-fat yoghurt, cream, garlic",
      "Coarse black pepper, green chilli, coriander seed",
    ],
    pairs: ["roghni-naan", "kachumber", "gajar-ka-halwa"],
    hue: "#5F6B4A",
  },
  {
    slug: "palak-gosht",
    name: "Palak Gosht",
    urdu: "پالک گوشت",
    category: "Karahi",
    price: 1350,
    heat: "Medium",
    serves: "2 to 3 people",
    blurb: "Spinach cooked down for two hours until it stops being a vegetable.",
    story: [
      "Fresh spinach, never frozen, and no blender. It goes into the pot in handfuls and reduces on its own until it turns dark and sticky.",
      "The mutton is browned separately and joined late, so it keeps its own texture rather than dissolving.",
    ],
    built: [
      "Mutton, spinach, dill",
      "Onion browned in ghee, whole cumin",
      "Fried garlic and dried fenugreek over the top",
    ],
    pairs: ["roghni-naan", "dahi-baray"],
    hue: "#2F5236",
  },
  {
    slug: "roghni-naan",
    name: "Roghni Naan",
    urdu: "روغنی نان",
    category: "Bread & rice",
    price: 180,
    heat: "None",
    serves: "1 person",
    blurb: "Milk dough, sesame, and a brush of ghee straight out of the tandoor.",
    story: [
      "The dough is made with milk instead of water and rested for six hours. It comes out of the tandoor soft enough to fold and rich enough to eat on its own.",
      "We make them to order. If you are in a hurry, tell us at the start and we will send bread first.",
    ],
    built: ["Milk dough, sesame, nigella", "Brushed with ghee", "Tandoor fired on wood"],
    pairs: ["white-karahi", "kata-kat"],
    hue: "#B08245",
  },
  {
    slug: "kaali-mirch-pulao",
    name: "Kaali Mirch Pulao",
    urdu: "کالی مرچ پلاؤ",
    category: "Bread & rice",
    price: 890,
    heat: "Mild",
    serves: "2 people",
    blurb: "Rice cooked in mutton stock with whole peppercorns. Quiet, and the point.",
    story: [
      "Not biryani. There is no layering, no colour, no potato. The rice takes on everything from the yakhni it is cooked in and nothing else.",
      "Aged sella rice, soaked forty minutes, drained, and finished on dum with whole black pepper and a little fried onion.",
    ],
    built: [
      "Aged sella rice",
      "Mutton yakhni with whole spice",
      "Black peppercorn, fried onion, ghee",
    ],
    pairs: ["malai-boti", "kachumber"],
    hue: "#7C7A5A",
  },
  {
    slug: "dahi-baray",
    name: "Dahi Baray",
    urdu: "دہی بڑے",
    category: "Sides",
    price: 420,
    heat: "Mild",
    serves: "2 people",
    blurb: "Cold lentil dumplings in sweet yoghurt, imli, and roasted cumin.",
    story: [
      "Soaked in warm water before they go into the yoghurt, so they collapse the moment you press them.",
      "The yoghurt is sweetened lightly and thinned with milk. The tamarind chutney is cooked down with jaggery and dates.",
    ],
    built: [
      "Urad dal dumplings",
      "Sweetened yoghurt, tamarind and date chutney",
      "Roasted cumin, red chilli, papri",
    ],
    pairs: ["bihari-boti", "palak-gosht"],
    hue: "#9B7B4F",
  },
  {
    slug: "kachumber",
    name: "Kachumber",
    urdu: "کچومر",
    category: "Sides",
    price: 260,
    heat: "Mild",
    serves: "2 to 3 people",
    blurb: "Onion, tomato, cucumber, lemon. Cut when you order it, not before.",
    story: [
      "A salad that sits for an hour is a different salad. Ours is cut to order because the onion starts leaking the moment a knife touches it.",
      "Salt goes on at the table, not in the kitchen.",
    ],
    built: ["Red onion, tomato, cucumber", "Green chilli, lemon", "Coriander, black salt on the side"],
    pairs: ["sikandari-raan", "white-karahi"],
    hue: "#4C6B3C",
  },
  {
    slug: "gajar-ka-halwa",
    name: "Gajar ka Halwa",
    urdu: "گاجر کا حلوہ",
    category: "Sweet",
    price: 480,
    heat: "None",
    serves: "2 people",
    blurb: "Winter carrots, whole milk, and four hours of stirring. December to February.",
    story: [
      "We only make it when the red carrots come in from Sindh, which is roughly December to February. The rest of the year, the answer is no.",
      "Milk, carrot, sugar, ghee. It is finished with khoya and served warm with a spoon of cream that melts into it.",
    ],
    built: ["Red winter carrots", "Whole milk reduced with sugar", "Khoya, ghee, pistachio, cream"],
    pairs: ["doodh-patti"],
    hue: "#A33B2E",
  },
  {
    slug: "doodh-patti",
    name: "Doodh Patti",
    urdu: "دودھ پتی",
    category: "Chai",
    price: 220,
    heat: "None",
    serves: "1 cup",
    blurb: "Milk, tea, sugar. Boiled hard, poured high, no water at any stage.",
    story: [
      "The leaf is from a blender in Lyari that has been mixing for one family for three generations. We buy it in twenty kilo sacks.",
      "It boils for eleven minutes and gets pulled between two vessels before it reaches the cup. Say less sugar when you order or it comes sweet.",
    ],
    built: ["Full cream milk", "Lyari tea blend", "Cardamom on request"],
    pairs: ["gajar-ka-halwa", "kata-kat"],
    hue: "#8A6A44",
  },
];

export function getDish(slug: string) {
  return dishes.find((d) => d.slug === slug);
}

export function dishesByCategory(category: Category) {
  return dishes.filter((d) => d.category === category);
}

export const featured = [
  "sikandari-raan",
  "kata-kat",
  "white-karahi",
  "roghni-naan",
  "gajar-ka-halwa",
  "doodh-patti",
]
  .map(getDish)
  .filter(Boolean) as Dish[];
