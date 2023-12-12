import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppLoggerMiddleware } from './middleware/logger/app-logger.middleware';

@Module({
  imports: [UserModule],
})
export class AppModule implements NestModule {
  // adding middleware to log all incoming requests
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
