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

    get_zones(q, start, count, ascending) {
        return axios.get('http://localhost:3000/zones?start=' + start + '&count=' + count + '&ascending=' + ascending + '&q=' + q)
    },
    add_zone(z) {
        z.dnssec = false
        z.cname_flattening = false
        z.soa = {
            ttl: 3600,
            ns: "ns1." + z.name,
            mbox: "hostmaster." + z.name,
            refresh: 86400,
            retry: 7200,
            expire: 3600000,
            minttl: 300,
            serial: 0,
        }
        z.ns = {
            ttl: 3600,
            records: [
                {"host": "ns1.z42.com."},
                {"host": "ns2.z42.com."}
            ]
        }
        return axios.post('http://localhost:3000/zones', z)
    },
    get_zone(zone_name) {
        return axios.get('http://localhost:3000/zones/' + zone_name)
    },
    update_zone(zone_name, data) {
        return axios.put('http://localhost:3000/zones/' + zone_name, data)
    },
    delete_zone(zone_name) {
        return axios.delete('http://localhost:3000/zones/' + zone_name)
    },

    get_locations(zone_name, q, start, count, ascending) {
        return axios.get('http://localhost:3000/zones/' + zone_name + '/locations?start=' + start + '&count=' + count + '&ascending=' + ascending + '&q=' + q)
    },
    add_location(zone_name, l) {
        return axios.post('http://localhost:3000/zones/' + zone_name + '/locations', l)
    },
    get_location(zone_name, location) {
        return axios.get('http://localhost:3000/zones/' + zone_name + '/locations/' + location)
    },
    update_location(zone_name, location, l) {
        return axios.put('http://localhost:3000/zones/' + zone_name + '/locations/' +  location, l)
    },
    delete_location(zone_name, location) {
        return axios.delete('http://localhost:3000/zones/' + zone_name + '/locations/' + location)
    },

    get_record_sets(zone_name, location) {
        return axios.get('http://localhost:3000/zones/' + zone_name + '/locations/' + location + '/rrsets')
    },
    get_record_set(zone_name, location, record_type) {
        return axios.get('http://localhost:3000/zones/' + zone_name + '/locations/' + location + '/rrsets/' + record_type)
    },
    add_record_set(zone_name, location, record_type, data) {
        data.type = record_type
        return axios.post('http://localhost:3000/zones/' + zone_name + '/locations/' + location + '/rrsets', data)
    },
    update_record_set(zone_name, location, record_type, data) {
        return axios.put('http://localhost:3000/zones/' + zone_name + '/locations/' + location + '/rrsets/' + record_type, data)
    },
    delete_record_set(zone_name, location, record_type) {
        return axios.delete('http://localhost:3000/zones/' + zone_name + '/locations/' + location + '/rrsets/' + record_type)
    }
}