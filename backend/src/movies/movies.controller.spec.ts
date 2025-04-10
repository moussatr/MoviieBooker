/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { of } from 'rxjs';

describe('MoviesController', () => {
  let controller: MoviesController;

  const mockMovieResponse = {
    results: [{ id: 1, title: 'Inception' }],
    total_results: 1,
    total_pages: 1,
  };

  const mockMoviesService = {
    getMovies: jest.fn(() => of(mockMovieResponse)),
    getNowPlayingMovies: jest.fn(() => of(mockMovieResponse)),
    searchMovie: jest.fn(() => of(mockMovieResponse)),
    getMovieById: jest.fn(() => of({ id: 1, title: 'Inception' })),
    getGenres: jest.fn(() => of([{ id: 1, name: 'Action' }])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: mockMoviesService }],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should get movies', (done) => {
    controller.getMovies(1, 'popularity').subscribe((res) => {
      expect(res).toEqual(mockMovieResponse);
      done();
    });
  });

  it('should get now playing movies', (done) => {
    controller.getNowPlayingMovies().subscribe((res) => {
      expect(res).toEqual(mockMovieResponse);
      done();
    });
  });

  it('should search for a movie', (done) => {
    controller.searchMovie('Inception').subscribe((res) => {
      expect(res).toEqual(mockMovieResponse);
      done();
    });
  });

  it('should get movie by ID', (done) => {
    controller.getMovieById('1').subscribe((res) => {
      expect(res).toEqual({ id: 1, title: 'Inception' });
      done();
    });
  });

  it('should get genres', (done) => {
    controller.getGenres().subscribe((res) => {
      expect(res).toEqual([{ id: 1, name: 'Action' }]);
      done();
    });
  });
});

