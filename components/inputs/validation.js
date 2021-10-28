export default {
  data: () => ({
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 8 || 'Min 8 characters'
    ],
    fqdnRules: [
      v => !!v || 'this field is required',
      v => /^([a-zA-Z0-9._-])+\.$/.test(v) || 'invalid FQDN format'
    ],
    locationRules: [
      v => !!v || 'this field is required',
      v => v === '@' || /^([*a-zA-Z0-9._-])+$/.test(v) || 'invalid location format'
    ],
    Ip4Rules: [
      v => !!v || 'this field is required',
      v => /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/.test(v) || 'invalid ip4 address'
    ],
    Ip6Rules: [
      v => !!v || 'this field is required',
      v => /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9]))$/.test(v) || 'invalid ip6 address'
    ],
    required: () => {
      return v => !!v || 'this field is required'
    },
    onlyNumber: () => {
      return v => !v || /^-?\d+$/.test(v) || 'numerical values only'
    },
    numbers: () => {
      return v => !v || /^-?\d+\s*(\s*,\s*-?\d+)*\s*,?\s*$/.test(v) || 'should be a list of comma seperated numbers'
    },
    numberArray (v) {
      for (let i = 0; i < v.length; i++) {
        if (/[^0-9]/g.test(v[i])) {
          return 'Insert numbers only'
        }
      }
      return true
    },
    max: (maxNum) => {
      return v => !v || parseInt(v) <= maxNum || 'Max exceeded'
    },
    min: (minNum) => {
      return v => !v || parseInt(v) >= minNum || 'Min exceeded'
    },
    oneOf: (values) => {
      return v => !v || values.includes(v) || 'invalid value'
    }
  })
}
