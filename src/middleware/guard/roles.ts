import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS } from '../../user/common/user.constants';

export const Permissions = (...permissions: PERMISSIONS[]) =>
  SetMetadata('permissions', permissions);
