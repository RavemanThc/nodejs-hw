import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      default: '',
      trim: true,
    },
    // 222
    tag: {
      type: String,
      default: 'Todo',
      enum: TAGS,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      requierd: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
noteSchema.index({ userId: 1, tag: 1 });
export const Note = model('Note', noteSchema);
