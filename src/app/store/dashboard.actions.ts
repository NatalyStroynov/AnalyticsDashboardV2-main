import { createAction, props } from '@ngrx/store';
import { Dashboard, Chart, FilterClause } from './dashboard.state';

// Dashboard Actions
export const loadDashboards = createAction('[Dashboard] Load Dashboards');

export const loadDashboardsSuccess = createAction(
  '[Dashboard] Load Dashboards Success',
  props<{ dashboards: Dashboard[] }>()
);

export const loadDashboardsFailure = createAction(
  '[Dashboard] Load Dashboards Failure',
  props<{ error: string }>()
);

export const createDashboard = createAction(
  '[Dashboard] Create Dashboard',
  props<{ name: string; description: string }>()
);

export const createDashboardSuccess = createAction(
  '[Dashboard] Create Dashboard Success',
  props<{ dashboard: Dashboard }>()
);

export const updateDashboard = createAction(
  '[Dashboard] Update Dashboard',
  props<{ id: number; updates: Partial<Dashboard> }>()
);

export const deleteDashboard = createAction(
  '[Dashboard] Delete Dashboard',
  props<{ id: number }>()
);

export const setCurrentDashboard = createAction(
  '[Dashboard] Set Current Dashboard',
  props<{ id: number }>()
);

// Chart Actions
export const addChart = createAction(
  '[Chart] Add Chart',
  props<{ dashboardId: number; chart: Omit<Chart, 'id'> }>()
);

export const addChartSuccess = createAction(
  '[Chart] Add Chart Success',
  props<{ dashboardId: number; chart: Chart }>()
);

export const updateChart = createAction(
  '[Chart] Update Chart',
  props<{ dashboardId: number; chartId: string; updates: Partial<Chart> }>()
);

export const updateChartSuccess = createAction(
  '[Chart] Update Chart Success',
  props<{ dashboardId: number; chart: Chart }>()
);

export const deleteChart = createAction(
  '[Chart] Delete Chart',
  props<{ dashboardId: number; chartId: number }>()
);

export const duplicateChart = createAction(
  '[Chart] Duplicate Chart',
  props<{ dashboardId: number; chartId: number }>()
);

export const duplicateChartSuccess = createAction(
  '[Chart] Duplicate Chart Success',
  props<{ dashboardId: number; chart: Chart }>()
);

// Filter Actions
export const setActiveFilters = createAction(
  '[Filter] Set Active Filters',
  props<{ filters: FilterClause[] }>()
);

export const addFilter = createAction(
  '[Filter] Add Filter',
  props<{ filter: FilterClause }>()
);

export const updateFilter = createAction(
  '[Filter] Update Filter',
  props<{ index: number; filter: FilterClause }>()
);

export const removeFilter = createAction(
  '[Filter] Remove Filter',
  props<{ index: number }>()
);

export const applyFilters = createAction('[Filter] Apply Filters');