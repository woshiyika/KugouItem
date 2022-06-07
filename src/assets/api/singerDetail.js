import request from "./http";

export function getArtistDesc(id) {
    return request({
        url: "/artist/desc?id=" + id,
        method: "get",
    })
}

export function getArtistDetail(id) {
    return request({
        url: "/artist/detail?id=" + id,
        method: "get",
    })
}

export function getArtists(id) {
    return request({
        url: "/artists?id=" + id,
        method: "get",
    })
}


export function getSongDetail(params) {
    return request({
        url: "/song/detail",
        method: "get",
        params
    })
}