import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateFileValidator from 'App/Validators/CreateFileValidator'
import EditFileValidator from 'App/Validators/EditFileValidator'
import RenameFileValidator from 'App/Validators/RenameFileValidator'

enum FileKind {
  json = 'flow',
  markdown = 'md',
}

export default class FilesController {
  public async index({ auth }: HttpContextContract) {
    const user = auth.use('api').user!

    const files = await user.related('files').query()

    return { data: files }
  }

  public async show({ auth, request }: HttpContextContract) {
    const user = auth.use('api').user!

    const fileId: number = request.param('id')

    const file = await user.related('files').query().where('id', fileId).firstOrFail()

    const sourceFile = await file.related('sourceFiles').query().firstOrFail()

    return {
      data: sourceFile,
    }
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const user = auth.use('api').user!

    const { name, kind, raw } = await request.validate(CreateFileValidator)

    const file = await user.related('files').create({ name, kind, type: FileKind[kind] })

    await file.related('sourceFiles').create({ raw })

    return response.created()
  }

  public async rename({ auth, request, response }: HttpContextContract) {
    const user = auth.use('api').user!
    const fileId: number = request.param('id')

    const { name } = await request.validate(RenameFileValidator)

    const file = await user.related('files').query().where('id', fileId).firstOrFail()

    await file.merge({ name }).save()

    return response.noContent()
  }

  public async edit({ auth, request, response }: HttpContextContract) {
    const user = auth.use('api').user!
    const fileId: number = request.param('id')

    const { raw } = await request.validate(EditFileValidator)

    const file = await user.related('files').query().where('id', fileId).firstOrFail()

    const sourceFile = await file.related('sourceFiles').query().firstOrFail()

    await sourceFile.merge({ raw }).save()

    return response.noContent()
  }

  public async delete({ auth, request, response }: HttpContextContract) {
    const user = auth.use('api').user!
    const fileId: number = request.param('id')

    const file = await user.related('files').query().where('id', fileId).firstOrFail()

    await file.delete()

    return response.noContent()
  }
}
