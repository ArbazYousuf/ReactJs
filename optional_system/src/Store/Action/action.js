import ActionType from './actionType'

const storeAction = {
    login: function (user) {
        return {
            type: ActionType.LOGIN,
            val: user
        }
    },
    signup: function (user) {
        return {
            type: ActionType.SIGNUP,
            val: user
        }

    },
    post: function (data) {
        return {
            type: ActionType.POST,
            val: data
        }
    },
    delete: function () {
        return {
            type: ActionType.DELETE,
            val: {}

        }
    },
    get: function (data) {
        return {
            type: ActionType.GET,
            val : data
        }
    }
}

export default storeAction