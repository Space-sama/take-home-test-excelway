import { PrismaClient, Project } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';

const prisma = new PrismaClient();
@Injectable()
export class ProjectsService {

  async create(projectData: Partial<Project>): Promise<Project> {
    try {
      const existingProjects = await prisma.project.findMany();
      // const order = existingProjects.length + 1;
      const order = existingProjects.length > 0 ? Math.max(...existingProjects.map(p => p.order)) + 1 : 1;

      const createdProject = await prisma.project.create({
        data: {
          // cast to Project model
          ...(projectData as Project),
          order,
        },
      });
      console.log("Project created successfully...");
      return createdProject;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  async findAll(): Promise<Project[]> {
    try {
      const projects = await prisma.project.findMany({
        orderBy: {
          order: 'asc',
        },
      });

      return projects;
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Project | null> {
    try {

      const project = await prisma.project.findUnique({
        where: {
          id,
        },
      });

      return project;
    } catch (error) {
      console.error(`Error finding project with ID ${id}:`, error);
      throw error;
    }
  }

  async editOne(id: string, updatedData: Partial<Project>): Promise<Project | null> {
    const existingProject = await this.findOne(id);

    if (!existingProject) {
      throw new NotFoundException('Project not found');
    }

    const updatedProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        ...updatedData,
      },
    });
    console.log("Project with ID ", id, "updated successfully...");
    return updatedProject;
  }

  async removeOne(id: string) {
    const existingProject = await this.findOne(id);

    if (!existingProject) {
      throw new NotFoundException('Project not found');
    }

    const updatedProject = await prisma.project.delete({
      where: {
        id,
      },
    });

    // Adjust the order of remaining projects
    const remainingProjects = await prisma.project.findMany();
    for(let i = 0; i < remainingProjects.length; ++i) {
      const project = remainingProjects[i];
      await prisma.project.update({
        where: {
          id: project.id,
        },
        data: {
          order: i + 1,
        },
      });
    }
    console.log("Project with ID ", id, "deleted successfully...");
    return updatedProject;
  }

  async updateOrder(id: string, order: number) {
    const project = await prisma.project.findUnique({
      where: {
         id,
      }
    });

    if (!project) {
      throw new NotFoundException(`Project-order with ID ${id} not found`);
    }

    return prisma.project.update({
      where: { id },
      data: { order },
    });
  }
}
