import { Controller, Get, Delete, Param, Patch, NotFoundException, Body, Post, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from '@prisma/client';

@Controller('/api/projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}


  @Post('/create_one')
  async create(@Body() projectData: Partial<Project>) {
    try {
      const createdProject = await this.projectsService.create(projectData);
      return createdProject;
    } catch (error) {
      console.error('Error creating project :', error);
      return { error: 'Failed to create project' };
    }
  }

  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Get("/get_one/:id")
  async findOne(@Param('id') id: string) {
    try {
      return await this.projectsService.findOne(id);
    } catch (error) {
      console.log("Error finding project...");
      return error;
    }
  }

  @Patch('/edit_one/:id')
  async editOne(
    @Param('id') id: string,
    @Body() updatedData: Partial<Project>) {

    try {
      const editedProject = await this.projectsService.editOne(id, updatedData);

      if (!editedProject) {
        throw new NotFoundException('Project not found');
      }

      return editedProject;
    } catch (error) {
      console.log('Error editing project...', error);
      throw error; 
    }
  }

  @Patch('/edit_by_order/:id/order')
  async updateProjectOrder(
    @Param('id') id: string,
    @Body('order', ParseIntPipe) order: number,
  ) {
    try {
      const updatedProject = await this.projectsService.updateOrder(id, order);
      return { success: true, project: updatedProject };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Delete("/remove_one/:id")
  async deleteOne(@Param('id') id: string) {
    try {
      return await this.projectsService.removeOne(id);
    } catch (error) {
      console.log("Error deleting project...");
      return error;
    }
  }
}
