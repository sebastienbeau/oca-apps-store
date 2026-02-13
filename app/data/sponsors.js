// ~/data/sponsors.js
export const sponsorships = [
  {
    "id": 3,
    "level": "platinum",
    "title": "Become a Platinum Sponsor",
    "description": "We've built a strong, lasting partnership. Their trust is our driving force, propelling us towards shared success.",
    "links": [{
      "label": "Become a Sponsor",
      "color": "primary",
      "variant": "solid",
      "trailingIcon": "ion:rocket-outline"
    }]

  },
  {
    "id": 2,
    "level": "gold",
    "title": "Become a Gold Sponsor",
    "description": "We've built a strong, lasting partnership. Their trust is our driving force, propelling us towards shared success.",
    "links": [{
      "label": "Become a Sponsor",
      "color": "primary",
      "variant": "solid",
      "trailingIcon": "ion:rocket-outline",
    }]

  },
  {
    "id": 1,
    "level": "silver",
    "title": "Become a Silver Sponsor",
    "description": "We've built a strong, lasting partnership. Their trust is our driving force, propelling us towards shared success.",
    "links": [{
      "label": "Become a Sponsor",
      "color": "primary",
      "variant": "solid",
      "trailingIcon": "ion:rocket-outline",
    }]

  },
]
export const sponsors = [
  {
    name: 'ACSONE SA/NV',
    id: 5,
    is_integrator: true,
    logo_urls: {
      s: 'https://example.com/logo/acsone_s.png',
      m: 'https://example.com/logo/acsone_m.png',
      l: 'https://example.com/logo/acsone_l.png',
      alt: 'ACSONE SA/NV',
    },
    sponsor_level: {
      id: 3,
      name: 'gold',
    },
    sponsor_rank: 1,
    email: 'admin@acsone.eu',
    phone: '+352 20 21 10 20',
    website: 'https://www.acsone.eu',
    countries: [
      {
        code: 'BE',
        label: 'Belgium',
      },
      {
        code: 'FR',
        label: 'France',
      },
    ],
    description_short: 'We are software engineering professionals. With a proven track record...',
    description_long: 'We are software engineering professionals.<br />With a proven track record...',
    description_why_oca: 'Lorem ipsum<br />dolor sit amet',
    members_count: 6,
    contributors_count: 4,
    contributors_index: 10,
    stories: [
      {
        cover_url: 'https://example.com/story1.jpg',
        title: 'Lorem ipsum',
        teaser: 'Lorem ipsum',
        relative_url: '/blog/xx/xx',
      },
    ],
    industries: [
      {
        name: 'Consulting',
        description: 'Lorem ipsum',
      },
    ],
  },
  {
    name: 'TechSolutions Ltd',
    id: 8,
    is_integrator: true,
    logo_urls: {
      s: 'https://example.com/logo/techsol_s.png',
      m: 'https://example.com/logo/techsol_m.png',
      l: 'https://example.com/logo/techsol_l.png',
      alt: 'TechSolutions Ltd',
    },
    sponsor_level: {
      id: 2,
      name: 'silver',
    },
    sponsor_rank: 2,
    email: 'contact@techsol.com',
    phone: '+33 1 23 45 67 89',
    website: 'https://www.techsol.com',
    countries: [
      {
        code: 'FR',
        label: 'France',
      },
      {
        code: 'DE',
        label: 'Germany',
      },
    ],
    description_short: 'Innovative tech solutions for modern businesses...',
    description_long: 'Innovative tech solutions for modern businesses.<br />We focus on scalability and efficiency...',
    description_why_oca: 'Lorem ipsum<br />dolor sit amet',
    members_count: 12,
    contributors_count: 7,
    contributors_index: 15,
    stories: [
      {
        cover_url: 'https://example.com/story2.jpg',
        title: 'Tech for Tomorrow',
        teaser: 'Innovation at its best',
        relative_url: '/blog/yy/yy',
      },
    ],
    industries: [
      {
        name: 'IT Services',
        description: 'Cutting-edge IT solutions',
      },
    ],
  },
  {
    name: 'OpenSource Partners',
    id: 12,
    is_integrator: false,
    logo_urls: {
      s: 'https://example.com/logo/osp_s.png',
      m: 'https://example.com/logo/osp_m.png',
      l: 'https://example.com/logo/osp_l.png',
      alt: 'OpenSource Partners',
    },
    sponsor_level: {
      id: 1,
      name: 'bronze',
    },
    sponsor_rank: 3,
    email: 'info@ospartners.org',
    phone: '+44 20 7946 0958',
    website: 'https://www.ospartners.org',
    countries: [
      {
        code: 'UK',
        label: 'United Kingdom',
      },
    ],
    description_short: 'Promoting open-source solutions worldwide...',
    description_long: 'Promoting open-source solutions worldwide.<br />We believe in transparency and collaboration...',
    description_why_oca: 'Lorem ipsum<br />dolor sit amet',
    members_count: 8,
    contributors_count: 5,
    contributors_index: 12,
    stories: [
      {
        cover_url: 'https://example.com/story3.jpg',
        title: 'Open Source for All',
        teaser: 'Empowering communities',
        relative_url: '/blog/zz/zz',
      },
    ],
    industries: [
      {
        name: 'Open Source',
        description: 'Community-driven projects',
      },
    ],
  },
  {
    name: 'Innovatech',
    id: 15,
    is_integrator: true,
    logo_urls: {
      s: 'https://example.com/logo/innovatech_s.png',
      m: 'https://example.com/logo/innovatech_m.png',
      l: 'https://example.com/logo/innovatech_l.png',
      alt: 'Innovatech',
    },
    sponsor_level: {
      id: 3,
      name: 'gold',
    },
    sponsor_rank: 4,
    email: 'hello@innovatech.com',
    phone: '+1 555 123 4567',
    website: 'https://www.innovatech.com',
    countries: [
      {
        code: 'US',
        label: 'United States',
      },
    ],
    description_short: 'Driving innovation through technology...',
    description_long: 'Driving innovation through technology.<br />We specialize in AI and automation...',
    description_why_oca: 'Lorem ipsum<br />dolor sit amet',
    members_count: 20,
    contributors_count: 10,
    contributors_index: 25,
    stories: [
      {
        cover_url: 'https://example.com/story4.jpg',
        title: 'AI Revolution',
        teaser: 'Transforming industries',
        relative_url: '/blog/aa/aa',
      },
    ],
    industries: [
      {
        name: 'Artificial Intelligence',
        description: 'AI-driven solutions',
      },
    ],
  },
  {
    name: 'CloudMasters',
    id: 18,
    is_integrator: true,
    logo_urls: {
      s: 'https://example.com/logo/cloudmasters_s.png',
      m: 'https://example.com/logo/cloudmasters_m.png',
      l: 'https://example.com/logo/cloudmasters_l.png',
      alt: 'CloudMasters',
    },
    sponsor_level: {
      id: 2,
      name: 'silver',
    },
    sponsor_rank: 5,
    email: 'support@cloudmasters.io',
    phone: '+49 30 12345678',
    website: 'https://www.cloudmasters.io',
    countries: [
      {
        code: 'DE',
        label: 'Germany',
      },
    ],
    description_short: 'Cloud solutions for businesses of all sizes...',
    description_long: 'Cloud solutions for businesses of all sizes.<br />Secure, scalable, and reliable...',
    description_why_oca: 'Lorem ipsum<br />dolor sit amet',
    members_count: 15,
    contributors_count: 8,
    contributors_index: 20,
    stories: [
      {
        cover_url: 'https://example.com/story5.jpg',
        title: 'Cloud Transformation',
        teaser: 'Migrating to the cloud',
        relative_url: '/blog/bb/bb',
      },
    ],
    industries: [
      {
        name: 'Cloud Computing',
        description: 'Cloud infrastructure',
      },
    ],
  },
  {
    name: 'DataWise',
    id: 20,
    is_integrator: false,
    logo_urls: {
      s: 'https://example.com/logo/datawise_s.png',
      m: 'https://example.com/logo/datawise_m.png',
      l: 'https://example.com/logo/datawise_l.png',
      alt: 'DataWise',
    },
    sponsor_level: {
      id: 1,
      name: 'bronze',
    },
    sponsor_rank: 6,
    email: 'contact@datawise.co',
    phone: '+31 20 123 4567',
    website: 'https://www.datawise.co',
    countries: [
      {
        code: 'NL',
        label: 'Netherlands',
      },
    ],
    description_short: 'Data analytics and business intelligence...',
    description_long: 'Data analytics and business intelligence.<br />Turning data into insights...',
    description_why_oca: 'Lorem ipsum<br />dolor sit amet',
    members_count: 10,
    contributors_count: 6,
    contributors_index: 18,
    stories: [
      {
        cover_url: 'https://example.com/story6.jpg',
        title: 'Data-Driven Decisions',
        teaser: 'Unlocking business potential',
        relative_url: '/blog/cc/cc',
      },
    ],
    industries: [
      {
        name: 'Data Analytics',
        description: 'Business intelligence',
      },
    ],
  },
  {
    name: 'EcoSolutions',
    id: 22,
    is_integrator: true,
    logo_urls: {
      s: 'https://example.com/logo/ecosol_s.png',
      m: 'https://example.com/logo/ecosol_m.png',
      l: 'https://example.com/logo/ecosol_l.png',
      alt: 'EcoSolutions',
    },
    sponsor_level: {
      id: 3,
      name: 'gold',
    },
    sponsor_rank: 7,
    email: 'info@ecosolutions.org',
    phone: '+34 91 123 4567',
    website: 'https://www.ecosolutions.org',
    countries: [
      {
        code: 'ES',
        label: 'Spain',
      },
    ],
    description_short: 'Sustainable solutions for a greener future...',
    description_long: 'Sustainable solutions for a greener future.<br />Innovating for the planet...',
    description_why_oca: 'Lorem ipsum<br />dolor sit amet',
    members_count: 18,
    contributors_count: 9,
    contributors_index: 22,
    stories: [
      {
        cover_url: 'https://example.com/story7.jpg',
        title: 'Green Innovation',
        teaser: 'Building a sustainable world',
        relative_url: '/blog/dd/dd',
      },
    ],
    industries: [
      {
        name: 'Sustainability',
        description: 'Eco-friendly technologies',
      },
    ],
  },
  {
    name: 'FinTech Experts',
    id: 1,
    is_integrator: false,
    logo_urls: {
      s: 'https://2innovateit.com/wp-content/uploads/2024/03/Fintech-Expert-e1710541506781-768x335.jpg',
      m: 'https://2innovateit.com/wp-content/uploads/2024/03/Fintech-Expert-e1710541506781-768x335.jpg',
      l: 'https://2innovateit.com/wp-content/uploads/2024/03/Fintech-Expert-e1710541506781-768x335.jpg',
      alt: 'FinTech Experts',
    },
    sponsor_level: {
      id: 2,
      name: 'silver',
    },
    sponsor_rank: 8,
    email: 'hello@fintechexperts.com',
    phone: '+41 44 123 4567',
    website: 'https://www.fintechexperts.com',
    countries: [
      {
        code: 'CH',
        label: 'Switzerland',
      },
       {
        code: 'IT',
        label: 'Italy',
      },
    ],
    description_short: 'Financial technology solutions for modern banking...',
    description_long: 'We are software engineering professionals. With a proven track record going back over the last 20+ years, we take pride at developing durable and reliable software systems for our clients to help them achieve  their goals. In addition to a background in information  technology, engineering or consultancy, our experts have accumulated  strong competencies in project management and software development  methodologies. These skills are the keys with which we build and deliver advanced software systems that are intuitive, flexible, and reliable. Quality and openness being at the core of our values and design principles, our solutions are naturally based on Open Standards and Open Source  technologies.',
    description_why_oca: 'Lorem ipsum<br />dolor sit amet',
    members_count: 14,
    contributors_count: 7,
    contributors_index: 19,
    stories: [
      {
        cover_url: 'https://example.com/story8.jpg',
        title: 'Future of Banking',
        teaser: 'Revolutionizing finance',
        relative_url: '/blog/ee/ee',
      },
    ],
    industries: [
      {
        name: 'FinTech',
        description: 'Financial innovation',
      },
    ],
  },
  {
    name: 'HealthTech Innovators',
    id: 28,
    is_integrator: true,
    logo_urls: {
      s: 'https://example.com/logo/healthtech_s.png',
      m: 'https://example.com/logo/healthtech_m.png',
      l: 'https://example.com/logo/healthtech_l.png',
      alt: 'HealthTech Innovators',
    },
    sponsor_level: {
      id: 1,
      name: 'bronze',
    },
    sponsor_rank: 9,
    email: 'contact@healthtechinnovators.com',
    phone: '+39 06 12345678',
    website: 'https://www.healthtechinnovators.com',
    countries: [
      {
        code: 'IT',
        label: 'Italy',
      },
    ],
    description_short: 'Transforming healthcare with technology...',
    description_long: 'Transforming healthcare with technology.<br />Improving patient outcomes...',
    description_why_oca: 'Lorem ipsum<br />dolor sit amet',
    members_count: 16,
    contributors_count: 8,
    contributors_index: 21,
    stories: [
      {
        cover_url: 'https://example.com/story9.jpg',
        title: 'Healthcare Revolution',
        teaser: 'Innovating for better health',
        relative_url: '/blog/ff/ff',
      },
    ],
    industries: [
      {
        name: 'HealthTech',
        description: 'Healthcare innovation',
      },
    ],
  },
  {
    name: 'EduTech Leaders',
    id: 30,
    is_integrator: false,
    logo_urls: {
      s: 'https://example.com/logo/edutech_s.png',
      m: 'https://example.com/logo/edutech_m.png',
      l: 'https://example.com/logo/edutech_l.png',
      alt: 'EduTech Leaders',
    },
    sponsor_level: {
      id: 3,
      name: 'gold',
    },
    sponsor_rank: 10,
    email: 'info@edutechleaders.com',
    phone: '+351 21 123 4567',
    website: 'https://www.edutechleaders.com',
    countries: [
      {
        code: 'PT',
        label: 'Portugal',
      },
    ],
    description_short: 'Empowering education through technology...',
    description_long: 'Empowering education through technology.<br />Creating smarter learning environments...',
    description_why_oca: 'Lorem ipsum<br />dolor sit amet',
    members_count: 22,
    contributors_count: 12,
    contributors_index: 28,
    stories: [
      {
        cover_url: 'https://example.com/story10.jpg',
        title: 'Education for All',
        teaser: 'Bridging the learning gap',
        relative_url: '/blog/gg/gg',
      },
    ],
    industries: [
      {
        name: 'EduTech',
        description: 'Educational technology',
      },
    ],
  },
]
