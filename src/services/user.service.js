import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const AUTH_BASE_URL = 'auth/'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getEmptyCredentials
}


async function login(userCred) {
    try {
        const user = await httpService.post(AUTH_BASE_URL + 'login', userCred)
        if (user) return saveLocalUser(user)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during login')
    }
}

async function signup(userCred) {
    try {
        const user = await httpService.post(AUTH_BASE_URL + 'signup', userCred)
        return saveLocalUser(user)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during signup')
    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post(AUTH_BASE_URL + '/logout')
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}
