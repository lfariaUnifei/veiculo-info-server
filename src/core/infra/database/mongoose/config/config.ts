import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

export default async function connectMongoDB(): Promise<void> {
  const { DATABASE_CONN_URL } = process.env;
  if (!DATABASE_CONN_URL) {
    throw new Error('Missing env variable "DATABASE_CONN_URL".');
  }
  await mongoose.connect(
    DATABASE_CONN_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  );
}
