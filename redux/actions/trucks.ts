export const useActionsTypes = {
    getTrucks: 'getTrucks',
    getTruck: 'getTruck',
    createTruck: 'createTruck',
}
  
export const getTrucks = (payload) => {
    return ({
        type: useActionsTypes.getTrucks,
        payload
    })
}

export const getTruck = (id) => {
    return ({
        type: useActionsTypes.getTruck,
        id
    })
}

export const createTruck = (payload) => {
    return ({
        type: useActionsTypes.createTruck,
        payload
    })
}


  
