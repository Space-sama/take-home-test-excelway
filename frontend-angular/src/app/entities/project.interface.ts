export enum Priority {
  LOW="LOW",
  MEDIUM="MEDIUM",
  HIGH="HIGH"
}

export interface Project {
  id?: string | any,
  title?: String,
  description?: String,
  createdAt?: Date,
  updatedAt?: Date,
  priority?: String,
  order?: number
 }
