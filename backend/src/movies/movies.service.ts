/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { Genre, Movie, MovieResponse } from './types';

@Injectable()
export class MoviesService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey = process.env.TMDB_API_KEY; 
  
  constructor(private readonly httpService: HttpService) {}

  getMovies(page: number, sortBy: string): Observable<MovieResponse> {
    console.log(this.apiKey);
    
    return this.httpService
      .get<MovieResponse>(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}`, {
        params: {
          page,
          sort_by: sortBy,
        },
      })
      .pipe(map((response: AxiosResponse<MovieResponse>) => response.data));
  }

  getNowPlayingMovies(): Observable<MovieResponse> {
    return this.httpService
      .get<MovieResponse>(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}`,)
      .pipe(map((response: AxiosResponse<MovieResponse>) => response.data));
  }

  searchMovie(movieName: string): Observable<MovieResponse> {
    return this.httpService
      .get<MovieResponse>(`${this.baseUrl}/search/movie?api_key=${this.apiKey}`, {
        
        params: {
          query: movieName,
        },
      })
      .pipe(map((response: AxiosResponse<MovieResponse>) => response.data));
  }

  getMovieById(movieId: string): Observable<Movie> {
    return this.httpService
      .get<Movie>(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`)
      .pipe(map((response: AxiosResponse<Movie>) => response.data));
  }

  getGenres(): Observable<Genre[]> {
    return this.httpService
      .get<Genre[]>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(map((response: AxiosResponse<Genre[]>) => response.data));
  }
}