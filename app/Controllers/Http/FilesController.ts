import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateFileValidator from 'App/Validators/CreateFileValidator'
import EditFileValidator from 'App/Validators/EditFileValidator'
import RenameFileValidator from 'App/Validators/RenameFileValidator'

enum FileKind {
  flow = 'json',
  md = 'markdown',
}

export default class FilesController {
  public async index({ auth }: HttpContextContract) {
    const user = auth.use('api').user!

    const files = await user.related('files').query()

    return files
  }

  public async show({ auth, request }: HttpContextContract) {
    const user = auth.use('api').user!

    const fileId: number = request.param('id')

    const file = await user.related('files').query().where('id', fileId).firstOrFail()

    await file.load('sourceFile')

    return file
  }

  public async create({ auth, request, response }: HttpContextContract) {
    const user = auth.use('api').user!

    const { name, kind, raw } = await request.validate(CreateFileValidator)

    const file = await user.related('files').create({ name, kind, type: FileKind[kind] })

    await file.related('sourceFile').create({ raw })

    await file.load('sourceFile')

    return response.created(file)
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

    const { name, raw } = await request.validate(EditFileValidator)

    const file = await user.related('files').query().where('id', fileId).firstOrFail()

    await file.load('sourceFile')

    await file.merge({ name }).save()

    await file.sourceFile.merge({ raw }).save()

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
