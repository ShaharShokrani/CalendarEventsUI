import { UserPermission } from './user-permission.model';

export class UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userPermissions: UserPermission[];
}