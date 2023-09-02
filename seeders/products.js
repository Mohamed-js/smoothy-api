const { slugify } = require("../helpers");
const { Product } = require("../models/schema");

const products = [
  {
    title: "SMOOTHY PERFECTOR FOR LOW PORUS HAIR",
    price: 195,
    category: "Hair Lotion",
    ar_category: "لوشن للشعر",
    ar_usage: "يرطب الشعر ويمنع الهيشان",
    usage: "Moisturizes hair and prevents hair frizz.",
    ingredients: "Natural ingredients",
    ar_ingredients: "مكونات طبيعية",

    description:
      "Unlock the full potential of your hair with our Porosity Perfector. This lightweight lotion nourishes and enhances low porosity hair, promoting moisture retention and smoothness. It also detangles hair and prevents frizzyness.",
    ar_description:
      "أطلقوا العنان لجمال شعركم مع منتجنا للشعر منخفض المسامية. حافظي على رطوبة شعرك ونعومته لفترة أطول وانسي التشابك والهيشان.",
    image:
      "https://res.cloudinary.com/atefcloud/image/upload/v1692691322/porosity-perfector-for-low-porus-hair---detangling-and-styling-hair-lotion.png",
  },
  {
    title: "SMOOTHY PERFECTOR FOR HIGHLY PORUS HAIR",
    price: 171,
    category: "Hair Lotion",
    ar_category: "لوشن للشعر",
    usage: "Moisturizes hair and prevents hair frizz.",
    ar_usage: "يرطب الشعر ويمنع الهيشان",
    ingredients: "Natural ingredients",
    ar_ingredients: "مكونات طبيعية",
    description:
      "Embrace the fortifying protection of our Porosity Protector. This nourishing hair lotion seals and strengthens high porosity strands, leaving them resilient and smooth. From now and on, forget tangling and frizzy hair.",
    ar_description:
      "استمتعوا بالحماية المقوية لمنتجنا. يرطب ويصفف هذا اللوشن المغذي الشعر ذو المسامية العالية، مما يجعله قويًا وسلسًا. وداعا لتشابك وهيشان الشعر واستمتعوا بنضارة شعركم.",
    image:
      "https://res.cloudinary.com/atefcloud/image/upload/v1692691380/porosity-perfector-for-highly-porus-hair---detangling-and-styling-hair-lotion.png",
  },
  {
    title: "SMOOTHY CLEANSER",
    price: 133,
    category: "Shampoo",
    ar_category: "شامبو",
    usage: "Cleanses and moisturizes hair.",
    ar_usage: "ينظف ويرطب الشعر.",
    ingredients: "Natural ingredients",
    ar_ingredients: "مكونات طبيعية",
    description:
      "Embrace the gentle care of our Pure Balance Cleanser. This sulfate-free shampoo delicately cleanses, preserving your hair's natural moisture and shine. The product is sulfate, parabens, and silicon free.",
    ar_description:
      "اعتني برفق بشعرك مع شامبو سموزي سنيس الخالي من السلفيت والبارابين والسيليكون. احصلي علي اعلي ترطيب وعناية بدون ضرر.",
    image:
      "https://res.cloudinary.com/atefcloud/image/upload/v1692691656/smoothy-cleanser---sulfate-free-shampoo.jpg",
  },
  {
    title: "SMOOTHY CONDITIONER",
    price: 139,
    category: "Hair Conditioner",
    ar_category: "بلسم للشعر",
    usage: "Conditions and revitalizes hair.",
    ar_usage: "يكيف الشعر ويعيد له حيويته",
    ingredients: "Natural ingredients",
    ar_ingredients: "مكونات طبيعية",
    description:
      "Indulge your hair in the splendor of our Silken Splendor Conditioner. Enriched with luxurious ingredients, it detangles, nourishes, and leaves your hair irresistibly soft and smooth.",
    ar_description:
      "أسعدي شعرك بروعة بلسم الحرير لدينا. معزز بمكونات فاخرة، يفك تشابك الشعر، يغذيه، ويجعله ناعمًا وسلسًا بشكل لا يقاوم.",
    image:
      "https://res.cloudinary.com/atefcloud/image/upload/v1692691593/smoothy-conditioner---rinse-out-hair-conditioner.jpg",
  },
  {
    title: "SMOOTHY MASK",
    price: 333,
    category: "Hair Mask",
    ar_category: "حمام للشعر",
    usage: "Repairs damaged hair",
    ar_usage: "يقوم باصلاح الشعر التالف",
    ingredients: "Natural ingredients",
    ar_ingredients: "مكونات طبيعية",
    description:
      "Immerse your hair in the enchanting experience of our Botanical Bliss Hair Mask. Infused with a harmonious blend of botanical extracts, this luxurious mask deeply nourishes, repairs, and rejuvenates your hair, unveiling a heavenly radiance and silkiness.",
    ar_description:
      "غطِّوا شعركم بتجربة ساحرة مع قناع الشعر النباتي لدينا. يتكون من خليط متجانس من مستخلصات النباتات، يغذي هذا القناع الفاخر الشعر بعمق، ويصلحه، ويجدد، مكشوفًا إشراقًا سماويًا ونعومة حريرية.",
    image:
      "https://res.cloudinary.com/atefcloud/image/upload/v1692691525/botanical-bliss-hair-mask---hair-mask.jpg",
  },
  {
    title: "SMOOTHY GROWTH SERUM",
    price: 109,
    category: "Oily Hair Serum",
    ar_category: "سيرم زيتي للشعر",
    usage: "For hair growth and strength.",
    ar_usage: "لانبات الشعر وتغذيته وتقويته",
    ingredients: "Natural ingredients",
    ar_ingredients: "مكونات طبيعية",
    description:
      "Embrace the magic of our Hair Renewal Elixir. This powerful oil serum revitalizes thinning hair, stimulating growth and restoring its natural luster & fullness.",
    ar_description:
      "احتضنوا سحر إكسير تجديد الشعر المتساقط لدينا. ينشط هذا السيروم الزيتي الفعال نمو الشعر الرقيق ويعيد له امتلاءه ولمعانه الطبيعي.",
    image:
      "https://res.cloudinary.com/atefcloud/image/upload/v1692691238/hair-renewal-elixir---hair-loss-oil-serum.jpg",
  },
  {
    title: "SMOOTHY SHINE & REPAIR",
    price: 131,
    category: "Aqueous Hair Serum",
    ar_category: "سيرم مائي للشعر",
    usage: "Improves hair look, shine and quality.",
    ar_usage: "يحسن من مظهر الشعر ولمعانه وجودته.",
    ingredients: "Natural ingredients",
    ar_ingredients: "مكونات طبيعية",
    description:
      "Experience the revitalizing touch of our Aqua Essence Reviver. This water-based serum hydrates and nourishes, leaving your hair refreshed and rejuvenated.",
    ar_description:
      "اكتشفوا لمسة الإحياء المنعشة لمنتجنا. يرطب هذا السيروم القائم على الماء ويغذي بصيلات الشعر، مما يجعل شعركم منتعشًا ومجددًا ولامعا يقاوم الهيشان والحرارة.",
    image:
      "https://res.cloudinary.com/atefcloud/image/upload/v1692691159/aqua-essence-reviver---hair-water-based-serum.jpg",
  },
  {
    title: "SMOOTHY REJUVENATOR",
    price: 439,
    category: "Hairloss Lotion",
    ar_category: "لوشن انبات الشعر",
    usage: "Prevents hairloss.",
    ar_usage: "يمنع تساقط الشعر",
    ingredients: "Natural ingredients",
    ar_ingredients: "مكونات طبيعية",
    description:
      "Revive your tresses with our Tress Rejuvenator. This potent hair loss lotion nourishes the scalp, promoting healthier, fuller-looking hair. Forget about your hair loss with Tress Rejuvenator.",
    ar_description:
      "أحيوا خصلاتكم مع محفز الشعر لدينا. يغذي هذا اللوشن الفعال فروة الرأس، معززًا صحة الشعر وجعله أكثر امتلاءً. انسي تساقط الشعر معنا.",
    image:
      "https://res.cloudinary.com/atefcloud/image/upload/v1692691453/tress-rejuvenator---hair-loss-lotion.png",
  },
];

const seederIndex = async (req, res) => {
  try {
    products.forEach(async (p) => {
      await Product.create({
        ...p,
        slug: slugify(p.title),
      });
    });

    res.send({ message: "Products seeded." });
  } catch (e) {
    if (e.code) {
      res.status(500).send("hey");
    }
    res.status(500).send(e);
  }
};

module.exports = { seederIndex };
