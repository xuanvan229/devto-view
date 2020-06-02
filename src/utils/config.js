export const combineReducer = (app) => {
  const listObject = Object.keys(app)
  // let result = { ...global_reducer }
  let result
  listObject.forEach(item => {
      if(app[ item ].reducer) {
          result = { ...result, ...app[ item ].reducer }
      }
  })
  return result;
}

export const combineRouter = (app) => {
  const listObject = Object.keys(app)
  const result = []
  listObject.forEach(item => {
      if(app[ item ].router) {
          result.push(...app[ item ].router)
      }
  })
  return result
}

export const combineSagas = (app) => {
  const listObject = Object.keys(app)
  const result = []
  listObject.forEach(item => {
      if(app[ item ].sagas) {
          result.push(app[ item ].sagas.root)
      }
  })
  return result
}
