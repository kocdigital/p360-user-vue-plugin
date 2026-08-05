import type {JwtUser as DefaultJwtUser, User as DefaultUser} from '@/models/user';

declare module 'vue/types/vue' {
    interface Vue {
        $jwtUser: Readonly<InstanceType<typeof DefaultJwtUser>>;
        $user: Readonly<InstanceType<typeof DefaultUser>>;
        $userLoaded: Promise<boolean>;
    }
}

export {};
