import { SetMetadata } from '@nestjs/common';

import { AccountRole } from './account-role.enum';

export const Roles = (...args: AccountRole[]) => SetMetadata('roles', args);
