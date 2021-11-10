export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    console.log('axios plugin', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/login')
      return Promise.resolve(false)
    }
  })
}
