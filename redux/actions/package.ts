export const useActionsTypes = {
    getPackages: 'getPackages',
    getPackage: 'getPackage',
}
  
export const getPackages = () => {
    return ({
        type: useActionsTypes.getPackages,
    })
}

export const getPackage = (id) => {
    return ({
        type: useActionsTypes.getPackage,
        id
    })
}


  
