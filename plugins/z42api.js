import createRepository from '../api/api'

export default ({ app }, inject) => {
  inject('z42api', createRepository(app.$axios))
}
