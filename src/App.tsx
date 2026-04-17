/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Linkedin, Instagram, Facebook, Twitter, Menu, X, CheckCircle2, Monitor, Globe, Code, ExternalLink, Search, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const PROJECTS = [
  { 
    id: "alpha-aqua-pools", 
    title: "Alpha Aqua Pools", 
    sector: "Construction & Design", 
    desc: "Premium swimming pool design and maintenance services.", 
    thumbnail: "/alpha-aqua-pools.png",
    bodyDesc: "Alpha Aqua Pools is a premier pool design and construction company based in Goa, specializing in luxury residential, resort, and commercial poolscapes since 2004. The company offers end-to-end services, including custom swimming pool construction, maintenance, remodeling, and installation of fountains, spas, and premium pool equipment. With a focus on high-quality craftsmanship, Alpha Aqua Pools combines artistry with engineering to create visually stunning and functional aquatic spaces tailored to clients’ unique requirements.\n\nBeyond construction, the company provides a curated selection of pool products and accessories, from filtration systems to deck furniture, ensuring that every pool remains pristine and stylish. Their portfolio showcases a variety of projects across Goa, highlighting expertise in bespoke designs and sophisticated water features. Founded by Diana and Arvind Braganza, the brand emphasizes hands-on service, attention to detail, and turnkey solutions, positioning itself as Goa’s trusted authority for luxury pools.",
    handoverDate: "January 2024",
    link: "https://www.alphaaquapools.com" 
  },
  { 
    id: "coastal-suites-goa", 
    title: "Coastal Suites Goa", 
    sector: "Hospitality", 
    desc: "Luxury accommodation in the heart of Goa.", 
    thumbnail: "/coastal-suites-goa.png",
    bodyDesc: "Coastal Suites Goa offers high-end apartment stays for travelers. Our team built a responsive booking platform that highlights the property's amenities and prime location, ensuring a seamless reservation experience for guests looking for a home away from home in Goa.\n\nThe platform integrates real-time availability and secure payment gateways, providing a reliable and efficient booking process. The design focuses on high-resolution imagery and intuitive navigation to showcase the property's unique features.",
    handoverDate: "February 2024",
    link: "https://coastalsuitesgoa.com" 
  },
  { 
    id: "river-deck-baga", 
    title: "River Deck Baga", 
    sector: "Hospitality", 
    desc: "Exquisite riverside dining experience in Baga, Goa.", 
    thumbnail: "/river-deck-baga.png",
    bodyDesc: "River Deck Baga is a premier riverside restaurant located in the heart of Baga, Goa. Offering a perfect blend of scenic views and culinary excellence, the restaurant specializes in fresh seafood, local Goan delicacies, and international favorites. We developed a sophisticated digital presence that captures the vibrant atmosphere of the deck, featuring an interactive menu and a seamless reservation system for guests looking to enjoy a memorable meal by the water.\n\nThe website's design emphasizes the restaurant's unique location and high-quality offerings, providing potential diners with an immersive preview of the River Deck experience.",
    handoverDate: "March 2024",
    link: "https://riverdeckbaga.com" 
  },
  { 
    id: "galaxy-hospital-goa", 
    title: "Galaxy Hospital Goa", 
    sector: "Healthcare", 
    desc: "Advanced healthcare services with a patient-centric approach.", 
    thumbnail: "/galaxy-hospital-goa.png",
    bodyDesc: "Galaxy Hospital is a leading multi-specialty healthcare provider. We developed a patient-friendly website that allows for easy appointment booking, access to medical records, and detailed information about their specialized departments, enhancing the overall patient experience.\n\nThe site is designed to be accessible and informative, providing patients with the resources they need to manage their health effectively and stay informed about the hospital's services.",
    handoverDate: "April 2024",
    link: "https://galaxyhospitalgoa.com" 
  },
  { 
    id: "ichos", 
    title: "iChos", 
    sector: "Technology", 
    desc: "Innovative audio-visual solutions for modern spaces.", 
    thumbnail: "/ichos.png",
    bodyDesc: "iChos provides cutting-edge AV technology for corporate and residential projects. Our digital solution features an interactive product gallery and case studies, positioning them as experts in creating immersive sound and vision environments.\n\nThe platform allows users to explore various AV configurations and learn about the latest trends in audio-visual technology, making it a valuable resource for both professionals and enthusiasts.",
    handoverDate: "May 2024",
    link: "https://www.ichos.in" 
  },
  { 
    id: "ihm-bhopal", 
    title: "IHM Bhopal", 
    sector: "Education", 
    desc: "Premier institute for hospitality and hotel management.", 
    thumbnail: "/ihm-bhopal.png",
    bodyDesc: "The Institute of Hotel Management, Bhopal, required a robust academic portal. We built a platform that manages student admissions, faculty information, and campus news, providing a unified digital hub for the entire academic community.\n\nThe portal streamlines administrative processes and enhances communication between students and faculty, ensuring a more efficient and engaging educational experience.",
    handoverDate: "June 2024",
    link: "https://ihmbhopal.ac.in" 
  },
  { 
    id: "kokansad-live", 
    title: "Kokansad Live", 
    sector: "Media", 
    desc: "Real-time news and updates from the Konkan region.", 
    thumbnail: "/kokansad-live.png",
    bodyDesc: "Kokansad Live is a digital news platform focusing on local stories. We implemented a high-performance news engine capable of handling large traffic spikes, featuring a clean layout that prioritizes readability and quick access to breaking news.\n\nThe platform's responsive design ensures that users can stay informed on the go, with real-time updates and multimedia content that brings the news to life.",
    handoverDate: "July 2024",
    link: "https://www.kokansadlive.com" 
  },
  { 
    id: "shipra-foundation", 
    title: "Shipra Foundation", 
    sector: "Non-Profit", 
    desc: "Dedicated to social welfare and community development.", 
    thumbnail: "/shipra-foundation.png",
    bodyDesc: "Shipra Foundation works on various social causes. Our team developed a donation-centric website that transparently showcases their projects and impact, helping them build trust with their supporters and streamline their fundraising efforts.\n\nThe site features detailed project updates and financial reports, providing donors with a clear understanding of how their contributions are making a difference.",
    handoverDate: "August 2024",
    link: "https://shiprafoundation.org" 
  },
  { 
    id: "the-bungalow-goa", 
    title: "The Bungalow Goa", 
    sector: "Hospitality", 
    desc: "Boutique stay experience in a heritage setting.", 
    thumbnail: "/the-bungalow-goa.png",
    bodyDesc: "The Bungalow Goa is a heritage stay that blends tradition with modern luxury. We created an elegant web presence that captures the unique charm of the property, featuring high-quality imagery and an integrated booking engine for direct reservations.\n\nThe website's design reflects the property's historical significance while offering all the modern conveniences that today's travelers expect.",
    handoverDate: "September 2024",
    link: "https://thebungalowgoa.com" 
  },
  { 
    id: "tiles-tower-goa", 
    title: "Tiles Tower Goa", 
    sector: "Retail", 
    desc: "Exquisite collection of tiles and sanitaryware.", 
    thumbnail: "/tiles-tower-goa.png",
    bodyDesc: "Tiles Tower is a leading showroom for premium building materials. We developed a digital catalog that allows architects and homeowners to browse their extensive collection, featuring advanced filtering options to help them find the perfect products for their projects.\n\nThe catalog is regularly updated with new arrivals, ensuring that customers always have access to the latest designs and trends in the industry.",
    handoverDate: "October 2024",
    link: "https://www.tilestower.com" 
  },
  { 
    id: "u-innov8", 
    title: "U-Innov8", 
    sector: "Business", 
    desc: "Fostering innovation and entrepreneurship.", 
    thumbnail: "/u-innov8.png",
    bodyDesc: "U-Innov8 is an innovation hub that supports startups. We built a community platform that facilitates mentorship, resource sharing, and event management, creating a vibrant digital ecosystem for aspiring entrepreneurs.\n\nThe platform's interactive features encourage collaboration and knowledge sharing, helping startups to grow and succeed in a competitive market.",
    handoverDate: "November 2024",
    link: "https://u-innov8.com" 
  },
  { 
    id: "under-the-tree", 
    title: "Under The Tree", 
    sector: "E-commerce", 
    desc: "Organic and sustainable lifestyle products.", 
    thumbnail: "/under-the-tree.png",
    bodyDesc: "Under The Tree is an e-commerce platform for sustainable living. Our solution features a clean, organic design that reflects their brand values, providing a seamless shopping experience for eco-conscious consumers.\n\nThe platform includes a blog section with tips on sustainable living, further engaging their community and promoting a greener lifestyle.",
    handoverDate: "December 2024",
    link: "https://underthetreegoa.com" 
  },
  { 
    id: "vida-clinics", 
    title: "Vida Clinics", 
    sector: "Healthcare", 
    desc: "Specialized healthcare for women and children.", 
    thumbnail: "/vida-clinics.png",
    bodyDesc: "Vida Clinics provides expert medical care in a compassionate environment. We developed a patient portal that simplifies appointment scheduling and provides easy access to health resources, ensuring a supportive experience for their patients.\n\nThe portal is designed to be user-friendly and secure, protecting patient privacy while offering convenient access to important health information.",
    handoverDate: "January 2025",
    link: "https://vidagoa.com" 
  },
  { 
    id: "xisa", 
    title: "XISA", 
    sector: "Education", 
    desc: "Leading educational institution for holistic development.", 
    thumbnail: "/xisa.png",
    bodyDesc: "Xavier Institute of Social Action (XISA) required a modern web presence to showcase their academic programs and social initiatives. We built a dynamic website that highlights their commitment to excellence and community service.\n\nThe site features an interactive campus map and a news section that keeps students and faculty informed about the latest events and developments.",
    handoverDate: "February 2025",
    link: "https://xisa.in" 
  },
  { 
    id: "chowgules", 
    title: "Chowgules", 
    sector: "Education", 
    desc: "Pioneers in education and industrial growth.", 
    thumbnail: "/chowgules.png",
    bodyDesc: "Parvatibai Chowgule College of Arts and Science’s website serves as a comprehensive portal for students, faculty, alumni, and visitors. It highlights the college’s academic offerings across undergraduate, postgraduate, and Ph.D. programs, including specialized certificates. The site emphasizes its autonomous status, NAAC A+ accreditation, and recognition by NIRF, reflecting the institution’s commitment to academic excellence. Key resources such as admissions, fee structures, course details, examination notices, and placement information are easily accessible, alongside policies, forms, and student support services like counseling, mentoring, and wellness programs.\n\nThe website also showcases campus life, extracurricular activities, community outreach, and partnerships with industries and MoUs for internships and placements. News, updates, events, and notices keep users informed about the latest developments, while alumni success stories highlight the ongoing engagement and achievements of graduates. The portal integrates contact details, login portals, and quicklinks for convenient navigation, offering a clear and structured view of the college’s offerings, ethos, and student-centric environment.",
    handoverDate: "March 2025",
    link: "https://www.chowgules.ac.in" 
  },
  { 
    id: "cogniflux", 
    title: "Cogniflux", 
    sector: "Education", 
    desc: "Advanced training and skill development programs.", 
    thumbnail: "/cogniflux.png",
    bodyDesc: "Cogniflux offers specialized training for corporate professionals. Our team developed a learning management system that hosts their course content and tracks student progress, providing a scalable solution for their growing educational business.\n\nThe system includes interactive quizzes and certificates of completion, enhancing the learning experience and providing tangible value to their students.",
    handoverDate: "April 2025",
    link: "https://cognifluxtrainings.com" 
  },
  { 
    id: "eleve", 
    title: "Eleve", 
    sector: "Real Estate", 
    desc: "Luxury real estate developments in Goa.", 
    thumbnail: "/eleve.png",
    bodyDesc: "Eleve specializes in high-end residential projects. We created a sophisticated web platform that showcases their properties through immersive virtual tours and high-resolution galleries, positioning them as a leader in the luxury real estate market.\n\nThe platform's design is as elegant as the properties themselves, providing potential buyers with a truly premium browsing experience.",
    handoverDate: "May 2025",
    link: "https://elevegoa.com" 
  },
  { 
    id: "eme-automations", 
    title: "EME Automations", 
    sector: "Technology", 
    desc: "Smart home and industrial automation solutions.", 
    thumbnail: "/eme-automations.png",
    bodyDesc: "EME Automations provides intelligent technology for modern living. Our digital solution features a comprehensive product showcase and case studies, highlighting their expertise in creating efficient and secure automated environments.\n\nThe platform allows users to request custom quotes and learn about the benefits of automation for their homes and businesses.",
    handoverDate: "June 2025",
    link: "https://emeautomation.com" 
  },
  { 
    id: "palavi-agro", 
    title: "Palavi Agro", 
    sector: "Agriculture", 
    desc: "Sustainable agriculture and organic farming.", 
    thumbnail: "/palavi-agro.png",
    bodyDesc: "Palavi Agro is dedicated to promoting organic farming practices. We developed a platform that connects farmers with consumers, featuring an e-commerce store for organic produce and resources for sustainable agriculture.\n\nThe platform's mission is to make organic food more accessible while supporting local farmers and promoting environmental sustainability.",
    handoverDate: "July 2025",
    link: "https://palaviagro.com" 
  },
  { 
    id: "fomento-realty", 
    title: "Fomento Realty", 
    sector: "Real Estate", 
    desc: "Building communities through quality real estate.", 
    thumbnail: "/fomento-realty.png",
    bodyDesc: "Fomento Realty is a trusted name in the real estate industry. We built a robust property portal that allows users to explore their various residential and commercial projects, featuring advanced search and lead generation tools.\n\nThe portal is designed to be a one-stop shop for property seekers, providing all the information they need to make informed decisions about their next home or investment.",
    handoverDate: "August 2025",
    link: "https://fomentorealty.com" 
  },
  { 
    id: "bits-biocytih", 
    title: "BITS BioCyTiH", 
    sector: "Non-Profit", 
    desc: "Innovation hub for Cyber-Physical Systems.", 
    thumbnail: "/bits-biocytih.png",
    bodyDesc: "BITS BioCyTiH Foundation (BBF) is a non-profit innovation hub set up by BITS Pilani and funded by the Government of India under the National Mission on Interdisciplinary Cyber-Physical Systems (NM-ICPS). We developed a comprehensive digital platform to showcase their research initiatives, startup incubation programs, and technological breakthroughs in the field of bio-cyber-physical systems.\n\nThe website serves as a bridge between academia, industry, and government, facilitating collaboration and knowledge exchange to drive innovation in healthcare, agriculture, and environmental monitoring.",
    handoverDate: "April 2025",
    link: "https://biocytih.co.in" 
  },
  { 
    id: "rexes-bpo", 
    title: "Rexes BPO", 
    sector: "Business", 
    desc: "Leading BPO solutions for customer support and data management.", 
    thumbnail: "/rexes-bpo.png",
    bodyDesc: "Rexes BPO Solutions is a Goa-based business process outsourcing company offering a range of call center and data management services to both international and local clients. With over four years of experience, the company specializes in inbound and outbound customer support, data entry, document transcription, document digitalization, and market survey solutions.\n\nThe company emphasizes quality, efficiency, and social impact alongside its service offerings. Rexes BPO highlights its government-supported training initiatives that provide free computer education to around 300 candidates annually, focusing on empowering underrepresented communities. With an ISO-certified approach, dedicated account management, and experience serving clients in European and Australian markets, the company aims to combine global service standards with local expertise to support business growth.",
    handoverDate: "April 2026",
    link: "https://rexesbpo.com" 
  },
];

