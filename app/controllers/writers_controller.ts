import Cineast from '#models/cineast'
import type { HttpContext } from '@adonisjs/core/http'

export default class WritersController {
  async index({ view }: HttpContext) {
    const writers = await Cineast.query()
      .orderBy([
        { column: 'firstName', order: 'asc' },
        { column: 'lastName', order: 'asc' },
      ])
      .whereHas('moviesWriter', (query) => query)
      .withCount('moviesWriter', (query) =>
        query.apply((scope) => scope.released()).as('releasedCount')
      )
      .withCount('moviesWriter', (query) =>
        query.apply((scope) => scope.notReleased()).as('notReleasedCount')
      )

    return view.render('pages/writers/index', { writers })
  }

  async show({ view, params }: HttpContext) {
    const writer = await Cineast.query()
      .where({ id: params.id })
      .preload('moviesWriter')
      .firstOrFail()

    return view.render('pages/writers/show', { writer })
  }
}
