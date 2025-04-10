/* eslint-disable prettier/prettier */
import { Controller, Get, Query} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Observable } from 'rxjs';
import { MovieResponse, Genre, Movie } from './types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('movie')
@Controller('movie')
export class MoviesController {
     constructor(private readonly moviesService: MoviesService) {}


    @Get('/movies')
    @ApiOperation({ summary: 'Get movies' })
    @ApiResponse({ status: 200, description: 'Get movies' })
    @ApiResponse({ status: 404, description: 'Movies not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    getMovies(@Query('page') page: number, @Query('sortBy') sortBy: string): Observable<MovieResponse> {
        return this.moviesService.getMovies(page, sortBy);
    }


    @Get('movie/now_playing')
    @ApiOperation({ summary: 'Get now playing movies' })
    @ApiResponse({ status: 200, description: 'Get now playing movies' })
    @ApiResponse({ status: 404, description: 'Now playing movies not found' })
    getNowPlayingMovies(): Observable<MovieResponse> {
        return this.moviesService.getNowPlayingMovies();
    }


    @Get('/search/movie')
    @ApiOperation({ summary: 'Search movie' })
    @ApiResponse({ status: 200, description: 'Search movie' })
    @ApiResponse({ status: 404, description: 'Movie not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    searchMovie(@Query('movieName') movieName: string): Observable<MovieResponse> {
        return this.moviesService.searchMovie(movieName);
    }


    @Get('/movie/:movie_id')
    @ApiOperation({ summary: 'Get movie by ID' })
    @ApiResponse({ status: 200, description: 'Get movie by ID' })
    @ApiResponse({ status: 404, description: 'Movie not found' })
    getMovieById(@Query('movieId') movieId: string): Observable<Movie> { 
        return this.moviesService.getMovieById(movieId);
    }

    @Get()
    @ApiOperation({ summary: 'Get genres' })
    @ApiResponse({ status: 200, description: 'Get genres' })
    @ApiResponse({ status: 404, description: 'Genres not found' })
    getGenres(): Observable<Genre[]> {
        return this.moviesService.getGenres();
    }
    
}
