import { model, Schema } from 'mongoose';

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    requierd: true,
  },
  accessToken: {
    type: String,
    requierd: true,
  },
  refreshToken: {
    type: String,
    requierd: true,
  },
  accessTokenValidUntil: {
    type: Date,
    requierd: true,
  },
  refreshTokenValidUntil: {
    type: Date,
    requierd: true,
  },
});

export const Session = model('session', sessionSchema);
