import { loginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  async show({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ request, response }: HttpContext) {
    //1. Grab validated data off the request
    const data = await request.validateUsing(loginValidator)
    console.log({ data })
    //2. Login User
    //3. Return to home
    return response.redirect().toRoute('home')
  }
}
