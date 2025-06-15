import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, switchMap } from 'rxjs/operators';
import * as DashboardActions from './dashboard.actions';
import { Dashboard, Chart, DashboardState, FilterClause } from './dashboard.state';
import { Store } from '@ngrx/store';
import { selectCurrentDashboard } from './dashboard.selectors';

@Injectable()
export class DashboardEffects {

  loadDashboards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboards),
      mergeMap(() => {
        // Импорт мок-данных будет происходить из отдельного файла
        // Здесь будет только вызов импорта
        // Реализация будет обновлена ниже
        return import('../../mocks/mock-dashboards').then(module => {
          const dashboards = module.MOCK_DASHBOARDS;
          return DashboardActions.loadDashboardsSuccess({ dashboards });
        });
      }),
      catchError(error => of(DashboardActions.loadDashboardsFailure({ error: error.message })))
    )
  );

  createDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.createDashboard),
      map(({ name, description }) => {
        const newDashboard: Dashboard = {
          id: Date.now(),
          name: name.trim(),
          description: description.trim(),
          charts: []        
        };
        return DashboardActions.createDashboardSuccess({ dashboard: newDashboard });
      })
    )
  );

  addChart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.addChart),
      map(({ dashboardId, chart }) => {
        const newChart: Chart = {
          ...chart,
          id: Date.now()
        };
        return DashboardActions.addChartSuccess({ dashboardId: Number(dashboardId), chart: newChart });
      })
    )
  );

  updateChart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.updateChart),
      map(({ dashboardId, chartId, updates }) => {
        const updatedChart: Chart = {
          id: Number(chartId),
          ...updates
        } as Chart;
        return DashboardActions.updateChartSuccess({ dashboardId: Number(dashboardId), chart: updatedChart });
      })
    )
  );

  applyFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.applyFilters),
      withLatestFrom(this.store.select(selectCurrentDashboard)),
      switchMap(([action, currentDashboard]) => {
        if (!currentDashboard) {
          return of(DashboardActions.applyFiltersFailure({ error: 'No dashboard selected' }));
        }

        // Clone the dashboard to avoid mutating the original
        const filteredDashboard = JSON.parse(JSON.stringify(currentDashboard));
        
        // Apply filters to each chart in the dashboard
        filteredDashboard.charts = filteredDashboard.charts.map((chart: Chart) => {
          return {
            ...chart,
            data: this.filterChartData(chart.data, action.filters)
          };
        });

        return of(DashboardActions.applyFiltersSuccess({ 
          dashboard: filteredDashboard,
          filters: action.filters
        }));
      }),
      catchError(error => of(DashboardActions.applyFiltersFailure({ error: error.message })))
    )
  );

 private filterChartData(chartData: any, filters: FilterClause[]): any {
    if (!filters.length) return chartData;

   const includedIndexes: number[] = [];
  chartData.datasets[0].data.forEach((value: number, index: number) => {
    const label = chartData.labels?.[index] || '';
    let shouldInclude = true;

    for (const filter of filters) {
      switch (filter.field) {
        case 'Gender':
          if (!this.matchGender(label, filter)) shouldInclude = false;
          break;
        case 'Age':
        case 'Value':
          if (!this.compareNumbers(value, filter.operator, Number(filter.value))) shouldInclude = false;
          break;
      }
      if (!shouldInclude) break;
    }
    if (shouldInclude) includedIndexes.push(index);
  });

  // Фильтруем labels и все datasets по найденным индексам
  const filteredLabels = chartData.labels
    ? includedIndexes.map(i => chartData.labels[i])
    : undefined;

  const filteredDatasets = chartData.datasets.map((dataset: any) => ({
    ...dataset,
    data: includedIndexes.map(i => dataset.data[i])
  }));

  return {
    ...chartData,
    datasets: filteredDatasets,
    ...(filteredLabels ? { labels: filteredLabels } : {})
  };
}

  private matchGender(label: string, filter: FilterClause): boolean {
    const labelGender = label.toLowerCase();
    const filterValue = filter.value.toString().toLowerCase();
    
    switch (filter.operator) {
      case 'equals':
      case 'includes':
        return labelGender.includes(filterValue);
      case 'less':
      case 'greater':
        return !labelGender.includes(filterValue);
      default:
        return true;
    }
  } 

  private compareNumbers(value: number, operator: string, filterValue: number): boolean {
    switch (operator) {
      case '>': return value > filterValue;
      case '<': return value < filterValue;
      case '>=': return value >= filterValue;
      case '<=': return value <= filterValue;
      case '=': return value === filterValue;
      case '!=': return value !== filterValue;
      default: return true;
    }
  }


  constructor(private actions$: Actions,private store: Store<{ dashboard: DashboardState }>) {}
}