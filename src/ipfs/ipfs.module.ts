import { DynamicModule, Module } from '@nestjs/common';
import { IpfsService } from './ipfs.service';
import { Options } from './ipfs.types';

@Module({})
export class IpfsModule {
  static forRoot(options?: Options): DynamicModule {
    return {
      module: IpfsModule,
      providers: [{ provide: 'IPFS_OPTIONS', useValue: options }, IpfsService],
      exports: [IpfsService],
    };
  }
}
