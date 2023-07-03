import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project, ProjectService } from '../project.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  apiUrl = 'http://localhost:8000';


  errors: string = '';
  isLoading: boolean = false;

  constructor(private projectService: ProjectService, private http: HttpClient) { }

  @Output()
  projectAdded: EventEmitter<Project> = new EventEmitter<Project>();

  ngOnInit() {
  }

  addProject(name: string) {
    const projectData = { name: name };

    this.http.post<Project>(this.apiUrl +'/api/projects', projectData).subscribe(
      (response: Project) => {
        console.log('Projet ajouté avec succès !', response);
        // Faites ici ce que vous voulez après avoir ajouté le projet avec succès
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du projet :', error);
        // Gérez ici l'erreur d'ajout du projet
      }
    );
  }
}
