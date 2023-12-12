export const USERS = [
  {
    id: 1,
    name: 'John Doe',
    roles: ['ADMIN', 'PERSONAL'],
    groups: ['GROUP_1', 'GROUP_2'],
  },
  {
    id: 2,
    name: 'Grabriel Monroe',
    roles: ['PERSONAL'],
    groups: ['GROUP_1', 'GROUP_2'],
  },
  { id: 3, name: 'Alex Xavier', roles: ['PERSONAL'], groups: ['GROUP_2'] },
  {
    id: 4,
    name: 'Jarvis Khan',
    roles: ['ADMIN', 'PERSONAL'],
    groups: ['GROUP_2'],
  },
  {
    id: 5,
    name: 'Martines Polok',
    roles: ['ADMIN', 'PERSONAL'],
    groups: ['GROUP_1'],
  },
  {
    id: 6,
    name: 'Gabriela Wozniak',
    roles: ['VIEWER', 'PERSONAL'],
    groups: ['GROUP_1'],
  },
];

export enum ROLES {
  ADMIN = 'ADMIN',
  PERSONAL = 'PERSONAL',
  VIEWER = 'VIEWER',
}

export enum GROUPS {
  GROUP_1 = 'GROUP_1',
  GROUP_2 = 'GROUP_2',
}

export enum PERMISSIONS {
  CREATE = 'CREATE',
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export const ROLES_WITH_PERMISSIONS = [
  {
    name: 'Admin',
    code: ROLES.ADMIN,
    permissions: [
      PERMISSIONS.CREATE,
      PERMISSIONS.VIEW,
      PERMISSIONS.EDIT,
      PERMISSIONS.DELETE,
    ],
  },
  { name: 'Personal', code: ROLES.PERSONAL, permissions: [] },
  { name: 'Viewer', code: ROLES.VIEWER, permissions: [PERMISSIONS.VIEW] },
];
