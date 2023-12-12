import { GROUPS, ROLES } from '../common/user.constants';

export interface IUser {
  id?: number;
  name: string;
  roles: ROLES[];
  groups: GROUPS[];
}
