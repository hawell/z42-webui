import axios from "axios";

export default {
    login(user) {
        return axios({url: 'http://localhost:3000/auth/login', data: user, method: 'POST'})
    },
    refresh_token() {
        return axios({url: 'http://localhost:3000/auth/refresh_token', method: 'GET'})
    },
    signup(user) {
        return axios({url: 'http://localhost:3000/auth/signup', data: user, method: 'POST'})
    },
    logout() {
        return axios({url: 'http://localhost:3000/auth/logout', method: 'POST'})
    },

    get_zones() {
        return axios.get('http://localhost:3000/zones')
    },
    get_zone(zone_name) {
        return axios.get('http://localhost:3000/zones/' + zone_name)
    },
    update_zone(zone_name, data) {
        return axios.put('http://localhost:3000/zones/' + zone_name, data)
    },
    get_locations(zone_name) {
        return axios.get('http://localhost:3000/zones/' + zone_name + '/locations')
    },
    get_location(zone_name, location) {
        return axios.get('http://localhost:3000/zones/' + zone_name + '/locations/' + location)
    },
    get_record_sets(zone_name, location) {
        return axios.get('http://localhost:3000/zones/' + zone_name + '/locations/' + location + '/rrsets')
    },
    get_record_set(zone_name, location, record_type) {
        return axios.get('http://localhost:3000/zones/' + zone_name + '/locations/' + location + '/rrsets/' + record_type)
    }
}