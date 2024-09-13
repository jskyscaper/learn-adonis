import User from '#models/user'
import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async show({ view }: HttpContext) {
    //return view.render('pages/auth/register')
  }

  async store({ request, response, auth }: HttpContext) {
    //1. Grab data and validate it
    //const data = await request.validateUsing(registerValidator)
    //2. Create user
    //const user = await User.create(data)
    //3. Login user
    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }
}
