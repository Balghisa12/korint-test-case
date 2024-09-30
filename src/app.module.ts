import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ClaimsModule } from './claims/claims.module';
import { ConfigModule as ConfigurationModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
import { UserControllerV1 } from './user/user.controller';
import { ClaimsControllerV1 } from './claims/claims.controller';
import { AuthModule } from './auth/auth.module';
import { ApiKeyMiddleware } from './auth/api-key/api-key.middleware';

@Module({
  imports: [
    UserModule,
    ClaimsModule,
    ConfigurationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PostgresConfigService, TypeOrmModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes(UserControllerV1, ClaimsControllerV1);
  }
}
