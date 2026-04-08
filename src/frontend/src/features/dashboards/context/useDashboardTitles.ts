import { useContext } from 'react';
import { DashboardTitlesContext } from './DashboardTitlesContext';

export const useDashboardTitles = () => useContext(DashboardTitlesContext);
