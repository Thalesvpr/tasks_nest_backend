import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AccessGuard)
@Controller('tasks')
@ApiTags('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  async getAllTasks(): Promise<Task[]> {
    const allTasks = await this.taskService.getAllTasks();
    return allTasks
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task | null> {
    const task = await this.taskService.getTaskById(id);
    return task
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: User): Promise<Task> {
    const task = new Task(createTaskDto);
    const newTask = await this.taskService.createTask(task, user.id);
    return newTask
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @CurrentUser() user: User): Promise<Task> {
    const updatedTask = await this.taskService.updateTask(id, updateTaskDto, user.id);
    return updatedTask
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    const deleted = await this.taskService.deleteTask(id, user.id);
  }

  @Get('user/:userId')
  async getTasksByUserId(@Param('userId') userId: string): Promise<Task[]> {
    const userTasks = await this.taskService.getTasksByUserId(userId);
    return userTasks
  }
}

