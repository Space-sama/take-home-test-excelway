import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, catchError, finalize, of, throwError } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { Project } from '../../entities/project.interface';
import {moveItemInArray, transferArrayItem, CdkDragDrop} from '@angular/cdk/drag-drop'
import { ProjectsService } from '../../services/project.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {

  public $projects: Observable<Project[]>= new Observable<Project[]>();
  public projects: Project[] = [];
  public error: string | null = null;
  public loading = false;

  imageUrl = 'https://www.excelway.co/wp-content/uploads/2021/03/logo-color-h.svg';

  constructor(public projectsService: ProjectsService, private datePipe: DatePipe, private httClient: HttpClient,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;

    this.projectsService
      .getAllProjects()
      .pipe(
        catchError((error) => {
          this.error = 'Error loading projects! Try again later..';
          return throwError(error);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((projects) => {
        this.projects = projects; // Assign the array to the new property
      });
  }

  createProject(projectData: Partial<Project>): void {
    this.loading = true;

    this.projectsService.createProject(projectData).pipe(
      catchError((error) => {
        this.error = 'Error creating project ! try again later..';
        return throwError(error);
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(() => {
      this.loadProjects();
    });
  }

  viewProject(projectId: string | any): void {
    this.projectsService.getOneProject(projectId).subscribe((project) => {
      if (project) {
        const formattedCreatedAt = this.datePipe.transform(project.createdAt, 'yyyy-MM-dd HH:mm:ss');
        const formattedUpdatedAt = this.datePipe.transform(project.updatedAt, 'yyyy-MM-dd HH:mm:ss');
        const projectDetails = `
          Project ID: ${project.id}
          Title: ${project.title}
          Description: ${project.description}
          Created At: ${formattedCreatedAt}
          Updated At: ${formattedUpdatedAt}
          Priority: ${project.priority}
          Order: ${project.order}
        `;

        alert(projectDetails);
      } else {
        console.error(`Project with ID ${projectId} not found`);
      }
    });
  }

  deleteOne(idProjectToDelete: any){

    if(confirm("Are you sure you want to delete this project?")) {
      this.projectsService.deleteProject(idProjectToDelete).subscribe(
        res => {
          location.reload();
          this.loadProjects();
        }, err => console.log(err),
      )
    }
  }

  onDragDrop(event: CdkDragDrop<Project[]> |any): void {
    // console.log("container data 1 :", event?.container?.data);
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // console.log("After moving index :", this.projects);
    // console.log("the event:", event);

    // Update the order for each project in the front
    this.projects.forEach((project, index) => {
      project.order = index + 1;
    });
    const updatedOrderData = this.projects.map((project, index) => ({
      id: project.id,
      order: index + 1,
    }));

    // Update the order for each project in the back
    updatedOrderData.forEach((data) => {
      this.projectsService.updateProjectOrder(data.id, data.order).subscribe(
        () => {
          console.log(`Order updated successfully for project with ID ${data.id}`);
        },
        (error) => {
          console.error(`Error updating order for project with ID ${data.id}:`, error);
        }
      );
    });
  }
  // conole.log(this.cdr.detectChanges())

}
