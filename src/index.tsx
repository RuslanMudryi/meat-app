import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import 'bulma/css/bulma.css';
import { Root } from './Root';


createRoot(document.getElementById('root') as HTMLDivElement).render(<Root />);

