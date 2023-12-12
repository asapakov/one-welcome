import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permissions } from '../middleware/guard/roles';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GROUPS, PERMISSIONS, ROLES, USERS } from './common/user.constants';
import { IUser } from './interface';
import { RolesGuard } from '../middleware/guard/role.guard';

@ApiTags('Users')
@Controller('users')
export class UserController implements OnModuleInit {
  private users = [];
  private groups = [];
  private roles = [];
  private permissions = [];

  constructor(private readonly userService: UserService) {}

  @Post()
  @Permissions(PERMISSIONS.CREATE)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createUserDto: CreateUserDto): CreateUserDto {
    return this.userService.create(createUserDto, this.users);
  }

  @Get()
  @Permissions(PERMISSIONS.VIEW)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get all existing users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.userService.findAll(this.users);
  }

  @Get(':id')
  @Permissions(PERMISSIONS.VIEW)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id, this.users);
  }

  @Patch(':id')
  @Permissions(PERMISSIONS.EDIT)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): IUser {
    return this.userService.update(+id, updateUserDto, this.users);
  }

  @Delete(':id')
  @Permissions(PERMISSIONS.DELETE)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Remove user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  remove(@Param('id') id: string): IUser[] {
    return this.userService.remove(+id, this.users);
  }

  @Get('/managed/:id')
  @Permissions(PERMISSIONS.VIEW)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get managed users by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiParam({ name: 'id', required: true, description: 'Manager identifier' })
  managed(@Param('id') id: string): IUser[] {
    return this.userService.managed(+id, this.users);
  }

  onModuleInit(): void {
    // on module initialization setting predefined data
    this.users = USERS;
    this.groups = Object.keys(GROUPS);
    this.roles = Object.keys(ROLES);
    this.permissions = Object.keys(PERMISSIONS);
  }
}
