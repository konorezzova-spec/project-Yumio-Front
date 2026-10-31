export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorits: [string];
  createdAt: Date;
  updatedAt: Date;
}
