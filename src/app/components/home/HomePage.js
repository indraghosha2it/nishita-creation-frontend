


// 'use client';

// import React, { useState, useEffect } from 'react';
// import HeroBanner from './HeroBanner.js';
// import FeaturedProducts from './FeaturedProducts.js';
// import Categories from './Categories.js';
// import Navbar from '../layout/Navbar.js';
// import Footer from '../layout/Footer.js';
// import BigSaleSection from './BigSaleSection.js';
// import BrandScroll from './BrandScroll.js';
// import { Loader2 } from 'lucide-react';
// import ProductGridSection from './ProductGridSection.js';

// export default function HomePage() {
//   const [sections, setSections] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchHomepage = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/homepage');
//         const data = await response.json();
        
//         if (data.success) {
//           // Sort sections by displayOrder
//           const sortedSections = data.data.sections
//             .filter(s => s.isActive !== false)
//             .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
//           setSections(sortedSections);
//         }
//       } catch (error) {
//         console.error('Error fetching homepage:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchHomepage();
//   }, []);

//   // Render section based on type
//   const renderSection = (section) => {
//     switch (section.type) {
//       case 'hero':
//         return section.isActive !== false && <HeroBanner key={section.id} />;

//       case 'big_sale':
//         return section.isActive !== false && <BigSaleSection key={section.id} />;
//       case 'categories':
//         return section.isActive !== false && <Categories key={section.id} />;
//       case 'featured':
//         return section.isActive !== false && <FeaturedProducts key={section.id} />;
//       case 'custom':
//         return section.isActive !== false && (
//           <ProductGridSection 
//             key={section.id}
//             title={section.customTitle || section.name}
//             description={section.customDescription}
//             products={section.products || []}
//             layout={section.layout || 'grid'}
//             itemsPerRow={section.itemsPerRow || 5}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen flex items-center justify-center bg-white">
//           <div className="text-center">
//             <Loader2 className="w-12 h-12 text-[#06B6D4] animate-spin mx-auto mb-4" />
//             <p className="text-gray-500">Loading homepage...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       {sections.map(section => renderSection(section))}
//       <Footer />
//     </>
//   );
// }


// app/page.jsx - Updated HomePage component
// app/components/home/HomePage.js
'use client';

import React, { useState, useEffect } from 'react';
import HeroBanner from './HeroBanner.js';
import FeaturedProducts from './FeaturedProducts.js';
import Categories from './Categories.js';
import Navbar from '../layout/Navbar.js';
import Footer from '../layout/Footer.js';
import BigSaleSection from './BigSaleSection.js';
import BrandScroll from './BrandScroll.js';
import WhyChooseUs from './WhyChooseUs.js';
import { Loader2 } from 'lucide-react';
import ProductGridSection from './ProductGridSection.js';
import DealsSection from './DealsSection.js';
import TrustResultsSection from './TrustResultsSection.js';

export default function HomePage() {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/homepage');
        const data = await response.json();
        
        if (data.success) {
          // Sort sections by displayOrder
          const sortedSections = data.data.sections
            .filter(s => s.isActive !== false)
            .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
          setSections(sortedSections);
        }
      } catch (error) {
        console.error('Error fetching homepage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomepage();
  }, []);

  // Render section based on type
  const renderSection = (section) => {
    switch (section.type) {
      case 'hero':
        return section.isActive !== false && <HeroBanner key={section.id} />;

      case 'big_sale':
        return section.isActive !== false && <BigSaleSection key={section.id} />;

      case 'categories':
        return section.isActive !== false && <Categories key={section.id} />;

      case 'featured':
        return section.isActive !== false && <FeaturedProducts key={section.id} />;

      
       case 'deals': // ✅ ADD THIS CASE
        return section.isActive !== false && <DealsSection key={section.id} />;

       case 'trust_results': // ✅ ADD THIS CASE
        return section.isActive !== false && <TrustResultsSection key={section.id} />;

      case 'custom':
        return section.isActive !== false && (
          <ProductGridSection 
            key={section.id}
            title={section.customTitle || section.name}
            description={section.customDescription}
            products={section.products || []}
            layout={section.layout || 'grid'}
            itemsPerRow={section.itemsPerRow || 5}
          />
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[#06B6D4] animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading homepage...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {sections.map(section => renderSection(section))}
      <Footer />
    </>
  );
}