import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Attribute,
  AttributeGroup,
  User,
  UserRole,
  UserRolePermission,
  UserToken,
  Upload,
} from './common/models';
import {
  AttributeModule,
  UserModule,
  UploadModule,
  AuthModule,
} from './common/modules';
import dbConfig from './common/config/db.config';
import baseConfig from './common/config/base.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UniqueValidator } from './common/validators/unique.validator';
import { ExistsValidator } from './common/validators/exists.validator';

import { SpecificationFactory } from './common/specifications/specification.factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ['.env.development.local'],
      load: [dbConfig, baseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        synchronize: configService.get<boolean>('database.sync'),
        logging: configService.get<boolean>('database.logging'),
        logger: 'file',
        autoLoadEntities: true,
        entities: [
          Attribute,
          AttributeGroup,
          User,
          UserRole,
          UserRolePermission,
          UserToken,
          Upload,
        ],
      }),
    }),
    AuthModule,
    AttributeModule,
    UserModule,
    UploadModule,
  ],
  exports: [ConfigModule],
  controllers: [AppController],
  providers: [
    UniqueValidator,
    ExistsValidator,
    AppService,
    SpecificationFactory,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
