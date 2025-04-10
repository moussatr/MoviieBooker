/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn((username, email, password) => {
      return { id: 1, username, email };
    }),
    login: jest.fn((email, password) => {
      return { access_token: 'fake-jwt-token' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const user: User = { id: 1, username: 'John', email: 'john@example.com', password: '1234' };
    expect(await controller.register(user)).toEqual({
      id: 1,
      username: 'John',
      email: 'john@example.com',
    });
  });

  it('should login a user', async () => {
    const user: User = { id: 1, username: '', email: 'john@example.com', password: '1234' };
    expect(await controller.login(user)).toEqual({
      access_token: 'fake-jwt-token',
    });
  });
});
