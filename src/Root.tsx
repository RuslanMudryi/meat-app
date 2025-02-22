import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from 'react-router-dom';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { CatalogePage } from './components/pages/CatalogPage/CatalogePage';
import { MealPage } from './components/pages/MealPage/MealPage';
  
export const Root: React.FC = () => ( 
    <Router>
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route
                    path="/"
                    element={<App />}> 
                        <Route
                         index
                        element={<CatalogePage />} />
                        <Route path="meal">
                        <Route index element={<MealPage />} />
                        <Route path=":mealId" element={<MealPage />} />
        </Route>
                </Route>
            </Routes>
        </QueryClientProvider>
    </Router>
)
