import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as DashboardActions from './dashboard.actions';
import { Dashboard, Chart } from './dashboard.state';

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

  duplicateChart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.duplicateChart),
      map(({ dashboardId, chartId }) => {
        const duplicatedChart: Chart = {
          id: Date.now(),
          title: 'Duplicated Chart',
          type: 'bar',
          data: {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [{
              data: [65, 59, 80, 81],
              backgroundColor: '#d4a421'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        };
        return DashboardActions.duplicateChartSuccess({ dashboardId: Number(dashboardId), chart: duplicatedChart });
      })
    )
  );

  constructor(private actions$: Actions) {}
}