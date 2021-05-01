export const useActionsTypes = {
    getTrucks: 'getTrucks',
    getTruck: 'getTruck',
}
  
export const getTrucks = () => {
    return ({
        type: useActionsTypes.getTrucks,
    })
}

export const getTruck = (id) => {
    return ({
        type: useActionsTypes.getTruck,
        id
    })
}


  
