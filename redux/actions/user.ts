export const useActionsTypes = {
    ADD_PROPERTY: 'ADD_PROPERTY',
    PUT: "PUT",
}
  
export const editUser = ( payload: any) => {
    return ({
        type: useActionsTypes.PUT,
        payload,
    })
}
  
