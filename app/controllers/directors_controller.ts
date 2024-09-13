import Cineast from '#models/cineast'
import type { HttpContext } from '@adonisjs/core/http'

export default class DirectorsController {
  async index({ view }: HttpContext) {
    const directors = await Cineast.query()
      .orderBy([
        { column: 'firstName', order: 'asc' },
        { column: 'lastName', order: 'asc' },
      ])
      .whereHas('moviesDirector', (query) => query.apply((scope) => scope.released()))

    return view.render('pages/directors/index', { directors })
  }
  async show({ view, params }: HttpContext) {
    const director = await Cineast.findOrFail(params.id)
    const movies = await director.related('moviesDirector').query().orderBy('title')
    return view.render('pages/directors/show', { director, movies })
  }
}
