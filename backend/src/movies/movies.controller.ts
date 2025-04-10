/* eslint-disable prettier/prettier */
import { Controller, Get, Query} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Observable } from 'rxjs';
import { MovieResponse, Genre, Movie } from './types';
import { ApiOperation } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('movie')
@Controller('movie')
export class MoviesController {
     constructor(private readonly moviesService: MoviesService) {}

    @ApiOperation({ summary: 'Get movies' })
    @Get('/movies')
    getMovies(@Query('page') page: number, @Query('sortBy') sortBy: string): Observable<MovieResponse> {
        return this.moviesService.getMovies(page, sortBy);
    }

    @ApiOperation({ summary: 'Get now playing movies' })
    @Get('movie/now_playing')
    getNowPlayingMovies(): Observable<MovieResponse> {
        return this.moviesService.getNowPlayingMovies();
    }

    @ApiOperation({ summary: 'Search movie' })
    @Get('/search/movie')
    searchMovie(@Query('movieName') movieName: string): Observable<MovieResponse> {
        return this.moviesService.searchMovie(movieName);
    }

    @ApiOperation({ summary: 'Get movie by ID' })
    @Get('/movie/:movie_id')
    getMovieById(@Query('movieId') movieId: string): Observable<Movie> { 
        return this.moviesService.getMovieById(movieId);
    }

    @ApiOperation({ summary: 'Get genres' })
    @Get()
    getGenres(): Observable<Genre[]> {
        return this.moviesService.getGenres();
    }
    
}
