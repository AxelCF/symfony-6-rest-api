import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Project {
  isUpdating: boolean;
  id: number;
  name: string;
  description: string;
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    const headers = new HttpHeaders();

    return this.http.get<Project[]>('api/projects', { headers: headers });
  }

  addProject(project: Project): Observable<Project> {
    const headers = new HttpHeaders();

    return this.http.post<Project>('/api/projects', project, { headers: headers });
  }
}
