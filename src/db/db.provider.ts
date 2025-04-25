
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://mongo:root@cluster0.tujlqxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
  },
];
