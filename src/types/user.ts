// What other people are allowed to see (no email)
export interface PublicUser {
  id: string;
  username: string;
  avatar: string;
}

export interface UserProfile extends PublicUser {
  createdAt: string;
}

export interface UpdateProfilePayload {
  username?: string;
  avatar?: string;
}

export interface SearchUsersResponse {
  success: true;
  users: PublicUser[];
}

export interface UserProfileResponse {
  success: true;
  user: UserProfile;
}
