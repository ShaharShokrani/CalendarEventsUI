import { UserProfile } from './user-profile.model';
import { UserClaim } from './user-claim.model';

export class AuthContext {
  userClaims: UserClaim[];
  userProfile: UserProfile;

  get isAdmin() {
    return !!this.userClaims && !!this.userClaims.find(c =>
      c.type === 'role' && c.value === 'Admin');
  }
}