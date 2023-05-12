import { LocalScheme } from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser (endpoint) {
    // Token is required but not available
    if (!this.check().valid) {
      return
    }

      this.$auth.setUser({})
      return
  }
}
