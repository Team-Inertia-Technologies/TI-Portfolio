import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase URL or Service Role Key missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const PROJECTS = [
  { 
    id: "alpha-aqua-pools", 
    title: "Alpha Aqua Pools", 
    sector: "Construction & Design", 
    desc: "Premium swimming pool design and maintenance services.", 
    thumbnail: "/alpha-aqua-pools.png",
    body_desc: "Alpha Aqua Pools is a premier pool design and construction company based in Goa, specializing in luxury residential, resort, and commercial poolscapes since 2004...",
    handover_date: "January 2024",
    link: "https://www.alphaaquapools.com" 
  },
  { 
    id: "coastal-suites-goa", 
    title: "Coastal Suites Goa", 
    sector: "Hospitality", 
    desc: "Luxury accommodation in the heart of Goa.", 
    thumbnail: "/coastal-suites-goa.png",
    body_desc: "Coastal Suites Goa offers high-end apartment stays for travelers...",
    handover_date: "February 2024",
    link: "https://coastalsuitesgoa.com" 
  },
  { 
    id: "river-deck-baga", 
    title: "River Deck Baga", 
    sector: "Hospitality", 
    desc: "Exquisite riverside dining experience in Baga, Goa.", 
    thumbnail: "/river-deck-baga.png",
    body_desc: "River Deck Baga is a premier riverside restaurant located in the heart of Baga, Goa...",
    handover_date: "March 2024",
    link: "https://riverdeckbaga.com" 
  },
  { 
    id: "galaxy-hospital-goa", 
    title: "Galaxy Hospital Goa", 
    sector: "Healthcare", 
    desc: "Advanced healthcare services with a patient-centric approach.", 
    thumbnail: "/galaxy-hospital-goa.png",
    body_desc: "Galaxy Hospital is a leading multi-specialty healthcare provider...",
    handover_date: "April 2024",
    link: "https://galaxyhospitalgoa.com" 
  },
  { 
    id: "ichos", 
    title: "iChos", 
    sector: "Technology", 
    desc: "Innovative audio-visual solutions for modern spaces.", 
    thumbnail: "/ichos.png",
    body_desc: "iChos provides cutting-edge AV technology for corporate and residential projects...",
    handover_date: "May 2024",
    link: "https://www.ichos.in" 
  },
  { 
    id: "ihm-bhopal", 
    title: "IHM Bhopal", 
    sector: "Education", 
    desc: "Premier institute for hospitality and hotel management.", 
    thumbnail: "/ihm-bhopal.png",
    body_desc: "The Institute of Hotel Management, Bhopal, required a robust academic portal...",
    handover_date: "June 2024",
    link: "https://ihmbhopal.ac.in" 
  },
  { 
    id: "kokansad-live", 
    title: "Kokansad Live", 
    sector: "Media", 
    desc: "Real-time news and updates from the Konkan region.", 
    thumbnail: "/kokansad-live.png",
    body_desc: "Kokansad Live is a digital news platform focusing on local stories...",
    handover_date: "July 2024",
    link: "https://www.kokansadlive.com" 
  },
  { 
    id: "shipra-foundation", 
    title: "Shipra Foundation", 
    sector: "Non-Profit", 
    desc: "Dedicated to social welfare and community development.", 
    thumbnail: "/shipra-foundation.png",
    body_desc: "Shipra Foundation works on various social causes...",
    handover_date: "August 2024",
    link: "https://shiprafoundation.org" 
  },
  { 
    id: "the-bungalow-goa", 
    title: "The Bungalow Goa", 
    sector: "Hospitality", 
    desc: "Boutique stay experience in a heritage setting.", 
    thumbnail: "/the-bungalow-goa.png",
    body_desc: "The Bungalow Goa is a heritage stay that blends tradition with modern luxury...",
    handover_date: "September 2024",
    link: "https://thebungalowgoa.com" 
  },
  { 
    id: "tiles-tower-goa", 
    title: "Tiles Tower Goa", 
    sector: "Retail", 
    desc: "Exquisite collection of tiles and sanitaryware.", 
    thumbnail: "/tiles-tower-goa.png",
    body_desc: "Tiles Tower is a leading showroom for premium building materials...",
    handover_date: "October 2024",
    link: "https://www.tilestower.com" 
  },
  { 
    id: "u-innov8", 
    title: "U-Innov8", 
    sector: "Business", 
    desc: "Fostering innovation and entrepreneurship.", 
    thumbnail: "/u-innov8.png",
    body_desc: "U-Innov8 is an innovation hub that supports startups...",
    handover_date: "November 2024",
    link: "https://u-innov8.com" 
  },
  { 
    id: "under-the-tree", 
    title: "Under The Tree", 
    sector: "E-commerce", 
    desc: "Organic and sustainable lifestyle products.", 
    thumbnail: "/under-the-tree.png",
    body_desc: "Under The Tree is an e-commerce platform for sustainable living...",
    handover_date: "December 2024",
    link: "https://underthetreegoa.com" 
  },
  { 
    id: "vida-clinics", 
    title: "Vida Clinics", 
    sector: "Healthcare", 
    desc: "Specialized healthcare for women and children.", 
    thumbnail: "/vida-clinics.png",
    body_desc: "Vida Clinics provides expert medical care in a compassionate environment...",
    handover_date: "January 2025",
    link: "https://vidagoa.com" 
  },
  { 
    id: "xisa", 
    title: "XISA", 
    sector: "Education", 
    desc: "Leading educational institution for holistic development.", 
    thumbnail: "/xisa.png",
    body_desc: "Xavier Institute of Social Action (XISA) required a modern web presence...",
    handover_date: "February 2025",
    link: "https://xisa.in" 
  },
  { 
    id: "chowgules", 
    title: "Chowgules", 
    sector: "Education", 
    desc: "Pioneers in education and industrial growth.", 
    thumbnail: "/chowgules.png",
    body_desc: "Parvatibai Chowgule College of Arts and Science’s website serves as a comprehensive portal...",
    handover_date: "March 2025",
    link: "https://www.chowgules.ac.in" 
  },
  { 
    id: "cogniflux", 
    title: "Cogniflux", 
    sector: "Education", 
    desc: "Advanced training and skill development programs.", 
    thumbnail: "/cogniflux.png",
    body_desc: "Cogniflux offers specialized training for corporate professionals...",
    handover_date: "April 2025",
    link: "https://cognifluxtrainings.com" 
  },
  { 
    id: "eleve", 
    title: "Eleve", 
    sector: "Real Estate", 
    desc: "Luxury real estate developments in Goa.", 
    thumbnail: "/eleve.png",
    body_desc: "Eleve specializes in high-end residential projects...",
    handover_date: "May 2025",
    link: "https://elevegoa.com" 
  },
  { 
    id: "eme-automations", 
    title: "EME Automations", 
    sector: "Technology", 
    desc: "Smart home and industrial automation solutions.", 
    thumbnail: "/eme-automations.png",
    body_desc: "EME Automations provides intelligent technology for modern living...",
    handover_date: "June 2025",
    link: "https://emeautomation.com" 
  },
  { 
    id: "palavi-agro", 
    title: "Palavi Agro", 
    sector: "Agriculture", 
    desc: "Sustainable agriculture and organic farming.", 
    thumbnail: "/palavi-agro.png",
    body_desc: "Palavi Agro is dedicated to promoting organic farming practices...",
    handover_date: "July 2025",
    link: "https://palaviagro.com" 
  },
  { 
    id: "fomento-realty", 
    title: "Fomento Realty", 
    sector: "Real Estate", 
    desc: "Building communities through quality real estate.", 
    thumbnail: "/fomento-realty.png",
    body_desc: "Fomento Realty is a trusted name in the real estate industry...",
    handover_date: "August 2025",
    link: "https://fomentorealty.com" 
  },
  { 
    id: "bits-biocytih", 
    title: "BITS BioCyTiH", 
    sector: "Non-Profit", 
    desc: "Innovation hub for Cyber-Physical Systems.", 
    thumbnail: "/bits-biocytih.png",
    body_desc: "BITS BioCyTiH Foundation (BBF) is a non-profit innovation hub set up by BITS Pilani and funded by the Government of India under the National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS).",
    handover_date: "April 2025",
    link: "https://biocytih.co.in" 
  },
  { 
    id: "rexes-bpo", 
    title: "Rexes BPO", 
    sector: "Business", 
    desc: "Leading BPO solutions for customer support and data management.", 
    thumbnail: "/rexes-bpo.png",
    body_desc: "Rexes BPO Solutions is a Goa-based business process outsourcing company offering a range of call center and data management services to both international and local clients.",
    handover_date: "April 2026",
    link: "https://rexesbpo.com" 
  }
];

async function migrate() {
  console.log('Starting migration...');
  
  const mappedProjects = PROJECTS.map(p => ({
    id: p.id,
    title: p.title,
    sector: p.sector,
    description: p.desc,
    thumbnail: p.thumbnail,
    body_desc: p.body_desc,
    handover_date: p.handover_date,
    link: p.link
  }));

  const { data, error } = await supabase
    .from('projects')
    .upsert(mappedProjects, { onConflict: 'id' });

  if (error) {
    console.error('Migration failed:', error);
  } else {
    console.log('Migration successful! Inserted/Updated', PROJECTS.length, 'projects.');
  }
}

migrate();
