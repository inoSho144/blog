import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  title: String,
  descrption: String,
  body: String,
  author: String,
  dete_posted: String,
});
