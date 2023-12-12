import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interface';
import { GROUPS, ROLES } from './common/user.constants';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto, users: CreateUserDto[]): CreateUserDto {
    users.push({ id: users.length + 1, ...createUserDto } as CreateUserDto);
    return createUserDto;
  }

  findAll(users: IUser[]): IUser[] {
    return users;
  }

  findOne(id: number, users: IUser[]): IUser {
    const user = users.find((user: IUser) => user.id == id);
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto, users: IUser[]): IUser {
    const updatingUser = users.find((user: IUser) => user.id === id);
    if (!updatingUser) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    users[users.indexOf(updatingUser)] = {
      id,
      ...updatingUser,
      ...updateUserDto,
    } as IUser;
    return updateUserDto as IUser;
  }

  remove(id: number, users: IUser[]): IUser[] {
    const deletingUser = users.find((user: IUser) => user.id == id);
    if (!deletingUser) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    users.splice(users.indexOf(deletingUser), 1);
    return users;
  }

  managed(id: number, users: IUser[]) {
    const manager = users.find((user: IUser) => user.id == id);
    if (!manager) {
      throw new NotFoundException(`Manager with id: ${id} not found`);
    }
    if (!manager.roles.includes(ROLES.ADMIN)) return [];
    return users.filter(
      (user: IUser) =>
        // in case if manager has multiple groups
        user.groups.some((group: GROUPS) => manager.groups.includes(group)) &&
        user.id !== id, // exclude manager
    );
  }
}
