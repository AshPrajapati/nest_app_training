import { Global, Module } from '@nestjs/common';
import { UserStoreRepository } from './user-store.repository';
import { BookMarkRepository } from './bookmark.repository';

@Global()
@Module({
  imports: [],
  providers: [UserStoreRepository, BookMarkRepository],
  exports: [UserStoreRepository, BookMarkRepository],
})
export class StoreModule {}
