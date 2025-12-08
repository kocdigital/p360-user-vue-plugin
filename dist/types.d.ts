import Vue, { PluginObject } from 'vue';
import { J as JwtUser, U as User } from './User-7a583b28.js';
import { U as UserVuePluginOptions } from './options-0d6dc214.js';

declare module 'vue/types/vue' {
    interface Vue {
        $jwtUser: Readonly<InstanceType<typeof JwtUser>>;
        $user: Readonly<InstanceType<typeof User>>;
        $userLoaded: Promise<boolean>;
    }
}
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        user?: PluginObject<UserVuePluginOptions>;
    }
}

export { UserVuePluginOptions };
