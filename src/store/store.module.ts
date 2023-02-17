import { Global, Module } from '@nestjs/common';
import BookMarkStore from './bookmark.repository';
import { UserStore } from './user-store.repository';

@Global()
@Module({
  imports: [],
  providers: [UserStore, BookMarkStore],
  exports: [UserStore, BookMarkStore],
})
export class StoreModule {}
