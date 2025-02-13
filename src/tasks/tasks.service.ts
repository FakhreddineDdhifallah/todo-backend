// src/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async update(id: string, task: Task): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
  }

  async delete(id: string): Promise<Task | null> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  async toggleStatus(id: string): Promise<Task | null> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) return null;
    task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
    return task.save();
  }
}
