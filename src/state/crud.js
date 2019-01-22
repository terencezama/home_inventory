import { request, success, failure } from "./types";

const rstate = {
    fetching: false,
    err: null,
    res: null,
    payload: null
}

const INITIAL_STATE = {
    create: rstate,
    read: rstate, // or list
    update: rstate,
    delete: rstate
}




export const crudReducer = (type) => (state = INITIAL_STATE, action) => {
    const create_type = `${type}_CREATE`;
    const read_type = `${type}_READ`;
    const update_type = `${type}_UPDATE`;
    const delete_type = `${type}_DELETE`;

    switch (action.type) {
        case request(create_type): {
            return {
                ...state,
                create: {
                    ...rstate,
                    payload: action.payload,
                    fetching: true
                }
            }
        }
        case success(create_type): {
            return {
                ...state,
                create: {
                    ...rstate,
                    res: action.payload,
                    fetching: false
                }
            }
        }
        case failure(create_type):
            {
                return {
                    ...state,
                    create: {
                        ...rstate,
                        err: action.payload,
                        fetching: false
                    }
                }
            }
        case request(read_type): {
            return {
                ...state,
                read: {
                    ...rstate,
                    payload: action.payload,
                    fetching: true
                }
            }
        }
        case success(read_type): {
            return {
                ...state,
                read: {
                    ...rstate,
                    res: action.payload,
                    fetching: false
                }
            }
        }
        case failure(read_type): {
            return {
                ...state,
                read: {
                    ...rstate,
                    err: action.payload,
                    fetching: false
                }
            }
        }
        case request(update_type): {
            return {
                ...state,
                update: {
                    ...rstate,
                    payload: action.payload,
                    fetching: true
                }
            }
        }
        case success(update_type): {
            return {
                ...state,
                update: {
                    ...rstate,
                    res: action.payload,
                    fetching: false
                }
            }
        }
        case failure(update_type): {
            return {
                ...state,
                update: {
                    ...rstate,
                    err: action.payload,
                    fetching: false
                }
            }
        }
        case request(delete_type): {
            return {
                ...state,
                delete: {
                    ...rstate,
                    payload: action.payload,
                    fetching: true
                }
            }
        }
        case success(delete_type): {
            return {
                ...state,
                delete: {
                    ...rstate,
                    res: action.payload,
                    fetching: false
                }
            }
        }
        case failure(delete_type): {
            return {
                ...state,
                delete: {
                    ...rstate,
                    err: action.payload,
                    fetching: false
                }
            }
        }
        default:
            return state
    }
}