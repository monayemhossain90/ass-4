/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types, Schema, Model } from 'mongoose';
export type TTag = {
  name: string;
  isDeleted?: boolean;
};
export type TDetails = {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
};
export type TCourse = {
  _id: Schema.Types.ObjectId;
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: TDetails;
  createdBy: Types.ObjectId;
  [key: string]: any;
};
export interface CourseModel extends Model<TCourse> {
  isCourseExist(id: number): Promise<TCourse | null>;
}
