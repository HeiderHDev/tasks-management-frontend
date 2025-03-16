export interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string | null;
  isDeleted: boolean;
}
