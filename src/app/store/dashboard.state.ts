export interface Chart {
  id: number;
  title: string;
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  data: any;
  options: any;
}

export interface Dashboard {
  id: number;
  name: string;
  description: string;
  charts: Chart[];
}

export interface FilterClause {
  field: string;
  operator: 'includes' | 'equals' | 'greater' | 'less';
  value: string;
}

export interface DashboardState {
  dashboards: Dashboard[];
  currentDashboardId: number | null;
  activeFilters: FilterClause[];
  loading: boolean;
  error: string | null;
}

export const initialState: DashboardState = {
  dashboards: [],
  currentDashboardId: null,
  activeFilters: [
    { field: 'Gender', operator: 'includes', value: 'Male, Female' },
    { field: 'Age', operator: 'greater', value: '15' }
  ],
  loading: false,
  error: null
};