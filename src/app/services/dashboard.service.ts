import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChartData {
  id: string;
  title: string;
  type: 'bar' | 'line' | 'pie' | 'doughnut';
  data: any;
  options: any;
}

export interface DashboardData {
  id: string;
  name: string;
  description: string;
  charts: ChartData[];  
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardsSubject = new BehaviorSubject<DashboardData[]>([]);
  private currentDashboardSubject = new BehaviorSubject<DashboardData | null>(null);

  dashboards$ = this.dashboardsSubject.asObservable();
  currentDashboard$ = this.currentDashboardSubject.asObservable();

  constructor() {
   
  }

  

  createDashboard(name: string, description: string): DashboardData {
    const newDashboard: DashboardData = {
      id: `dashboard_${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      charts: []     
    };

    const dashboards = [...this.dashboardsSubject.value, newDashboard];
    this.dashboardsSubject.next(dashboards);
    this.currentDashboardSubject.next(newDashboard);

    return newDashboard;
  }

  setCurrentDashboard(dashboardId: string): void {
    const dashboards = this.dashboardsSubject.value;
    const dashboard = dashboards.find(d => d.id === dashboardId);
    if (dashboard) {
      this.currentDashboardSubject.next(dashboard);
    }
  }

  addChartToDashboard(dashboardId: string, chart: Omit<ChartData, 'id'>): void {
    const dashboards = this.dashboardsSubject.value;
    const dashboard = dashboards.find(d => d.id === dashboardId);
    
    if (dashboard) {
      const newChart: ChartData = {
        ...chart,
        id: `chart_${Date.now()}`
      };
      
      dashboard.charts.push(newChart);     
      this.dashboardsSubject.next([...dashboards]);
    }
  }
}