const VERTICALS = [
  { 
    title: "Design", 
    icon: <Monitor className="w-8 h-8" />, 
    desc: "Elevate your online presence with our exceptional web design services in Goa. As a distinguished website designer, we specialize in crafting SEO-friendly websites that seamlessly adapt to all devices and browsers.",
  },
  { 
    title: "Digital", 
    icon: <Globe className="w-8 h-8" />, 
    desc: "Leveraging cutting-edge techniques, our leading digital marketing agency is dedicated to delivering results. We craft highly effective digital strategies and align them with your goals, leading to increases in conversions.",
  },
  { 
    title: "Development", 
    icon: <Code className="w-8 h-8" />, 
    desc: "Empower your business by harnessing the potential of cutting-edge technologies, from mobile app development and ecommerce solutions to web development and software creation, we are your trusted partner in navigating the digital landscape.",
  },
];

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#portfolio" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/header-logo.png" 
            alt="teamINERTIA TECHNOLOGIES" 
            className="h-12 w-auto object-contain" 
            referrerPolicy="no-referrer" 
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={isHome ? link.href : `/${link.href}`}
              className="text-[10px] font-bold uppercase tracking-widest text-dark/60 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://teaminertia.com/contact-goa-web-design-team/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold"
          >
            Get a Quote
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-dark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={isHome ? link.href : `/${link.href}`}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold uppercase tracking-widest text-dark/60 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://teaminertia.com/contact-goa-web-design-team/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full py-4 text-[10px] uppercase tracking-widest font-bold text-center mt-2"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Latest First");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortOptions = ["Latest First", "All", "A-Z", "Z-A", "Oldest First"];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = ["All", ...Array.from(new Set(PROJECTS.map(p => p.sector))).sort()];

  const parseDate = (dateStr: string) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [month, year] = dateStr.split(" ");
    return new Date(parseInt(year), months.indexOf(month)).getTime();
  };

  const filteredProjects = useMemo(() => {
    let result = PROJECTS.filter(p => {
      const matchesCategory = activeCategory === "All" || p.sector === activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.sector.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case "A-Z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Latest First":
        result.sort((a, b) => parseDate(b.handoverDate) - parseDate(a.handoverDate));
        break;
      case "Oldest First":
        result.sort((a, b) => parseDate(a.handoverDate) - parseDate(b.handoverDate));
        break;
      default: // "All" or default
        // If "All" is selected, we could keep original order or just sort by latest as default
        result.sort((a, b) => parseDate(b.handoverDate) - parseDate(a.handoverDate));
        break;
    }
    return result;
  }, [activeCategory, searchQuery, sortBy]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>teamINERTIA TECHNOLOGIES | Digital Agency in Goa</title>
        <meta name="description" content="teamINERTIA TECHNOLOGIES is a leading digital agency in Goa specializing in web design, development, and digital marketing with over 20 years of experience." />
        <link rel="canonical" href="https://teaminertia.com/" />
      </Helmet>
      <main>
        {/* 1. HERO SECTION */}
      <section id="home" className="relative pt-24 pb-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="text-5xl md:text-7xl text-dark leading-[1.05] mb-8 font-bold tracking-tight"
              >
                Delivering Digital<br />
                Transformation<br />
                <span className="text-primary">Together.</span>
              </motion.h1>
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="text-xl text-body mb-10 max-w-2xl leading-relaxed"
              >
                With a blend of Design, Development & Digital Marketing, we help transform businesses to become Digital Successes.
              </motion.p>
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="flex flex-wrap gap-4"
              >
                <a 
                  href="https://teaminertia.com/contact-goa-web-design-team/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Your Project <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  />
                </a>
                <a href="#portfolio" className="btn border border-dark/10 hover:bg-dark hover:text-white transition-all duration-300">
                  View Our Work
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden bg-light">
                {/* 
                  The user requested to replace the SVG with an uploaded video.
                  Since the video file is not yet found in the project structure,
                  we are using a placeholder video tag. 
                  Please ensure the video file (e.g., hero-video.mp4) is uploaded to the public directory.
                */}
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  poster="https://picsum.photos/seed/ti-hero/800/800"
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. PORTFOLIO GRID */}
      <section id="portfolio" className="py-24 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">Our Work</span>
            <h2 className="text-3xl md:text-4xl mb-4">Our expertise help them maximise their growth</h2>
            <p className="text-sm text-body max-w-2xl mx-auto mb-12">
              We use our digital, design and development expertise to achieve quantifiable business goals, build a strong foundation early on in our projects and empower our clients to reach their maximum potential.
            </p>

            {/* Search and Sort Controls */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 max-w-3xl mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-body/40" />
                <input 
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-light border border-black/5 rounded-full py-3.5 pl-12 pr-6 text-sm focus:outline-none focus:border-primary/30 transition-all placeholder:text-body/30"
                />
              </div>
              
              <div className="relative w-full md:w-auto min-w-[200px]" ref={sortRef}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full flex items-center justify-between bg-white border border-black/5 rounded-full py-3.5 px-6 text-sm hover:border-primary/30 transition-all cursor-pointer font-bold text-dark shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-2.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
                    <span className="uppercase tracking-widest text-[10px]">{sortBy}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isSortOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 text-body/40" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/5 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 backdrop-blur-xl"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setIsSortOpen(false);
                          }}
                          className={`w-full text-left px-6 py-3 text-[10px] uppercase tracking-widest font-bold transition-all hover:pl-8 ${
                            sortBy === option 
                              ? "text-primary bg-primary/5" 
                              : "text-body/60 hover:text-primary hover:bg-light"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            {option}
                            {sortBy === option && (
                              <motion.div
                                layoutId="active-sort"
                                className="w-1 h-1 rounded-full bg-primary"
                              />
                            )}
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === category
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                      : "bg-white text-body border-black/5 hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            layout
            className="columns-1 md:columns-2 gap-10 space-y-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group break-inside-avoid mb-10"
                >
                <div className={`relative ${index % 3 === 0 ? 'aspect-[4/5]' : index % 3 === 1 ? 'aspect-square' : 'aspect-[16/10]'} bg-zinc-100 rounded-xl overflow-hidden mb-6 shadow-sm border border-black/5`}>
                  <img 
                    src={project.thumbnail || `https://picsum.photos/seed/ti-${project.id}/${index % 3 === 0 ? '800/1000' : index % 3 === 1 ? '800/800' : '1000/625'}`} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 p-8 backdrop-blur-[2px]">
                    <Link 
                      to={`/portfolio/${project.id}`}
                      className="w-full max-w-[220px] bg-white text-dark hover:bg-primary hover:text-white px-8 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 text-center"
                    >
                      View Case Study
                    </Link>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full max-w-[220px] bg-transparent text-white border border-white/30 hover:bg-white hover:text-dark px-8 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all duration-300 text-center"
                    >
                      View Website
                    </a>
                  </div>
                </div>
                <div className="flex justify-between items-start px-1">
                  <div>
                    <h3 className="text-xl font-bold text-dark mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-body/60">{project.sector}</p>
                  </div>
                  <Link to={`/portfolio/${project.id}`} className="p-2 rounded-full bg-light text-dark hover:bg-primary hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 3. VERTICALS SECTION */}
      <section id="services" className="py-24 bg-white border-t border-black/5">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-6 text-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">Our Major Verticals</span>
            <h2 className="text-3xl md:text-4xl mb-16">
              A 360° Digital Solutions Firm<br />
              with over <span className="text-primary">20 Years of Experience.</span>
            </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {VERTICALS.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ 
                  y: -12,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                }}
                className="p-10 rounded-2xl bg-white border border-black/5 flex flex-col items-center text-center group hover:shadow-[0_30px_60px_rgba(107,33,168,0.12)] hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
              >
                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="mb-8 p-5 bg-light rounded-2xl group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 relative z-10 text-primary">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors relative z-10">{v.title}</h3>
                <p className="text-sm text-body leading-relaxed relative z-10 group-hover:text-dark transition-colors">
                  {v.desc}
                </p>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. CTA SECTION */}
      <section id="contact" className="py-32 bg-primary/5 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -120, 0],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-blue/10 rounded-full blur-3xl"
        />

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
        >
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6 block"
          >
            Get in Touch
          </motion.span>
          
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="text-4xl md:text-5xl text-dark mb-8 font-bold tracking-tight"
          >
            Planning a New Project?
          </motion.h2>
          
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
            }}
            className="text-base md:text-lg text-body mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Our rich experience over the past two decades has helped multiple clients to take an idea that they have, crystallise it with us and we help develop solutions that are implemented successfully. Let's discuss your project today.
          </motion.p>
          
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } }
            }}
          >
            <a 
              href="https://teaminertia.com/contact-goa-web-design-team/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-primary text-white hover:bg-dark hover:shadow-2xl hover:shadow-primary/20 px-12 py-4 rounded-full font-bold text-sm transition-all duration-300 group inline-flex items-center"
            >
              Get a Quote 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="ml-3 w-5 h-5" />
              </motion.span>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  </motion.div>
  );
}

