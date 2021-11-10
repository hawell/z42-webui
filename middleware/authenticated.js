export default function ({ $auth, redirect }) {
  // If the user is not authenticated
  console.log($auth.loggedIn)
  if (!$auth.loggedIn) {
    return redirect('/login')
  }
}
