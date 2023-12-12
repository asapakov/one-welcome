import {
  IsNotEmpty,
  IsArray,
  IsString,
  MaxLength,
  IsEnum,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GROUPS, ROLES } from '../common/user.constants';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', nullable: false })
  @MaxLength(100) // max length 100 chars
  @IsString()
  @IsNotEmpty({ message: 'name required' })
  name: string;

  @ApiProperty({ description: 'User roles array', nullable: false })
  @ArrayMinSize(1) // at least one element in array
  @IsArray()
  @IsEnum(ROLES, { each: true })
  @Transform(
    ({ value }) =>
      Array.from(new Set(value.map((el) => el.toUpperCase()).sort())),
    { toClassOnly: true },
  )
  // removing duplicates from array | example: ["GROUP_1", "GROUP_2", "GROUP_1"]
  // each element to uppercase | client can set: ["admin", "personal"]
  // sorting array by ABC
  roles: string[];

  @ApiProperty({ description: 'User groups array', nullable: false })
  @ArrayMinSize(1)
  @IsEnum(GROUPS, { each: true })
  @IsArray()
  @Transform(
    ({ value }) =>
      Array.from(new Set(value.map((el) => el.toUpperCase()).sort())),
    { toClassOnly: true },
  )
  groups: string[];
}
