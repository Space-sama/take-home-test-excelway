import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Project } from '../entities/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private API_URL = 'http://localhost:3333/api';
  constructor(public http: HttpClient) {}

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.API_URL}/projects`);
  }

  public getOneProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.API_URL}/projects/get_one/${id}`);
  }

  public createProject(projectData: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(`${this.API_URL}/projects/create_one`, projectData);
  }

  public editOneProject(id: string, updatedData: Partial<Project>): Observable<Project> {
    return this.http.patch<Project>(`${this.API_URL}/projects/edit_one/${id}`, updatedData);
  }

  updateProjectOrder(id: string, order: number): Observable<Project> {
    const url = `${this.API_URL}/projects/edit_by_order/${id}/order`;
    const body = { order };

    return this.http.patch<Project>(url, body);
  }

  public deleteProject(id: string): Observable<Project> {
    return this.http.delete<Project>(`${this.API_URL}/projects/remove_one/${id}`);
  }
}
