const { all, create, get, patch, remove } = require('./controller');
const { isAuthenticated } = require('../auth/authenticated');
const { isAuthorized } = require('../auth/authorized');

module.exports.routesConfig = (app) => {
  app.post('/users', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'manager'] }),
    create,
  ]);

  // lists all users
  app.get('/users', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'manager'] }),
    all,
  ]);
  // get :id user
  app.get('/users/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
    get,
  ]);
  // updates :id user
  app.patch('/users/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
    patch,
  ]);
  // deletes :id user
  app.delete('/users/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin', 'manager'] }),
    remove,
  ]);
};
