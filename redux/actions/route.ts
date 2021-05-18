export const useActionsTypes = {
    getRoutes: 'getRoutes'
}
  
export const getRoutes = (payload) => {
    return ({
        type: useActionsTypes.getRoutes,
        payload
    })
}


  