function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);

  if (!project) return <div>Project not found</div>;

  // Get 3 related projects (excluding current one)
  const relatedProjects = PROJECTS
    .filter(p => p.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // Split description into paragraphs based on double newlines or sentences
  const paragraphs = project.bodyDesc.split('\n\n');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-32"
    >
      <Helmet>
        <title>{`${project.title} | teamINERTIA Portfolio`}</title>
        <meta name="description" content={project.desc} />
        <link rel="canonical" href={`https://teaminertia.com/portfolio/${project.id}`} />
        <meta property="og:title" content={`${project.title} | teamINERTIA Portfolio`} />
        <meta property="og:description" content={project.desc} />
        <meta property="og:image" content={project.thumbnail} />
      </Helmet>
      <main>
        <div className="max-w-5xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-body hover:text-primary transition-colors mb-16 group">
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
        </Link>

        <div className="space-y-12 mb-24">
          {/* Header Info */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-8xl font-bold text-dark leading-[1.1] tracking-tight">{project.title}</h1>
            
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary bg-primary/5 px-5 py-2 rounded-full border border-primary/10">
                {project.sector}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="grid lg:grid-cols-1 gap-8 py-4">
            <div className="space-y-8 text-xl md:text-2xl text-body leading-relaxed font-light">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Date and Website */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-12 border-y border-black/5">
            <div className="flex items-center gap-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark/40 mb-3">Handover Date</p>
                <p className="text-2xl font-bold text-dark">{project.handoverDate}</p>
              </div>
            </div>

            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary group px-12 py-5 text-xs uppercase tracking-widest font-bold shadow-xl shadow-primary/20"
            >
              View Website <ExternalLink className="ml-3 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Image - Full Width */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full overflow-hidden shadow-2xl shadow-primary/10 border-y border-black/5 bg-zinc-100"
      >
        <img 
          src={project.thumbnail || `https://picsum.photos/seed/ti-${project.id}/1920/1080`} 
          alt={project.title}
          className="w-full h-auto object-cover max-h-[90vh]"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Related Portfolio */}
        <div className="mt-40 pt-24 border-t border-black/5">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">Explore More</span>
              <h2 className="text-4xl font-bold text-dark tracking-tight">Related Projects</h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {relatedProjects.map((rp) => (
              <Link key={rp.id} to={`/portfolio/${rp.id}`} className="group">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-black/5 bg-zinc-50 shadow-sm">
                  <img 
                    src={rp.thumbnail || `https://picsum.photos/seed/ti-${rp.id}/800/500`} 
                    alt={rp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors mb-2">{rp.title}</h3>
                <p className="text-[10px] text-body/60 font-bold uppercase tracking-widest">{rp.sector}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  </motion.div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <div className="min-h-screen selection:bg-primary/20 selection:text-primary bg-white pt-20">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio/:id" element={<ProjectDetail />} />
            </Routes>
          </AnimatePresence>

          {/* 8. FOOTER */}
          <footer className="bg-dark pt-12 pb-8 text-white/80 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 items-center mb-12">
                {/* Left: Logo and Social */}
                <div className="flex flex-col gap-6">
                  <img src="/logo.png" alt="teamINERTIA TECHNOLOGIES" className="h-12 w-auto object-contain self-start opacity-90" referrerPolicy="no-referrer" />
                  <div className="flex gap-4">
                    <a href="https://in.linkedin.com/company/team-inertia-technologies" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
                    <a href="https://www.instagram.com/teaminertiatechnologies/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
                    <a href="https://www.facebook.com/TeamInertiaTechnologies" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
                  </div>
                </div>

                {/* Center: Address */}
                <div className="text-center">
                  <p className="text-[11px] leading-relaxed text-white/40 max-w-xs mx-auto">
                    F-2, 1st Floor, Live in Apartments, Bernardo Guedes Road, Panaji, Goa, 403 001, India.
                  </p>
                </div>

                {/* Right: Contact Info */}
                <div className="flex flex-col md:items-end text-right gap-1">
                  <div className="text-[11px] text-white/40">+91 8322426447</div>
                  <div className="text-[11px] text-white/40">contactus@teaminertia.com</div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[10px] text-white/20 uppercase tracking-widest">
                  ©2026 Team Inertia Technologies. All Rights Reserved.
                </p>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2"
                >
                  Go to Top <ArrowRight className="-rotate-90 w-3 h-3" />
                </button>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </HelmetProvider>
  );
}
