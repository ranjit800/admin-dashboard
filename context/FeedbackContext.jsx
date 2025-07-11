'use client';
import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const setMessage = (msg, type = 'success') => {
    toast[type](msg); // success | error | info | warning
  };

  return (
    <FeedbackContext.Provider value={{ setMessage }}>
      {children}
      <div>
        <div>
          <ToastContainer position="top-right" autoClose={2000} />
        </div>
      </div>
    </FeedbackContext.Provider>
  );
};

import { ToastContainer } from 'react-toastify';
export const useFeedback = () => useContext(FeedbackContext);
