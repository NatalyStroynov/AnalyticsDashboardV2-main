import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.state';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

// Dashboard Selectors
export const selectAllDashboards = createSelector(
  selectDashboardState,
  (state) => state.dashboards
);

export const selectCurrentDashboardId = createSelector(
  selectDashboardState,
  (state) => state.currentDashboardId
);

export const selectCurrentDashboard = createSelector(
  selectAllDashboards,
  selectCurrentDashboardId,
  (dashboards, currentId) => 
    currentId !== null ? dashboards.find(d => d.id === Number(currentId)) || null : null
);

export const selectCurrentDashboardCharts = createSelector(
  selectCurrentDashboard,
  (dashboard) => dashboard?.charts || []
);

export const selectDashboardById = (id: number) => createSelector(
  selectAllDashboards,
  (dashboards) => dashboards.find(d => d.id === id)
);

export const selectChartById = (dashboardId: number, chartId: number) => createSelector(
  selectDashboardById(dashboardId),
  (dashboard) => dashboard?.charts.find(c => c.id === chartId)
);

// Filter Selectors
export const selectActiveFilters = createSelector(
  selectDashboardState,
  (state) => state.activeFilters
);

// Loading and Error Selectors
export const selectDashboardLoading = createSelector(
  selectDashboardState,
  (state) => state.loading
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state) => state.error
);

// Derived Selectors
export const selectDashboardsCount = createSelector(
  selectAllDashboards,
  (dashboards) => dashboards.length
);

export const selectTotalChartsCount = createSelector(
  selectAllDashboards,
  (dashboards) => dashboards.reduce((total, dashboard) => total + dashboard.charts.length, 0)
);