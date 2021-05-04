export const useActionsTypes = {
    getTrucks: 'getTrucks',
    getTruck: 'getTruck',
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


  
