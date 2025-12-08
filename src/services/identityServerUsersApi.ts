import {revokeSf} from '@kocdigital/sf-interface';

import config from '@/config';

import type {APIBaseResponse} from '@/models/api';
import type {IUser} from '@/models/user';

const sfCore = revokeSf();

const instance = sfCore.services.createSecureInstance('', {
    disableErrorNotifications: true,
    loader: true
});

const resource = '/identityserverusers-api/api/v1';

export default {
    async getUserById(userId: string) {
      instance.defaults.baseURL = await sfCore.services.asyncConfig.get(config.CONFIG_KEY.CORE_GATEWAY);

      return await instance.get<APIBaseResponse<IUser>>(`${resource}/users/${userId}`);
  },
}
