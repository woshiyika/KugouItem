import request from "./http";


//账号信息
export function getUserAcc() {
    return request({
        url: "/user/account",
        method: "get",
    })
}

///vip/info vip信息
export function getUserVip() {
    return request({
        url: "/vip/info",
        method: "get",
    })
}

// /user/detail?uid= 账户信息

export function getUserDetail(uid) {
    return request({
        url: "/user/detail?uid=" + uid,
        method: "get",
    })
}

// /record/recent/song 最近播放

export function getRecent(id) {
    return request({
        url: "/user/record?uid=" + id + "&type=0",
        method: "get",
    })
}

// /user/playlist

export function getUserPlayList(id) {
    return request({
        url: "/user/playlist?uid=" + id,
        method: "get",
    })
}

export function getLogOut() {
    return request({
        url: "/logout",
        method: "get",

    })
}