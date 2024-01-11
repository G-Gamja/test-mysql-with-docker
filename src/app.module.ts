import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookEntity } from './books/entities/book.entity';
import { BooksModule } from './books/books.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// TypeOrmModule.forRoot({ ... }): TypeORM 설정을 초기화합니다. forRoot() 메서드는 TypeORM 모듈을 초기화하는 데 필요한 설정 객체를 반환합니다.
// type: 사용할 데이터베이스 종류를 지정합니다. 이 경우 mysql을 사용합니다.
// host, port: 데이터베이스 서버의 호스트 이름과 포트 번호를 지정합니다.
// username, password: 데이터베이스 서버에 로그인하기 위한 사용자 이름과 비밀번호를 지정합니다.
// database: 사용할 데이터베이스 이름을 지정합니다.
// entities: 사용할 엔티티 클래스를 지정합니다. 이 경우 BookEntity를 사용합니다.
// synchronize: 엔티티와 데이터베이스 테이블을 자동으로 동기화할지 여부를 지정합니다. 이 경우 true로 설정하여 자동 동기화를 활성화합니다. 개발모드에서만 사용해야합니다. 운영 환경에서는 false로 설정해야합니다.

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0000',
      database: 'test_docker', // 도커로 mysql bash 진입: docker exec -it ${컨테이너이름} bash  /// 하고나서 mysql -u root -p후 CREATE DATABASE test_docker;(참고로 db이름으로 `_`는 허용 안됨)
      entities: [BookEntity],
      synchronize: true, // ONLY FOR DEVELOPMENT
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// NOTE 데이터 집어넣은 후에는 MySQL Workbench에서 확인 가능
// NOTE SELECT * FROM test_docker.book;
