import React from 'react';
import { Switch , Route , BrowserRouter as Router } from 'react-router-dom';
import {app} from '../pages'
import PrivateRoute from './PrivateRoute/index'

import * as combine from '../utils/config'
function AppRouter() {
  return (
      <div className="App">
          <Router>
              <Switch>
                  {combine.combineRouter(app).map((route,index) => {
                    if(!route.auth) {
                        return ( <Route 
                            key={ index }
                            path={ route.path }
                            exact={ route.exact }
                            component={ route.main }
                        />)
                    }
                    else {
                        return ( <PrivateRoute 
                            key={ index }
                            // {...route}
                            path={ route.path }
                            exact={ route.exact }
                            component={ route.main }
                            // permission_route = { route.permission_route }
                        />)
                    }
                }
                )}
              </Switch>
          </Router>
      </div>
  );
}

export default AppRouter;
