import request from './http';


/**
 * 
 * @param {number} id 歌曲ID
 * @returns 
 */
export function palySongUrl(params) {
    return request({
        url: "/song/url",
        method: "get",
        params
    })
}

/**
 * 歌曲详情
 * @param {number} params 歌曲ids 
 */
export function getSongDetail(params) {
    return request({
        url: "/song/detail",
        method: "get",
        params
    })
}

/**
 * 歌曲歌词
 * @param {number} params 歌曲ID
 * @returns 
 */
export function getSongLyrics(params) {
    return request({
        url: "/lyric",
        method: "get",
        params
    })
}
export function getSingerDetail(params) {
    return request({
        url: "/artist/detail",
        method: "get",
        params
    })
}
export function getAllSingerDetail(params) {
    return request({
        url: "/artist/desc",
        method: "get",
        params
    })
}

export function getSiMi(params) {
    return request({
        url: "/simi/song",
        method: "get",
        params
    })
}

//like?id=347230

export function getLike(id) {
    return request({
        url: "/playlist/tracks?op=add&pid=1999126645&tracks=" + id,
        method: "get",
    })
}
export function getNoLike(id) {
    return request({
        url: "/playlist/tracks?op=del&pid=1999126645&tracks=" + id,
        method: "get",
    })
}

// /likelist

export function getLikeList(id) {
    return request({
        url: "/likelist?uid=" + id,
        method: "get",
    })
}

// /artist/sub?id=6452&t=1

export function getLikeSinger(id, type) {
    return request({
        url: "/artist/sub?id=" + id + "&t=" + type,
        method: "get",

    })
}

///artist/sublist


export function getSingerList() {
    return request({
        url: "/artist/sublist",
        method: "get",

    })
}