import { Global, Module } from '@nestjs/common';
import { UserStore } from './user-store.repository';

@Global()
@Module({
  imports: [],
  providers: [UserStore],
  exports: [UserStore],
})
export class StoreModule {}
