import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { ControllerResult } from 'src/shared/results/controller.result';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<ControllerResult<Task[]>> {
    const allTasks = await this.taskService.getAllTasks();
    return new ControllerResult<Task[]>(allTasks.data, HttpStatus.OK);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<ControllerResult<Task | null>> {
    const task = await this.taskService.getTaskById(id);
    return new ControllerResult<Task | null>(task.data, HttpStatus.OK);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<ControllerResult<Task>> {
    const task = new Task(createTaskDto);
    const newTask = await this.taskService.createTask(task);
    return new ControllerResult<Task>(newTask.data, HttpStatus.CREATED);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<ControllerResult<Task>> {
    const updatedTask = await this.taskService.updateTask(id, updateTaskDto);
    
    return new ControllerResult<Task>(updatedTask.data, HttpStatus.OK);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<ControllerResult<void>> {
    await this.taskService.deleteTask(id);
    return new ControllerResult<void>(null, HttpStatus.NO_CONTENT);
  }

  @Get('user/:userId')
  async getTasksByUserId(@Param('userId') userId: string): Promise<ControllerResult<Task[]>> {
    const userTasks = await this.taskService.getTasksByUserId(userId);
    return new ControllerResult<Task[]>(userTasks.data, HttpStatus.OK);
  }
}
