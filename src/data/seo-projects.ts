import media1 from "@/assets/seo-projects/client-1.png.asset.json";
import media2 from "@/assets/seo-projects/client-2.png.asset.json";
import media3 from "@/assets/seo-projects/client-3.png.asset.json";
import media4 from "@/assets/seo-projects/client-4.webp.asset.json";
import media5 from "@/assets/seo-projects/client-5.png.asset.json";
import media6 from "@/assets/seo-projects/client-6.webp.asset.json";
import media7 from "@/assets/seo-projects/client-7.webp.asset.json";
import media8 from "@/assets/seo-projects/client-8.jpg.asset.json";
import media9 from "@/assets/seo-projects/client-9.jpg.asset.json";
import media10 from "@/assets/seo-projects/client-10.jpg.asset.json";
import media11 from "@/assets/seo-projects/client-11.png.asset.json";
import media12 from "@/assets/seo-projects/client-12.jpg.asset.json";
import media13 from "@/assets/seo-projects/client-13.png.asset.json";
import media15 from "@/assets/seo-projects/client-15.webp.asset.json";
import media16 from "@/assets/seo-projects/client-16.png.asset.json";
import media17 from "@/assets/seo-projects/client-17.svg.asset.json";
import media18 from "@/assets/seo-projects/client-18.png.asset.json";
import media19 from "@/assets/seo-projects/client-19.jpg.asset.json";
import media20 from "@/assets/seo-projects/client-20.jpg.asset.json";
import media21 from "@/assets/seo-projects/client-21.png.asset.json";
import media22 from "@/assets/seo-projects/client-22.png.asset.json";
import media23 from "@/assets/seo-projects/client-23.jpg.asset.json";
import media24 from "@/assets/seo-projects/client-24.png.asset.json";

