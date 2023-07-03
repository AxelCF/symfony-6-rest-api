import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from '../project.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import 'tslib';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.projectService
      .getProjects()
      .pipe(
        tap(projects => {
          this.projects = projects;
          this.isLoading = false;
        }),
        catchError((error: any) => {
          this.errorMessage = <any>error;
          this.isLoading = false;
          return of(null); // Retourne un Observable avec une valeur null
        })
      )
      .subscribe();
  }
  appendProject(project: Project) {
    this.projects.push(project);
  }
  
}
