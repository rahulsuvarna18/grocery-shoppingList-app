import React, { createContext, useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalContextType {
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledModal = styled(motion.div)`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  width: 90%;
  max-width: 500px;
  z-index: 1001;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

const Content = styled.div`
  padding: 20px;
`;

const Footer = styled.div`
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: #1a1a1a;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// Move Button outside of the Modal component
const ModalButton = styled.button<{ variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${({ variant = 'secondary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: #3498db;
          color: white;
          &:hover { background-color: #2980b9; }
        `;
      case 'danger':
        return `
          background-color: #e74c3c;
          color: white;
          &:hover { background-color: #c0392b; }
        `;
      default:
        return `
          background-color: #f1f1f1;
          color: #333;
          &:hover { background-color: #e1e1e1; }
        `;
    }
  }}
`;

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <StyledModal
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </StyledModal>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Update compound components
Modal.Header = function ModalHeader({ children }: { children: React.ReactNode }) {
  return (
    <Header>
      <Title>{children}</Title>
    </Header>
  );
};

Modal.Content = function ModalContent({ children }: { children: React.ReactNode }) {
  return <Content>{children}</Content>;
};

Modal.Footer = function ModalFooter({ children }: { children: React.ReactNode }) {
  return <Footer>{children}</Footer>;
};

// Add Button to Modal compound components
Modal.Button = ModalButton;

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a Modal component');
  }
  return context;
};

export default Modal; 