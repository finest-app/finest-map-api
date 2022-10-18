import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'FilesController.index')
  Route.get('/:id', 'FilesController.show')
  Route.post('/', 'FilesController.create')
  Route.patch('/rename/:id', 'FilesController.rename').where('id', Route.matchers.number())
  Route.patch('/edit/:id', 'FilesController.edit').where('id', Route.matchers.number())
  Route.delete('/delete/:id', 'FilesController.delete').where('id', Route.matchers.number())
})
  .prefix('/files')
  .middleware('auth')
