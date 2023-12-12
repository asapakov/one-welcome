import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ROLES_WITH_PERMISSIONS,
  USERS,
} from '../../user/common/user.constants';
import { IUser } from '../../user/interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    // get permissions required
    const permissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );
    if (!permissions) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const user = USERS.find((user) => user.id == request.headers.authorization);
    if (!user) {
      return false;
    }
    return this.validatePermissions(permissions, user.roles);
  }

  validatePermissions(permissions: string[], userRoles: string[]) {
    const roleBasedPermissionsWithDuplicates = ROLES_WITH_PERMISSIONS.filter(
      (role) => userRoles.includes(role.code),
    ).reduce((prev, curr) => {
      prev = [...prev, ...curr.permissions];
      return prev;
    }, []);
    const filteredRoleBasedPermissions = Array.from(
      new Set(roleBasedPermissionsWithDuplicates),
    );
    return permissions.some((permission) =>
      filteredRoleBasedPermissions.includes(permission),
    );
  }
}
