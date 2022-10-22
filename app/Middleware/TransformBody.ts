import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransformBody {
  public async handle({ response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()

    const existingBody = response.lazyBody[0]

    if (
      !existingBody ||
      (existingBody.constructor !== Object && existingBody.constructor !== Array)
    ) {
      return
    }

    response.send({ data: existingBody })
  }
}
