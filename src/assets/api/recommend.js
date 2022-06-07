import request from "./http";


// http://192.168.45.1:3000/banner

// 新歌API
export function getNewSong() {
    return request({
        url: "/album/newest",
        method: "get",
    })
}
//热门歌单列表API
export function getHotList() {
    return request({
        url: "/top/playlist?limit=6",
        method: "get",
    })
}

//榜单列表API
export function getTopList() {
    return request({
        url: "/toplist",
        method: "get"
    })
}

// 所有榜单数据详情
export function getPlayListDetail(params) {
    return request({
        url: "/playlist/detail",
        method: "get",
        params
    })
}

/**
 * 
 * @param {*} params 
 * @returns 
 */
export function getHotSinger(params) {
    return request({
        url: '/artist/list',
        method: 'get',
        params
    })
}