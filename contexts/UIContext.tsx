import React, { createContext, useContext, useReducer } from 'react';

interface UIState {
  isContactModalOpen: boolean;
  isAboutModalOpen: boolean;
  activeView: string;
  prefillSubject?: string;
  prefillMessage?: string;
}

type UIAction =
  | { type: 'OPEN_CONTACT_MODAL'; payload?: { subject: string; message: string } }
  | { type: 'CLOSE_CONTACT_MODAL' }
  | { type: 'OPEN_ABOUT_MODAL' }
  | { type: 'CLOSE_ABOUT_MODAL' }
  | { type: 'SET_ACTIVE_VIEW'; payload: string };

const initialState: UIState = {
  isContactModalOpen: false,
  isAboutModalOpen: false,
  activeView: 'home',
  prefillSubject: '',
  prefillMessage: '',
};

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case 'OPEN_CONTACT_MODAL':
      return { 
        ...state, 
        isContactModalOpen: true,
        prefillSubject: action.payload?.subject || '',
        prefillMessage: action.payload?.message || ''
      };
    case 'CLOSE_CONTACT_MODAL':
      return { 
        ...state, 
        isContactModalOpen: false,
        prefillSubject: '',
        prefillMessage: ''
      };
    case 'OPEN_ABOUT_MODAL':
      return { ...state, isAboutModalOpen: true };
    case 'CLOSE_ABOUT_MODAL':
      return { ...state, isAboutModalOpen: false };
    case 'SET_ACTIVE_VIEW':
      return { ...state, activeView: action.payload };
    default:
      return state;
  }
}

interface UIContextType extends UIState {
  openContactModal: (subject?: string | any, message?: string) => void;
  closeContactModal: () => void;
  openAboutModal: () => void;
  closeAboutModal: () => void;
  setActiveView: (view: string) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openContactModal = (subject?: string | any, message?: string) => {
    const isStringSubject = typeof subject === 'string';
    if (isStringSubject || message) {
      dispatch({ type: 'OPEN_CONTACT_MODAL', payload: { subject: isStringSubject ? subject : '', message: message || '' } });
    } else {
      dispatch({ type: 'OPEN_CONTACT_MODAL' });
    }
  };
  const closeContactModal = () => dispatch({ type: 'CLOSE_CONTACT_MODAL' });
  const openAboutModal = () => dispatch({ type: 'OPEN_ABOUT_MODAL' });
  const closeAboutModal = () => dispatch({ type: 'CLOSE_ABOUT_MODAL' });
  const setActiveView = (view: string) => dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });

  return (
    <UIContext.Provider value={{ 
      ...state,
      openContactModal, closeContactModal,
      openAboutModal, closeAboutModal,
      setActiveView
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
