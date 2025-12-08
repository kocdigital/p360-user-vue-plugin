import Vue, {type PluginObject} from 'vue';

import type {JwtUser, User as DefaultUser} from '@/models/user';
import type {UserVuePluginOptions} from '@/types/options';

declare module 'vue/types/vue' {
  interface Vue {
    $jwtUser: Readonly<InstanceType<typeof JwtUser>>;
    $user: Readonly<InstanceType<typeof DefaultUser>>;
    $userLoaded: Promise<boolean>;
  }
}

declare module 'vue/types/options' {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface ComponentOptions<V extends Vue> {
    user?: PluginObject<UserVuePluginOptions>;
  }
}

export {};
