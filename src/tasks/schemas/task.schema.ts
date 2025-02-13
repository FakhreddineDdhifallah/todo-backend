// src/tasks/schemas/task.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop()
  dueDate?: Date;

  @Prop({ enum: ['Low', 'Medium', 'High'], default: 'Medium' })
  priority: string;

  @Prop({ enum: ['Pending', 'Completed'], default: 'Pending' })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
