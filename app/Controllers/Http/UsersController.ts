import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'
import UserLoginValidator from 'App/Validators/UserLoginValidator'

export default class UsersController {
  public index() {
    return { hello: 'world' }
  }

  public async signUp({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    const hasAccount = await User.findBy('email', payload.email)

    if (hasAccount) {
      return response.conflict({ message: 'Email is already registered' })
    }

    await User.create(payload)

    return response.created()
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(UserLoginValidator)

    try {
      const authToken = await auth.use('api').attempt(email, password, { expiresIn: '3 days' })
      return { authToken }
    } catch {
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      revoked: true,
    }
  }
}
