import React, { useEffect } from 'react';
import DrawerOverlay from './DrawerOverlay';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import DrawerFooter from './DrawerFooter';
import { useOrderDrawerStore } from '@/features/operation-staff/store/orderDrawerStore.ts';
import { useProductionStore } from '@/features/operation-staff/store/productionStore.ts';

const OrderProcessingDrawer: React.FC = () => {
  const { isOpen, selectedOrder, closeDrawer } = useOrderDrawerStore();
  const startOrder = useProductionStore((state) => state.startOrder);
  const finishOrder = useProductionStore((state) => state.finishOrder);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDrawer();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeDrawer]);

  const handleStartProcessing = () => {
    if (selectedOrder) {
      startOrder(selectedOrder.id)
        .then(() => {
          console.log('Order started successfully:', selectedOrder.id);
        })
        .catch((error) => {
          console.error('Failed to start order:', error);
        });
    }
  };

  const handleCompleteProcessing = () => {
    if (selectedOrder) {
      finishOrder(selectedOrder.id)
        .then(() => {
          console.log('Order completed successfully:', selectedOrder.id);
          closeDrawer();
        })
        .catch((error) => {
          console.error('Failed to complete order:', error);
        });
    }
  };

  return (
    <DrawerOverlay isOpen={isOpen} onClose={closeDrawer}>
      {selectedOrder && (
        <>
          <DrawerHeader order={selectedOrder} onClose={closeDrawer} />
          <DrawerContent order={selectedOrder} isOpen={isOpen} />
          <DrawerFooter
            onReportError={handleStartProcessing}
            onCompleteProcessing={handleCompleteProcessing}
            isProcessing={selectedOrder.processingStatus === 'in_progress'}
          />
        </>
      )}
    </DrawerOverlay>
  );
};

export default OrderProcessingDrawer;
