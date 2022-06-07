import request from './http';

//获取验证码
export function getCaptcha(phone) {
    return request({
        url: "/captcha/sent?phone=" + phone,
        method: "get",
    })
}

// /cellphone/existence/check?phone=

export function getIsNewUser(phone) {
    return request({
        url: "/cellphone/existence/check?phone=" + phone,
        method: "get",
    })
}

export function getLogin(params) {
    return request({
        url: "/login/cellphone",
        method: "get",
        params
    })
}
export function getJoin(params) {
    return request({
        url: "/register/cellphone",
        method: "get",
        params
    })
}

// /nickname/check
export function getIsName(nickname) {
    return request({
        url: "/nickname/check?nickname=" + nickname,
        method: "get",
    })
}

// /captcha/verify

export function getIsCaptcha(params) {
    return request({
        url: "/captcha/verify",
        method: "get",
        params
    })
}

// /logout