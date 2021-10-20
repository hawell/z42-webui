export const state = () => ({
  notification: ''
})

export const mutations = {
  set_notification (state, notification) {
    state.notification = notification
  },
  clear_notification (state) {
    state.notification = ''
  }

}

export const actions = {
  set_notification ({ commit }, notification) {
    commit('set_notification', notification)
  },
  clear_notification ({ commit }) {
    commit('clear_notification')
  }
}
