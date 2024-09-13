import factory from '@adonisjs/lucid/factories'
import Cineast from '#models/cineast'
import { MovieFactory } from './movie_factory.js'

export const CineastFactory = factory
  .define(Cineast, async ({ faker }) => {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      headshotUrl: faker.image.avatar(),
    }
  })
  .relation('moviesDirector', () => MovieFactory)
  .relation('moviesWriter', () => MovieFactory)
  .relation('castMovies', () => MovieFactory)
  .relation('crewMovies', () => MovieFactory)
  .build()
