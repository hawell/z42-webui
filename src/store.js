import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from "./api";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        notification: '',
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_refresh(state){
            state.status = 'refreshing'
        },
        auth_success(state, token){
            state.status = 'success'
            state.token = token
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
        },
        set_notification(state, notification){
            state.notification = notification
        },
        clear_notification(state){
            state.notification = ''
        }
    },
    actions: {
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                api.login(user)
                    .then(resp => {
                        const token = resp.data.token
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        commit('auth_success', token)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        restore({commit}, token) {
            return new Promise((resolve, reject) => {
                if (token) {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                    commit('auth_success', token)
                    resolve()
                } else {
                    commit('logout')
                    reject()
                }
            })
        },
        refresh({commit}) {
            console.log("refresh")
            return new Promise((resolve, reject) => {
                commit('auth_refresh')
                api.refresh_token()
                    .then(resp => {
                        const token = resp.data.token
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        commit('auth_success', token)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('logout')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                api.signup(user)
                    .then(() => {
                        commit('logout')
                        localStorage.removeItem('token')
                        delete axios.defaults.headers.common['Authorization']
                        resolve()
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout')
                api.logout()
                    .then(() => {
                        commit('logout')
                        localStorage.removeItem('token')
                        delete axios.defaults.headers.common['Authorization']
                        resolve()
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        set_notification({commit}, notification) {
            console.log('set_notification :', notification)
            commit('set_notification', notification)
        },
        clear_notification({commit}) {
            console.log('clear_notification')
            commit('clear_notification')
        }
    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        notification: state => state.notification,
        hasNotification: state => !!state.notification
    }
})