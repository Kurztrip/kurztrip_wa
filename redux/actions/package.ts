export const useActionsTypes = {
    getPackages: 'getPackages',
}
  
export const getPackages = () => {
    return ({
        type: useActionsTypes.getPackages,
    })
}
  
