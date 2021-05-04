export const useActionsTypes = {
    getPackages: 'getPackages',
    getPackage: 'getPackage',
    createPackage: 'createPackage',
    updatePackage: 'updatePackage',
    removePackage: 'removePackage'
}
  
export const getPackages = (payload) => {
    return ({
        type: useActionsTypes.getPackages,
        payload
    })
}

export const getPackage = (id) => {
    return ({
        type: useActionsTypes.getPackage,
        id
    })
}

export const createPackage = (payload) => {
    return ({
        type: useActionsTypes.createPackage,
        payload
    })
}

export const updatePackage = (payload) => {
    return ({
        type: useActionsTypes.updatePackage,
        payload
    })
}

export const removePackage = (payload) => {
    return ({
        type: useActionsTypes.removePackage,
        payload
    })
}



  
