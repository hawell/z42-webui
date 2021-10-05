import axios from "axios";

export default {
    login(user) {
        return axios({url: process.env.VUE_APP_API_BASE_URL + '/auth/login?recaptcha_token=' + user.token, data: {email: user.email, password: user.password}, method: 'POST'})
    },
    refresh_token() {
        return axios({url: process.env.VUE_APP_API_BASE_URL + '/auth/refresh_token', method: 'GET'})
    },
    signup(user) {
        return axios({url: process.env.VUE_APP_API_BASE_URL + '/auth/signup?recaptcha_token=' + user.token, data: {email: user.email, password: user.password}, method: 'POST'})
    },
    logout() {
        return axios({url: process.env.VUE_APP_API_BASE_URL + '/auth/logout', method: 'POST'})
    },

    get_zones(q, start, count, ascending) {
        return axios.get(process.env.VUE_APP_API_BASE_URL + '/zones?start=' + start + '&count=' + count + '&ascending=' + ascending + '&q=' + q)
    },
    add_zone(z) {
        z.dnssec = false
        z.cname_flattening = false
        return axios.post(process.env.VUE_APP_API_BASE_URL + '/zones', z)
    },
    get_zone(zone_name) {
        return axios.get(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name)
    },
    update_zone(zone_name, data) {
        return axios.put(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name, data)
    },
    delete_zone(zone_name) {
        return axios.delete(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name)
    },

    get_locations(zone_name, q, start, count, ascending) {
        return axios.get(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name + '/locations?start=' + start + '&count=' + count + '&ascending=' + ascending + '&q=' + q)
    },
    add_location(zone_name, l) {
        return axios.post(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name + '/locations', l)
    },
    get_location(zone_name, location) {
        return axios.get(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name + '/locations/' + location)
    },
    update_location(zone_name, location, l) {
        return axios.put(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name + '/locations/' +  location, l)
    },
    delete_location(zone_name, location) {
        return axios.delete(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name + '/locations/' + location)
    },

    get_record_sets(zone_name, location) {
        return axios.get(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name + '/locations/' + location + '/rrsets')
    },
    get_record_set(zone_name, location, record_type) {
        return axios.get(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name + '/locations/' + location + '/rrsets/' + record_type)
    },
    add_record_set(zone_name, location, record_type, data) {
        data.type = record_type
        return axios.post(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name + '/locations/' + location + '/rrsets', data)
    },
    update_record_set(zone_name, location, record_type, data) {
        return axios.put(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name + '/locations/' + location + '/rrsets/' + record_type, data)
    },
    delete_record_set(zone_name, location, record_type) {
        return axios.delete(process.env.VUE_APP_API_BASE_URL + '/zones/' + zone_name + '/locations/' + location + '/rrsets/' + record_type)
    }
}