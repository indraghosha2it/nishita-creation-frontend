'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Ship,
  Truck,
  Package,
  Clock,
  Globe,
  MapPin,
  CheckCircle,
  AlertCircle,
  Shield,
  Phone,
  Mail,
  Send,
  Download,
  Headset,
  ArrowUp,
  Microchip,
  Palette,
  Ruler,
  Tag,
  Printer,
  Box,
  Calendar,
  DollarSign,
  FileText,
  BarChart3,
  Users,
  Building2,
  Factory,
  Route,
  Plane,
  Train,
  Warehouse,
  ClipboardList,
  FileSignature,
  ShieldCheck,
  Timer,
  TrendingUp,
  Sparkles,
  QrCode,
  Layers,
  Settings,
  Zap,
  Heart,
  Star
} from 'lucide-react';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

export default function ShippingDeliveryPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeTab, setActiveTab] = useState('oem');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // OEM/ODM Services Data
  const oemServices = [
    { icon: Palette, title: 'Custom Logo Printing', description: 'Screen printing, heat transfer, and embroidery options for your brand identity', options: ['Screen Printing', 'Heat Transfer', 'Digital Printing', 'Embroidery'] },
    { icon: Ruler, title: 'Custom Sizes & Dimensions', description: 'Tailored measurements to meet your specific product requirements', options: ['Any custom size', 'Multiple shape options', 'Precision cutting', 'Sample approval'] },
    { icon: Tag, title: 'Private Labeling', description: 'Your brand name, labels, and packaging with your unique design', options: 'Woven labels, Hang tags, Stickers, Custom boxes' },
    { icon: Package, title: 'Custom Packaging', description: 'Eco-friendly packaging solutions aligned with your brand', options: ['Recycled materials', 'Biodegradable options', 'Custom designs', 'Bulk packaging'] }
  ];

  // Manufacturing Process Steps
  const manufacturingSteps = [
    { step: '01', title: 'Inquiry & Consultation', description: 'Share your requirements, designs, and specifications with our team', duration: '1-2 days', icon: Headset },
    { step: '02', title: 'Sample Development', description: 'We create prototypes based on your specifications for approval', duration: '7-10 days', icon: Palette },
    { step: '03', title: 'Design Approval', description: 'Review and approve samples before mass production begins', duration: '2-3 days', icon: CheckCircle },
    { step: '04', title: 'Bulk Manufacturing', description: 'Full-scale production with strict quality control measures', duration: '15-30 days', icon: Factory },
    { step: '05', title: 'Quality Inspection', description: 'Multi-point inspection before packaging and shipping', duration: '2-3 days', icon: Shield },
    { step: '06', title: 'Logistics & Delivery', description: 'Secure packaging and worldwide shipping to your destination', duration: '10-25 days', icon: Ship }
  ];

  // Shipping Methods
  const shippingMethods = [
    { 
      icon: Ship, 
      title: 'Sea Freight', 
      description: 'Most economical for bulk orders', 
      transitTime: '20-35 days',
      cost: 'Lowest',
      bestFor: 'Large bulk orders, containers',
      features: ['FCL & LCL options', 'Port-to-port delivery', 'Container tracking']
    },
    { 
      icon: Plane, 
      title: 'Air Freight', 
      description: 'Fastest delivery for urgent orders', 
      transitTime: '3-7 days',
      cost: 'Higher',
      bestFor: 'Time-sensitive shipments, samples',
      features: ['Express service', 'Door-to-door available', 'Real-time tracking']
    },
    { 
      icon: Truck, 
      title: 'Express Courier', 
      description: 'Door-to-door small parcel delivery', 
      transitTime: '2-5 days',
      cost: 'Premium',
      bestFor: 'Sample orders, small packages',
      features: ['DHL, FedEx, UPS', 'Online tracking', 'Customs clearance included']
    },
    { 
      icon: Train, 
      title: 'Rail Freight', 
      description: 'For landlocked destinations', 
      transitTime: '15-25 days',
      cost: 'Medium',
      bestFor: 'European & Central Asian markets',
      features: ['Eco-friendly option', 'Reliable schedules', 'Intermodal solutions']
    }
  ];

  // Export Documentation
  const exportDocs = [
    { name: 'Commercial Invoice', description: 'Detailed transaction record for customs', required: true },
    { name: 'Packing List', description: 'Itemized list of shipped goods', required: true },
    { name: 'Bill of Lading / AWB', description: 'Contract of carriage with shipping line', required: true },
    { name: 'Certificate of Origin', description: 'Proof of Bangladesh origin for trade agreements', required: true },
    { name: 'GSP Certificate', description: 'For preferential duty rates', required: false },
    { name: ' Phytosanitary Certificate', description: 'For raw jute fiber exports', required: false },
    { name: 'Insurance Certificate', description: 'Cargo insurance coverage proof', required: false },
    { name: 'Letter of Credit Documents', description: 'LC compliance documentation', required: false }
  ];

  // Incoterms Offered
  const incoterms = [
    { code: 'EXW', name: 'Ex Works', description: 'Buyer picks up from our factory in Khulna', responsibility: 'Buyer handles all shipping' },
    { code: 'FOB', name: 'Free on Board', description: 'We deliver to Mongla/Chittagong port', responsibility: 'We handle export clearance' },
    { code: 'CFR', name: 'Cost and Freight', description: 'We pay for shipping to destination port', responsibility: 'Buyer handles import' },
    { code: 'CIF', name: 'Cost, Insurance & Freight', description: 'We cover shipping and insurance', responsibility: 'Full door-to-port service' },
    { code: 'DDP', name: 'Delivered Duty Paid', description: 'Full door-to-door including customs', responsibility: 'We handle everything' }
  ];

  // Packaging Standards
  const packagingStandards = [
    { type: 'Jute Bags', standard: 'Compressed bales', weight: '25kg - 50kg per bale', protection: 'Moisture barrier lining' },
    { type: 'Jute Yarn', standard: 'Cone-wound on pallets', weight: '2.5kg - 5kg per cone', protection: 'Shrink-wrapped pallets' },
    { type: 'Finished Products', standard: 'Polybags + Cartons', weight: '10-20kg per carton', protection: 'Corner protection + pallets' },
    { type: 'Sample Orders', standard: 'Corrugated boxes', weight: '1-5kg per box', protection: 'Bubble wrap + cushioning' }
  ];

  // Quality Control Checkpoints
  const qualityCheckpoints = [
    { stage: 'Raw Material', checks: ['Fiber grade verification', 'Moisture content test', 'Color consistency'] },
    { stage: 'During Production', checks: ['Dimensional accuracy', 'Weave density', 'Strength testing'] },
    { stage: 'Pre-Shipment', checks: ['Final visual inspection', 'Packaging integrity', 'Quantity verification'] },
    { stage: 'Third-Party', checks: ['SGS/BV inspection', 'AQL sampling', 'Certification validation'] }
  ];

  // Global Shipping Network
  const shippingNetwork = [
    { region: 'North America', hubs: ['New York', 'Los Angeles', 'Toronto'], transitDays: '18-25 days (Sea) / 3-5 days (Air)' },
    { region: 'Europe', hubs: ['Rotterdam', 'Hamburg', 'Felixstowe', 'Antwerp'], transitDays: '20-30 days (Sea) / 4-6 days (Air)' },
    { region: 'Middle East', hubs: ['Dubai', 'Jeddah', 'Doha'], transitDays: '15-20 days (Sea) / 3-4 days (Air)' },
    { region: 'Asia Pacific', hubs: ['Singapore', 'Shanghai', 'Tokyo', 'Sydney'], transitDays: '10-18 days (Sea) / 2-4 days (Air)' },
    { region: 'Africa', hubs: ['Durban', 'Mombasa', 'Casablanca'], transitDays: '25-35 days (Sea) / 5-7 days (Air)' },
    { region: 'South America', hubs: ['Santos', 'Buenos Aires', 'Callao'], transitDays: '28-40 days (Sea) / 6-8 days (Air)' }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white overflow-x-hidden">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/G4RJnfg0/nuts-glass-autumn-leaves.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6B4F3A]/95 to-[#2d5a35]/90" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-4 border border-white/20">
                  <Ship className="w-4 h-4 text-[#3bc24f]" />
                  <span className="text-[#F5E6D3] text-sm font-medium font-sans">From Bangladesh to the World</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
                  Custom Manufacturing & <span className="text-[#3bc24f]">Global Logistics</span>
                </h1>
                <p className="text-[#F5E6D3] text-lg md:text-xl max-w-2xl mx-auto font-sans">
                  Your end-to-end solution for OEM/ODM jute products and worldwide shipping
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* QUICK NAVIGATION TABS */}
        <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-1 py-3 overflow-x-auto">
              {[
                { id: 'oem', label: 'Custom Manufacturing', icon: Microchip },
                { id: 'process', label: 'Manufacturing Process', icon: Factory },
                { id: 'shipping', label: 'Shipping Methods', icon: Ship },
                { id: 'incoterms', label: 'Incoterms', icon: FileSignature },
                { id: 'packaging', label: 'Packaging', icon: Package },
                { id: 'quality', label: 'Quality Control', icon: ShieldCheck },
                { id: 'network', label: 'Global Network', icon: Globe }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      const element = document.getElementById(tab.id);
                      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setActiveTab(tab.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id 
                        ? 'bg-[#3A7D44] text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* OEM/ODM SECTION */}
        <section id="oem" className="py-16 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3A7D44] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                OEM / ODM SERVICES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Custom Manufacturing Solutions
              </h2>
              <p className="text-gray-600 font-sans">
                Transform your vision into reality with our comprehensive customization capabilities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {oemServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-[#F5E6D3] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#3A7D44] transition-colors">
                      <Icon className="w-7 h-7 text-[#6B4F3A] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 font-sans">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(service.options) ? service.options.slice(0, 3).map((opt, idx) => (
                        <span key={idx} className="text-xs bg-white px-2 py-1 rounded-full text-gray-600 border border-gray-200">{opt}</span>
                      )) : (
                        <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600 border border-gray-200">{service.options}</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* MOQ Information */}
            <div className="bg-gradient-to-r from-[#6B4F3A] to-[#4A3222] rounded-2xl p-6 md:p-8 text-white">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-[#F5E6D3]">Minimum Order Quantity</p>
                  <p className="text-2xl font-bold">500 - 1,000</p>
                  <p className="text-xs">pieces for custom products</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Timer className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-[#F5E6D3]">Sample Lead Time</p>
                  <p className="text-2xl font-bold">7-10 Days</p>
                  <p className="text-xs">for prototype development</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-[#F5E6D3]">Production Lead Time</p>
                  <p className="text-2xl font-bold">15-30 Days</p>
                  <p className="text-xs">for bulk manufacturing</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MANUFACTURING PROCESS */}
      {/* MANUFACTURING PROCESS - REDESIGNED */}
<section id="process" className="py-16 bg-gray-50 scroll-mt-20">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <span className="bg-[#F5E6D3] text-[#3A7D44] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
        OUR PROCESS
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
        From Concept to Delivery
      </h2>
      <p className="text-gray-600 font-sans">
        A streamlined manufacturing journey with quality at every step
      </p>
    </div>

    {/* Horizontal Timeline - Desktop */}
    <div className="hidden md:block relative">
      {/* Progress Line */}
      
      <div className="grid grid-cols-6 gap-4 relative">
        {manufacturingSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 border-2 border-[#F5E6D3] group-hover:border-[#3A7D44]">
                    <Icon className="w-7 h-7 text-[#3A7D44] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#3A7D44] rounded-full text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-[#3A7D44] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 hidden lg:block">{step.description.substring(0, 40)}...</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-[10px] text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{step.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>

    {/* Vertical Timeline - Mobile */}
    <div className="md:hidden relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3A7D44] to-[#3A7D44]/30 rounded-full"></div>
      
      <div className="space-y-8">
        {manufacturingSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative flex gap-4"
            >
              {/* Timeline Node */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center border-2 border-[#F5E6D3]">
                  <Icon className="w-5 h-5 text-[#3A7D44]" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#3A7D44] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                  {step.step}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-800 text-base mb-1">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>Duration: {step.duration}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>

    {/* Process Stats Cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
        <div className="text-2xl font-bold text-[#3A7D44]">6</div>
        <div className="text-xs text-gray-500">Quality Checkpoints</div>
      </div>
      <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
        <div className="text-2xl font-bold text-[#3A7D44]">15-30</div>
        <div className="text-xs text-gray-500">Days Production</div>
      </div>
      <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
        <div className="text-2xl font-bold text-[#3A7D44]">100%</div>
        <div className="text-xs text-gray-500">Inspection Rate</div>
      </div>
      <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
        <div className="text-2xl font-bold text-[#3A7D44]">24/7</div>
        <div className="text-xs text-gray-500">Order Tracking</div>
      </div>
    </div>
  </div>
</section>

        {/* SHIPPING METHODS SECTION */}
        <section id="shipping" className="py-16 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3A7D44] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                SHIPPING OPTIONS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Worldwide Delivery Solutions
              </h2>
              <p className="text-gray-600 font-sans">
                Choose the shipping method that best fits your timeline and budget
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shippingMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all"
                  >
                    <div className="w-14 h-14 bg-[#F5E6D3] rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-[#3A7D44]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1 font-serif">{method.title}</h3>
                    <p className="text-sm text-gray-500 mb-3 font-sans">{method.description}</p>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Transit:</span>
                        <span className="font-semibold text-gray-700">{method.transitTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Cost:</span>
                        <span className={`font-semibold ${method.cost === 'Lowest' ? 'text-green-600' : method.cost === 'Higher' ? 'text-orange-600' : 'text-red-600'}`}>{method.cost}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">Best for: {method.bestFor}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {method.features.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-600">✓ {feature}</span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* INCOTERMS SECTION */}
        <section id="incoterms" className="py-16 bg-gray-50 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#F5E6D3] rounded-full px-4 py-1.5 mb-4">
                  <FileSignature className="w-4 h-4 text-[#3A7D44]" />
                  <span className="text-sm font-semibold text-[#6B4F3A] font-sans">INCOTERMS 2024</span>
                </div>
                <h2 className="text-3xl font-bold text-[#6B4F3A] mb-4 font-serif">Shipping Terms We Offer</h2>
                <p className="text-gray-700 mb-6 leading-relaxed font-sans">
                  We support various Incoterms to provide flexibility for our global clients. 
                  Choose the option that works best for your business model and logistics preferences.
                </p>
                <div className="space-y-3">
                  {incoterms.map((term, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-lg font-bold text-[#3A7D44]">{term.code}</span>
                          <span className="text-sm text-gray-500 ml-2">{term.name}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{term.description}</p>
                      <p className="text-xs text-gray-400">Responsibility: {term.responsibility}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#6B4F3A] to-[#4A3222] rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4 font-serif">Recommended Incoterms</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="font-semibold">For New Clients:</p>
                    <p className="text-sm text-[#F5E6D3]">FOB (Free on Board) - Clear division of responsibilities</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="font-semibold">For Regular Buyers:</p>
                    <p className="text-sm text-[#F5E6D3]">CFR or CIF - We handle shipping arrangements</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="font-semibold">For Sample Orders:</p>
                    <p className="text-sm text-[#F5E6D3]">EXW or FOB - Most cost-effective for small quantities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PACKAGING STANDARDS */}
        <section id="packaging" className="py-16 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3A7D44] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                PACKAGING STANDARDS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Secure & Sustainable Packaging
              </h2>
              <p className="text-gray-600 font-sans">
                Professional packaging that protects your products during transit
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
                <thead className="bg-[#6B4F3A] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold font-sans">Product Type</th>
                    <th className="px-4 py-3 text-left font-semibold font-sans">Packaging Standard</th>
                    <th className="px-4 py-3 text-left font-semibold font-sans">Weight per Unit</th>
                    <th className="px-4 py-3 text-left font-semibold font-sans">Protection Features</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {packagingStandards.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{item.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.standard}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.weight}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.protection}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Package className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-800 font-sans">
                  <strong>Eco-Friendly Commitment:</strong> We use recyclable, biodegradable, and FSC-certified packaging materials whenever possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* QUALITY CONTROL */}
        <section id="quality" className="py-16 bg-gray-50 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3A7D44] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                QUALITY ASSURANCE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Quality Control Process
              </h2>
              <p className="text-gray-600 font-sans">
                Multi-stage inspection ensures your products meet international standards
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {qualityCheckpoints.map((checkpoint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-5 border border-gray-200"
                >
                  <div className="w-12 h-12 bg-[#F5E6D3] rounded-xl flex items-center justify-center mb-3">
                    <ShieldCheck className="w-6 h-6 text-[#3A7D44]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 font-serif">{checkpoint.stage}</h3>
                  <ul className="space-y-2">
                    {checkpoint.checks.map((check, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-[#3A7D44]" />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-semibold">Third-Party Inspections Available</p>
                  <p className="text-sm text-blue-700">We can arrange SGS, Bureau Veritas, or Intertek inspections at your request. Inspection reports provided before shipment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GLOBAL SHIPPING NETWORK */}
        <section id="network" className="py-16 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3A7D44] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                GLOBAL REACH
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Our Global Shipping Network
              </h2>
              <p className="text-gray-600 font-sans">
                Reliable delivery to over 35 countries across six continents
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
                <thead className="bg-[#6B4F3A] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold font-sans">Region</th>
                    <th className="px-4 py-3 text-left font-semibold font-sans">Key Hubs</th>
                    <th className="px-4 py-3 text-left font-semibold font-sans">Estimated Transit Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {shippingNetwork.map((region, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{region.region}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{region.hubs.join(', ')}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{region.transitDays}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* EXPORT DOCUMENTATION */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 bg-[#F5E6D3] rounded-full px-4 py-1.5 mb-4">
                  <ClipboardList className="w-4 h-4 text-[#3A7D44]" />
                  <span className="text-sm font-semibold text-[#6B4F3A] font-sans">EXPORT DOCUMENTATION</span>
                </div>
                <h2 className="text-3xl font-bold text-[#6B4F3A] mb-4 font-serif">Complete Export Support</h2>
                <p className="text-gray-700 mb-6 leading-relaxed font-sans">
                  We handle all export documentation to ensure smooth customs clearance at destination ports. 
                  Our team ensures compliance with international trade regulations.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {exportDocs.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 ${doc.required ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="text-gray-700">{doc.name}</span>
                      {doc.required && <span className="text-xs text-green-600">Required</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 md:order-2 bg-gradient-to-br from-[#6B4F3A] to-[#4A3222] rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4 font-serif">Export Support Services</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
                    Customs clearance assistance
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
                    Letter of Credit (LC) handling
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
                    Insurance coordination
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
                    Real-time shipment tracking
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
                    Dedicated logistics coordinator
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 bg-[#3A7D44] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
                Ready to Start Your Custom Order?
              </h2>
              <p className="text-white/90 text-lg mb-8 font-sans">
                Contact our team today for a free consultation and quote
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact#request-quote-contact"
                  className="px-8 py-3 bg-white text-[#3A7D44] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-sans"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/products"
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#3A7D44] transition-all duration-300 font-sans"
                >
                  Browse Products
                </Link>
              </div>
              <div className="mt-6 flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>+880 1234 567890</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>sales@jutecraftify.com</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#3A7D44] text-white w-12 h-12 rounded-full shadow-lg hover:bg-[#6B4F3A] transition-all duration-300 z-50 flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}