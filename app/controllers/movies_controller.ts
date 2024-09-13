import Movie from '#models/movie'
import type { HttpContext } from '@adonisjs/core/http'
import MovieVM from '#view_models/movie'

export default class MoviesController {
  async index({ view, auth }: HttpContext) {
    await auth.check()

    const comingSoon = await MovieVM.query()
      .apply((scope) => scope.notReleased())
      .preload('director')
      .preload('writer')
      .whereNotNull('releasedAt')
      .orderBy('releasedAt')
      .limit(3)

    const recentlyReleased = await MovieVM.query()
      .apply((scope) => scope.released())
      .preload('director')
      .preload('writer')
      .orderBy('releasedAt', 'desc')
      .limit(9)
    return view.render('pages/home', { comingSoon, recentlyReleased })
  }

  async show({ view, params }: HttpContext) {
    const movie = await Movie.findByOrFail('slug', params.slug)
    const cast = await movie.related('castMembers').query().orderBy('pivot_sort_order')
    const crew = await movie
      .related('crewMembers')
      .query()

      .pivotColumns(['title', 'sort_order'])
      .orderBy('pivot_sort_order')
    await movie.load('director')
    await movie.load('writer')
    return view.render('pages/movies/show', { movie, cast, crew })
  }
}
