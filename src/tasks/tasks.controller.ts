// src/tasks/tasks.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    const updatedTask = await this.tasksService.update(id, task);
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return updatedTask;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Task> {
    const deletedTask = await this.tasksService.delete(id);
    if (!deletedTask) {
      throw new NotFoundException('Task not found');
    }
    return deletedTask;
  }

  // Add this endpoint for toggling task status
  @Patch(':id/toggle-status')
  async toggleStatus(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.toggleStatus(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
}
