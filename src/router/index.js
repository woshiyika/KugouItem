import Vue from 'vue'
import VueRouter from 'vue-router'
import musicIndex from '../views/musicIndex.vue';


Vue.use(VueRouter)

const routes = [{
        path: "/",
        redirect: "/musicIndex"
    },
    {
        path: "/musicIndex",
        name: "musicIndex",
        meta: {
            headNav: true,
            music: true,
            keep: false
        },
        component: musicIndex,
        beforeEnter: (to, from, next) => {
            //第一次进入进入引导页
            let guidePage = window.localStorage.getItem("guidePage");
            if (!guidePage) {
                next("/guidePage");
                sessionStorage.setItem('advertisingPage', true)
                return;
            } else {
                //如果不是第一次进入进入广告页
                if (!window.sessionStorage.getItem('advertisingPage')) {
                    next('/advertisingPage');
                } else {
                    next();
                }
            }

        }
    },
    {
        path: '/topList',
        name: 'topList',
        meta: {
            headNav: true,
            music: true,
            keep: true
        },
        component: () =>
            import ('../views/topList.vue')
    },
    {
        path: '/songList',
        name: 'songList',
        meta: {
            headNav: true,
            music: true,
            keep: true
        },
        component: () =>
            import ('../views/songList.vue'),

    },
    {
        path: '/songList/detail',
        name: 'songListDetail',
        meta: {
            headNav: false,
            music: true,
            keep: false
        },
        component: () =>
            import ('../views/songListDetail.vue')
    },
    {
        path: '/topList/detail',
        name: 'topListDetail',
        meta: {
            headNav: false,
            music: true,
            keep: false
        },
        component: () =>
            import ('../views/topListDetail.vue')
    },
    {
        path: '/guidePage',
        name: 'guidePage',
        meta: {
            keep: false
        },
        component: () =>
            import ('../components/PageGo/guidePage.vue')
    },
    {
        path: '/advertisingPage',
        name: 'advertisingPage',
        meta: {
            keep: false
        },
        component: () =>
            import ('../components/PageGo/advertisingPage.vue')
    }, {
        path: '/loginPage',
        name: 'loginPage',
        meta: {
            headNav: false,
            music: true,
            keep: false
        },
        component: () =>
            import ('../components/user/loginPage.vue')
    }, {
        path: '/MV',
        name: 'MV',
        meta: {
            headNav: true,
            music: false,
            keep: true
        },
        component: () =>
            import ('../views/MV.vue')
    }, {
        path: '/singer',
        name: 'singer',
        meta: {
            headNav: true,
            music: true,
            keep: true
        },
        component: () =>
            import ('../views/MV.vue')
    }, {
        path: '/MV/Detail',
        name: 'MVDetail',
        meta: {
            headNav: false,
            music: false,
            keep: false
        },
        component: () =>
            import ('../views/MVDetail')
    }, {
        path: '/singer/detail',
        name: 'singerDetail',
        meta: {
            headNav: false,
            music: true,
            keep: false
        },
        component: () =>
            import ('../views/singerDetail.vue')
    }, {
        path: '/user',
        name: 'user',
        meta: {
            headNav: false,
            music: true,
            keep: true
        },
        component: () =>
            import ('../components/user/userPage.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}


export default router