export type SeoProject = {
  id: number;
  name: string;
  industry: string;
  website: string;
  rankingLabel: string;
  rankings: { keyword: string; position: number }[];
  logo?: string;
  market?: string;
  description?: string;
  image?: string;
  verificationDate?: string;
};
// Source-reported positions, not a live ranking check. No verification date provided.
export const seoProjects: SeoProject[] = [
  {
    id: 1,
    industry: "Astrology",
    website: "https://www.kaalsarpmangaldoshpujainujjain.com",
    rankingLabel: "Google India Rankings",
    rankings: [
      { keyword: "kaal sarp dosh puja ujjain", position: 4 },
      { keyword: "kaal sarp puja ujjain", position: 5 },
      { keyword: "mangal dosh puja ujjain", position: 8 },
      { keyword: "mahamrityunjay jaap puja ujjain", position: 9 },
    ],
    name: "Acharya Pandit Devendra Guruji",
    logo: media1.url,
  },
  {
    id: 2,
    industry: "Astrology",
    website: "https://www.kaalsarpdoshpujainujjain.co.in",
    rankingLabel: "Google India Rankings",
    rankings: [
      { keyword: "kaal sarp dosh puja ujjain", position: 5 },
      { keyword: "kaal sarp puja ujjain", position: 6 },
      { keyword: "mangal dosh puja ujjain", position: 10 },
      { keyword: "mahamrityunjay jaap puja ujjain", position: 7 },
    ],
    name: "Pandit Arun Guruji",
    logo: media2.url,
  },
  {
    id: 3,
    industry: "Astrology",
    website: "https://www.kalsarpdoshpujaujjain.co.in",
    rankingLabel: "Google India Rankings",
    rankings: [
      { keyword: "kaal sarp dosh puja ujjain", position: 6 },
      { keyword: "mahamrityunjay jaap puja ujjain", position: 1 },
      { keyword: "ujjain kaal sarp dosh puja", position: 3 },
      { keyword: "mangal dosh puja ujjain", position: 7 },
    ],
    name: "Acharya Ashu Sharma",
    logo: media3.url,
  },
  {
    id: 4,
    industry: "Astrology",
    website: "https://www.kalsarpdoshpooja.in",
    rankingLabel: "Google India Rankings",
    rankings: [
      { keyword: "kaal sarp dosh puja ujjain", position: 8 },
      { keyword: "kaal sarp puja ujjain", position: 7 },
      { keyword: "mangal dosh puja ujjain", position: 10 },
      { keyword: "mahamrityunjay jaap puja ujjain", position: 6 },
    ],
    name: "Jyotishacharya Pandit Deepak Krishna Shastri",
    logo: media4.url,
  },
  {
    id: 5,
    industry: "Construction",
    website: "https://www.arrowairconditioning.com.au",
    rankingLabel: "Google Australia Rankings",
    rankings: [
      { keyword: "ac repair Sydney", position: 4 },
      { keyword: "air conditioning installation service in Sydney", position: 1 },
      { keyword: "ac installation expert sydney", position: 1 },
      { keyword: "air conditioning sydney", position: 1 },
      { keyword: "ac maintenance Sydney", position: 1 },
    ],
    name: "Arrow Air Conditioning",
    logo: media5.url,
  },
  {
    id: 6,
    industry: "Education",
    website: "https://www.catalyser.in",
    rankingLabel: "Google Ranking",
    rankings: [
      { keyword: "ntse coaching in indore", position: 2 },
      { keyword: "ntse coaching institute in Indore", position: 2 },
      { keyword: "jee coaching in Indore", position: 3 },
      { keyword: "jee mains coaching in Indore", position: 4 },
      { keyword: "ntse coaching in mhow", position: 4 },
    ],
    name: "Catalyser",
    logo: media6.url,
  },
  {
    id: 7,
    industry: "Construction",
    website: "https://cornerstonefenceco.com",
    rankingLabel: "Google USA Rankings",
    rankings: [
      { keyword: "Cornerstone Fencing", position: 1 },
      { keyword: "Cornerstone Fence Company", position: 1 },
      { keyword: "Fencing In Ct", position: 8 },
      { keyword: "Ct Fence Contractors", position: 7 },
      { keyword: "Fence Companies In Ct", position: 8 },
    ],
    name: "Cornerstone Fence",
    logo: media7.url,
  },
  {
    id: 8,
    industry: "Hostel Booking",
    website: "https://www.dragonflyhostels.com",
    rankingLabel: "Google Ranking",
    rankings: [
      { keyword: "Dragonfly Hostel Arequipa", position: 1 },
      { keyword: "Dragonfly Hostel Miraflores", position: 1 },
      { keyword: "Dragonfly Hostels Lima Peru", position: 4 },
      { keyword: "Dragonfly Hostel Lima", position: 4 },
      { keyword: "Hostel Miraflores", position: 4 },
    ],
    name: "Dragonfly Hostels",
    logo: media8.url,
  },
  {
    id: 9,
    industry: "Education",
    website: "https://londonspeechworkshop.com",
    rankingLabel: "Google UK Rankings",
    rankings: [
      { keyword: "accent reduction course london", position: 1 },
      { keyword: "accent softening course London", position: 3 },
      { keyword: "Public speaking classes london", position: 1 },
      { keyword: "public speaking course london", position: 2 },
      { keyword: "Corporate communication workshops london", position: 2 },
    ],
    name: "London Speech Workshop",
    logo: media9.url,
  },
  {
    id: 10,
    industry: "eCommerce",
    website: "https://www.humaxdirect.co.uk",
    rankingLabel: "Google UK Ranking",
    rankings: [
      { keyword: "Freeview recorder box", position: 2 },
      { keyword: "Freeview box recorder", position: 1 },
      { keyword: "Freeview HD box recorder", position: 4 },
      { keyword: "Set top box recorder", position: 4 },
      { keyword: "Freeview recordable box", position: 3 },
    ],
    name: "HUMAX",
    logo: media10.url,
  },
  {
    id: 11,
    industry: "Horticulture",
    website: "https://www.dejex.co.uk",
    rankingLabel: "Google UK Rankings",
    rankings: [
      { keyword: "wholesale fertilisers", position: 3 },
      { keyword: "Wholesale plant pots supplier uk", position: 4 },
      { keyword: "Plant pots uk wholesale", position: 4 },
      { keyword: "commercial horticulture supplies", position: 2 },
      { keyword: "Horticulture supplies uk", position: 6 },
    ],
    name: "Dejex",
    logo: media11.url,
  },
  {
    id: 12,
    industry: "Solar Panel",
    website: "https://www.projectsolaruk.com",
    rankingLabel: "Google UK Rankings",
    rankings: [
      { keyword: "Solar Companies UK", position: 3 },
      { keyword: "Solar Panels brighton", position: 3 },
      { keyword: "Solar Panels nottingham", position: 3 },
      { keyword: "Solar Panels liverpool", position: 2 },
      { keyword: "Solar Panels swansea", position: 2 },
      { keyword: "Solar Panels newcastle", position: 3 },
    ],
    name: "Project Solar UK",
    logo: media12.url,
  },
  {
    id: 13,
    industry: "Home Improvements",
    website: "https://www.thomaselectrical.co.uk",
    rankingLabel: "Google Ranking (google.co.uk)",
    rankings: [
      { keyword: "panel building services", position: 2 },
      { keyword: "electrical contractor sawbridgeworth", position: 1 },
      { keyword: "electrical contractor hertfortshire", position: 2 },
      { keyword: "electrical engineering and specialist hertfortshire", position: 1 },
      { keyword: "electrical contractor Buntingfrd", position: 2 },
    ],
    name: "Thomas Electrical",
    logo: media13.url,
  },
  {
    id: 14,
    industry: "Health Care",
    website: "https://www.family-psychiatry.com",
    rankingLabel: "Google Ranking (google.com)",
    rankings: [
      { keyword: "family psychiatry", position: 1 },
      { keyword: "child and family psychiatry", position: 4 },
      { keyword: "online psychiatry", position: 3 },
      { keyword: "Mental health specialist seattle", position: 5 },
      { keyword: "family psychiatric services", position: 3 },
    ],
    name: "Family Psychiatry",
  },
  {
    id: 15,
    industry: "Home Imrovements",
    website: "https://www.clean-group.com.au",
    rankingLabel: "Google Australia Rankings",
    rankings: [
      { keyword: "sugar soap for walls", position: 2 },
      { keyword: "bond cleaning", position: 3 },
      { keyword: "general cleaning sydney", position: 2 },
      { keyword: "commercial cleaning Sydney", position: 1 },
    ],
    name: "Clean Group",
    logo: media15.url,
  },
  {
    id: 16,
    industry: "HealthCare",
    website: "https://www.medlinks.in",
    rankingLabel: "Google Ranking",
    rankings: [
      { keyword: "skin whitening treatment in India", position: 4 },
      { keyword: "best prp treatment in India", position: 5 },
      { keyword: "skin whitening treatment cost", position: 7 },
      { keyword: "whitening treatment in India", position: 2 },
    ],
    name: "MedLinks",
    logo: media16.url,
  },
  {
    id: 17,
    industry: "Automobile",
    website: "https://www.freemotionshop.com",
    rankingLabel: "Google Ranking",
    rankings: [
      { keyword: "currus scooter", position: 1 },
      { keyword: "currus", position: 1 },
      { keyword: "currus electric scooter", position: 1 },
      { keyword: "currus panthe", position: 3 },
    ],
    name: "FreeMotion",
    logo: media17.url,
  },
  {
    id: 18,
    industry: "Automobile",
    website: "https://www.currusmotors.com",
    rankingLabel: "Google Ranking",
    rankings: [
      { keyword: "buy electric unicycle", position: 2 },
      { keyword: "euc unicycle", position: 3 },
      { keyword: "electric unicycle", position: 5 },
      { keyword: "currus nf", position: 1 },
    ],
    name: "CURRUS",
    logo: media18.url,
  },
  {
    id: 19,
    industry: "HealthCare",
    website: "https://www.skincancerclinic.net.au",
    rankingLabel: "Google Ranking",
    rankings: [
      { keyword: "Skin Cancer Clinic", position: 4 },
      { keyword: "Skin Cancer Clinic Melbourne", position: 6 },
      { keyword: "Skin Clinic Melbourne", position: 7 },
      { keyword: "Skin Clinic", position: 5 },
      { keyword: "Skin Specialist Melbourne", position: 6 },
    ],
    name: "Skin Cancer Assessment and Treatment Centre",
    logo: media19.url,
  },
  {
    id: 20,
    industry: "Online shopping company",
    website: "https://www.medusasmakeup.com",
    rankingLabel: "Google Ranking",
    rankings: [
      { keyword: "body glitter", position: 2 },
      { keyword: "mineral eyeshadow", position: 3 },
      { keyword: "bright lipstick", position: 3 },
      { keyword: "pigment eyeshadow", position: 5 },
    ],
    name: "Medusa’s Makeup",
    logo: media20.url,
  },
  {
    id: 21,
    industry: "Law Firm",
    website: "https://www.lawteam.com",
    rankingLabel: "Google Ranking",
    rankings: [
      { keyword: "Boca Raton Auto Accident Attorney", position: 4 },
      { keyword: "Auto Accident Attorney Port St Lucie", position: 1 },
      { keyword: "Bike Accident Attorney Port St Lucie", position: 5 },
    ],
    name: "Fetterman & Associates",
    logo: media21.url,
  },
  {
    id: 22,
    industry: "Law Firm",
    website: "https://www.leiferlaw.com",
    rankingLabel: "Google Ranking",
    rankings: [
      { keyword: "Boca Raton Personal Injury Lawyer", position: 1 },
      { keyword: "Car Accident Attorney Port st Lucie", position: 1 },
      { keyword: "Boca Raton Car Accident Attorney", position: 6 },
    ],
    name: "Leifer Law Firm",
    logo: media22.url,
  },
  {
    id: 23,
    industry: "eCommerce Portfolio Website",
    website: "https://www.nodusrug.it",
    rankingLabel: "Google Ranking (Italy)",
    rankings: [
      { keyword: "nodus", position: 1 },
      { keyword: "nodus tappeti", position: 1 },
      { keyword: "carpet rug", position: 4 },
      { keyword: "massimo gardone", position: 5 },
      { keyword: "Carpet design", position: 7 },
    ],
    name: "NODUS",
    logo: media23.url,
  },
  {
    id: 24,
    industry: "Automobile",
    website: "https://www.jcpcarparts.co.nz",
    rankingLabel: "Google Ranking (google.co.nz)",
    rankings: [
      { keyword: "Auto Parts Sales", position: 4 },
      { keyword: "Car Wreckers Takanini", position: 1 },
      { keyword: "Junk Car", position: 2 },
      { keyword: "Honda Parts Auckland", position: 1 },
      { keyword: "Toyota car parts Auckland", position: 1 },
    ],
    name: "JCP Japanese Car Parts",
    logo: media24.url,
  },
];
