import { INestApplication } from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as pactum from 'pactum';
import { PrismaService } from "../src/prisma/prisma.service";
import { AppModule } from "../src/app.module";
import { CreateBookmarkDto, EditBookmarkDto } from "src/bookmark/dto";
import { after } from "node:test";
import { AuthDto } from "src/auth/dto";
import { EditUserDto } from "src/user/dto";
describe('App e2e', () =>{
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({whitelist:true})
    )
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService)
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    app.close();
  })
  const dto: AuthDto = {
    email: 'vlad@gmail.com',
    password:'123'
  };
  describe('Auth', () =>{
    describe('Signup', () =>{
      it('should throw if email empty', () => {
        return pactum.spec().post('/auth/signup').withBody({password:dto.password}).expectStatus(400)
      })

      it('should throw if  password empty', () => {
        return pactum.spec().post('/auth/signup').withBody({email:dto.email}).expectStatus(400)
      })

      it('should throw if body empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400)
      })

      it('should signup', () =>{
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
      })
    })

    describe('signin', () =>{
      let accessToken: string;
      it('should throw if email empty', () => {
        return pactum.spec().post('/auth/signin').withBody({password:dto.password}).expectStatus(400)
      })

      it('should throw if  password empty', () => {
        return pactum.spec().post('/auth/signin').withBody({email:dto.email}).expectStatus(400)
      })

      it('should throw if body empty', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400)
      })

      it('should signin', () => {
        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200).stores('userAt', 'access_token').inspect();
      });
    })
  })

  describe('User', () =>{
    describe('me', () =>{
      it('should get current account', () => {
        return pactum.spec().get('/users/me').withHeaders({Authorization: 'Bearer $S{ userAt}'}).expectStatus(200);

      })
    })

    describe('edit account', () =>{
      it('should edit current account', () => {
        const dto: EditUserDto ={firstName: 'vladmir', lastName: 'vlud@gmail.com'}
        return pactum.spec().patch('/users/edit').withHeaders({Authorization: 'Bearer $S{ userAt}'}).withBody(dto).expectStatus(200);

      })
    })
  })

  describe('bookmark', () =>{
    describe('get empty bookmarks', () => {
      it("should get bookmarks", () =>{
        return pactum.spec().get('/bookmarks').withHeaders({Authorization: 'Bearer $S{userAt}'}).expectStatus(200).expectBody([])
      })
    })

    describe('create bookmark', () => {
      const dto:CreateBookmarkDto ={
        title:'video', 
        link:'youtube.com',
        description:'good video'
      }
      it('should create bookmark', () =>{
        return pactum.spec().post('/bookmarks').withHeaders({Authorization: 'Bearer $S{userAt}'}).withBody(dto).expectStatus(201).stores('bookmarkId', 'id');

      })
    })
    
    describe('get bookmarks', () => {
      it("should get bookmarks", () =>{
        return pactum.spec().get('/bookmarks').withHeaders({Authorization: 'Bearer $S{userAt}'}).expectStatus(200).expectJsonLength(1);
      })
    })
    
    describe('get bookmark by id', () => {
      it("should get bookmarks id", () =>{
        return pactum.spec().get('/bookmarks/{id}').withPathParams('id', '$S{bookmarkId}').withHeaders({Authorization: 'Bearer $S{userAt}'}).expectStatus(200).expectBodyContains('$S{bookmarkId}');
      })
    })

    describe('edit bookmark by id', () => {
      const dto: EditBookmarkDto = {description: "very good"};
        it("should edit bookmarks id", () => {
          return pactum.spec().patch('/bookmarks/{id}').withPathParams('id', '$S{bookmarkId}').withHeaders({Authorization: 'Bearer $S{userAt}'}).withBody(dto).expectStatus(200);
        })
    })

    describe('delete bookmark by id', () => {
        it("should get bookmarks id", () =>{
          return pactum.spec().delete('/bookmarks/{id}').withPathParams('id', '$S{bookmarkId}').withHeaders({Authorization: 'Bearer $S{userAt}'}).expectStatus(204);
        })
    })

  })
 
  // it.todo('should pass');
})