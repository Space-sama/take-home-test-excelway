# Project Management Application Documentation

## NestJS Backend

### Dependencies

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma**: A modern database toolkit for TypeScript and Node.js.
- **Nodemon**: A utility that monitors for changes in the source code and restarts the server automatically.

### Folder Structure
/backend
|-- src
| |-- project
| |-- project.module.ts
| |-- project.service.ts
| |-- project.controller.ts
|-- main.ts

## Angular Frontend

### Dependencies

- **Angular**: A TypeScript-based open-source web application framework.
- **HttpClient**: Angular module for making HTTP requests.
- **@angular/cdk**: Angular Component Dev Kit, in this project it used to drag/drop cards.
- **Bootstrap**: A CSS framework for building responsive websites.

### Folder Structure
/frontend
|-- src
| |-- app
| |-- components
| |-- create-project
| |-- create-project.component.ts
| |-- projects
| |-- projects.component.ts
| |-- entities
| |-- project.interface.ts
| |-- services
| |-- project.service.ts

## Communication Flow

1. Angular components (`create-project` and `projects`) interact with the `project.service` to perform CRUD operations.

2. The `project.service` in Angular communicates with the NestJS backend API's.

3. The NestJS `project.controller` handles the HTTP requests, delegates tasks to the `project.service`, and interacts with the Prisma ORM for database operations.

4. The Prisma ORM in NestJS interacts with the PostgreSQL database.

5. Responses are sent back through the layers to the Angular components.

## Usage

1. Start the NestJS backend server using `nodemon` (npm start run:dev).

2. Run the Angular frontend application (ng serve) --o : http://localhost:4200/projects

3. Interact with the project management features through the Angular user interface.

# Made with love, Oussama.