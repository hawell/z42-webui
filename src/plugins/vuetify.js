import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.blue.darken1,
                secondary: colors.blue.lighten4,
                accent: colors.pink.base,
                error: colors.red.darken1,
                info: colors.cyan.lighten1,
                success: colors.green.lighten1,
                warning: colors.yellow.lighten1,
            }

        },
    },
});
