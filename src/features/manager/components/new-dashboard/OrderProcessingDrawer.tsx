import React, { useEffect } from 'react';
import DrawerOverlay from './DrawerOverlay';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import DrawerFooter from './DrawerFooter';
import { useOrderDrawerStore } from '@/features/manager/stores/orderDrawerStore';

const OrderProcessingDrawer: React.FC = () => {
    const { isOpen, selectedOrder, closeDrawer } = useOrderDrawerStore();

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

    const handleReportError = () => {
        if (selectedOrder) {
            console.log('Report error for order:', selectedOrder.id);
            // Implement error reporting logic
        }
    };

    const handleCompleteProcessing = () => {
        if (selectedOrder) {
            console.log('Complete processing for order:', selectedOrder.id);
            // Implement completion logic
            closeDrawer();
        }
    };

    return (
        <DrawerOverlay isOpen={isOpen} onClose={closeDrawer}>
            {selectedOrder && (
                <>
                    <DrawerHeader order={selectedOrder} onClose={closeDrawer} />
                    <DrawerContent order={selectedOrder} isOpen={isOpen} />
                    <DrawerFooter
                        onReportError={handleReportError}
                        onCompleteProcessing={handleCompleteProcessing}
                        isProcessing={selectedOrder.processingStatus === 'in_progress'}
                    />
                </>
            )}
        </DrawerOverlay>
    );
};

export default OrderProcessingDrawer;