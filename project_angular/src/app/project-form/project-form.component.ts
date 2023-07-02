import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Project, ProjectService } from '../project.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  errors: string = '';
  isLoading: boolean = true;

  constructor(private projectService: ProjectService) { }

  @Output()
  projectAdded: EventEmitter<Project> = new EventEmitter<Project>();

  ngOnInit() {
  }

  addProject(name: string) {
    this.isLoading = true;
    const newProject: Project = {
      id: 0, // Remplacez la valeur par l'ID approprié
      name: name,
      description: '', // Ajoutez la description appropriée
      isUpdating: false // Ajoutez la valeur de isUpdating appropriée
    };
    
    this.projectService
      .addProject(newProject)
      .subscribe(
        project => {
          project.isUpdating = false;
          this.projectAdded.emit(project);
          this.isLoading = false;
        },
        error => {
          this.errors = error.json().errors;
          this.isLoading = false;
        }
      );
  }
    
}