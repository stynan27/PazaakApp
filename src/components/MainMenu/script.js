import { mapActions } from 'vuex';

export default {
  name: 'MainMenu',
  methods: {
    ...mapActions({
      hostMatch: 'APP_HOST_MATCH',
    }),
  }
}