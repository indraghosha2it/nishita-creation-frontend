'use client';

import { usePathname } from 'next/navigation';
import { usePromotionalModal } from './PromotionalModal';
import PromotionalModal from './PromotionalModal';

export default function PromotionalModalWrapper() {
  const pathname = usePathname();
  
  console.log('🔍 PromotionalModalWrapper - Current pathname:', pathname);
  
  // Define paths where modal should NOT show
  const hideModalPaths = [
    '/admin',
    '/moderator',
    '/customer',
    '/productDetails',
    '/login',
    '/register'
  ];
  
  // Check if current path should hide the modal
  const shouldHideModal = hideModalPaths.some(path => 
    pathname?.startsWith(path)
  );
  
  console.log('🔍 Should hide modal?', shouldHideModal);
  
  const { showModal, modalProducts, isLoading, handleModalClose } = usePromotionalModal();

  console.log('🔍 Modal state:', { showModal, productsCount: modalProducts.length, isLoading });

  if (isLoading) {
    console.log('⏳ Loading modal data...');
    return null;
  }
  
  // Don't show modal on admin/moderator/customer pages
  if (shouldHideModal) {
    console.log('🚫 Modal hidden because of path:', pathname);
    return null;
  }

  if (showModal && modalProducts.length > 0) {
    console.log('✅ Showing modal with', modalProducts.length, 'products');
    return (
      <PromotionalModal 
        products={modalProducts} 
        onClose={handleModalClose} 
      />
    );
  }

  console.log('❌ Modal not showing. Conditions not met.');
  return null;
}