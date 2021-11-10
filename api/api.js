
export default $axios => ({
  login (user) {
    return $axios.$post('/auth/login', user)
  },
  refresh_token () {
    return $axios.$get('/auth/refresh_token')
  },
  signup (user) {
    return $axios.$post('/auth/signup', user)
  },
  logout () {
    return $axios.$post('/auth/logout')
  },

  get_zones (q, start, count, ascending) {
    return $axios.$get('/zones?start=' + start + '&count=' + count + '&ascending=' + ascending + '&q=' + q)
  },
  add_zone (z) {
    z.dnssec = false
    z.cname_flattening = false
    return $axios.$post('/zones', z)
  },
  get_zone (zoneName) {
    return $axios.$get('/zones/' + zoneName)
  },
  update_zone (zoneName, data) {
    return $axios.$put('/zones/' + zoneName, data)
  },
  delete_zone (zoneName) {
    return $axios.$delete('/zones/' + zoneName)
  },

  get_locations (zoneName, q, start, count, ascending) {
    return $axios.$get('/zones/' + zoneName + '/locations?start=' + start + '&count=' + count + '&ascending=' + ascending + '&q=' + q)
  },
  add_location (zoneName, l) {
    return $axios.$post('/zones/' + zoneName + '/locations', l)
  },
  get_location (zoneName, location) {
    return $axios.$get('/zones/' + zoneName + '/locations/' + location)
  },
  update_location (zoneName, location, l) {
    return $axios.$put('/zones/' + zoneName + '/locations/' + location, l)
  },
  delete_location (zoneName, location) {
    return $axios.$delete('/zones/' + zoneName + '/locations/' + location)
  },

  get_record_sets (zoneName, location) {
    return $axios.$get('/zones/' + zoneName + '/locations/' + location + '/rrsets')
  },
  get_record_set (zoneName, location, recordType) {
    return $axios.$get('/zones/' + zoneName + '/locations/' + location + '/rrsets/' + recordType)
  },
  add_record_set (zoneName, location, recordType, data) {
    data.type = recordType
    return $axios.$post('/zones/' + zoneName + '/locations/' + location + '/rrsets', data)
  },
  update_record_set (zoneName, location, recordType, data) {
    return $axios.$put('/zones/' + zoneName + '/locations/' + location + '/rrsets/' + recordType, data)
  },
  delete_record_set (zoneName, location, recordType) {
    return $axios.$delete('/zones/' + zoneName + '/locations/' + location + '/rrsets/' + recordType)
  }
})