import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import SourceFile from '../SourceFile'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: 'json' | 'md'

  @column()
  public kind: 'flow' | 'markdown'

  @column()
  public owner_id: number

  @hasOne(() => SourceFile, { foreignKey: 'file_id' })
  public sourceFiles: HasOne<typeof SourceFile>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
