import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { types } from '@ioc:Adonis/Core/Helpers'

export default class TransformBody {
  public async handle({ response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()

    const existingBody = response.lazyBody[0]

    if (!existingBody || (!types.isObject(existingBody) && existingBody.constructor !== Array)) {
      return
    }

    response.send({ data: existingBody })
  }
}
