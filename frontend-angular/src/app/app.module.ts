import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProjectsService } from './services/project.service';
import { AppComponent } from './app.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
