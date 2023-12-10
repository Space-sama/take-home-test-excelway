import { Component } from '@angular/core';
import { Priority, Project } from '../../entities/project.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  editStatus : string = '';
  conditionalEnumLabels = Priority;
  enumKeysLabels: string[]=[];
  public projectObject: Project = {};
  err: any;

  constructor(private routers: Router, private activatedRoute: ActivatedRoute,
     private projectService: ProjectsService,) {
      this.enumKeysLabels = Object.keys(this.conditionalEnumLabels);
   }

  ngOnInit(): void {
    this.spontaneousRoute();
  }

  spontaneousRoute(){
    const urlParam = this.activatedRoute.snapshot.paramMap.get('id');
    if(urlParam){
      this.projectService.getOneProject(urlParam).subscribe(
        res => {
          this.editStatus = 'OK';
          // console.log(res);
          this.projectObject = res;
        }, err => console.log(err),
      )
    }
  }

  submitForm(){
    this.projectService.createProject(this.projectObject).subscribe(
      res => {
        console.log("add res-----", res);
        this.routers.navigate(['/projects']);
      },
      (err) =>{
        console.log(err);
        this.err = "Please fill out this field !";
      }
    )
  }

  updateOneProject(){
    this.projectService.editOneProject(this.projectObject.id, this.projectObject).subscribe(
      res => {
        console.log(res);
        this.routers.navigate(['/projects']);
      }, err => console.log(err),
    )
  }
}
