import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://mongo:root@cluster0.tujlqxo.mongodb.net/nestjs-db?retryWrites=true&w=majority', {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('MongoDB connected successfully');
        });
        connection.on('error', (err) => {
          console.log('MongoDB connection error: ', err);
        });
        return connection;
      }
    }),
  ],
})
export class dbModule {}