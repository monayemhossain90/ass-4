import { Schema, model } from 'mongoose';
import { CourseModel, TCourse, TDetails, TTag } from './course.interface';
import httpStatus from 'http-status';
import appError from '../../errorHandle/appError';

const tagSchema = new Schema<TTag>({
  name: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  description: {
    type: String,
  },
});
const courseSchema = new Schema<TCourse, CourseModel>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    instructor: {
      type: String,
      trim: true,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    price: {
      type: Number,
      required: true,
    },
    tags: [tagSchema],
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    durationInWeeks: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    details: detailsSchema,
  },
  {
    timestamps: true,
  },
);

courseSchema.pre('save', async function (next) {
  const isCourseExist = await Course.findOne({
    title: this.get('title'),
  });
  if (isCourseExist) {
    throw new appError(
      httpStatus.BAD_REQUEST,
      'Course with this title already exists',
    );
  }
  next();
});

courseSchema.statics.isCourseExist = async function (_id: string) {
  const course = await this.findOne({ _id });
  return course;
};

export const Course = model<TCourse, CourseModel>('Course', courseSchema);
