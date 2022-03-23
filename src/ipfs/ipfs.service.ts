import { Inject, Injectable, Logger, StreamableFile } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import * as FormData from 'form-data';
import { createReadStream, ReadStream } from 'fs';
import * as streamifier from 'streamifier';
import { HttpClientAbstract } from './apis/HttpClient';
import { IPFSQueryParam, Options } from './ipfs.types';
import { IpfsUploadFileAnswere } from './type';

@Injectable()
export class IpfsService {
  private optionsGlob: Options;
  private clientClass: HttpClientAbstract;

  constructor(@Inject('IPFS_OPTIONS') options: Options) {
    this.clientClass = new HttpClientAbstract({ baseURL: options.baseURL });
    this.optionsGlob = options;
  }

  async returnOptions() {
    return this.optionsGlob;
  }

  async uploadFile(
    files: Express.Multer.File[],
  ): Promise<IpfsUploadFileAnswere[]>;
  async uploadFile(
    files: Array<Express.Multer.File>,
  ): Promise<Array<IpfsUploadFileAnswere>> {
    const data = new FormData();
    files.forEach((file) =>
      data.append('', streamifier.createReadStream(file.buffer)),
    );
    const config = this._getConfigs('post', 'add', {}, data);
    const response = await axios(config).then((res) => res.data);

    if (typeof response === 'string') {
      const arrayOfString = response.split('\n');
      arrayOfString.pop();
      return arrayOfString.map((el) => JSON.parse(el) as IpfsUploadFileAnswere);
    }

    return [response];
  }

  async addFileToPin(fileHash: string) {
    const config = this._getConfigs('post', 'pin/add', { arg: fileHash });
    return axios(config).then((res) => res.data);
  }

  async downloadFileUrl(fileHash: string): Promise<string>;
  async downloadFileUrl(fileHash: string[]): Promise<string[]>;
  async downloadFileUrl(
    fileHash: string | string[],
  ): Promise<string[] | string> {
    return Array.isArray(fileHash)
      ? fileHash.map((hash) => `http://127.0.0.1:8080/ipfs/${hash}`)
      : `http://127.0.0.1:8080/ipfs/${fileHash}`;
  }

  private _getConfigs(
    method: string,
    actions: string,
    queryParam: IPFSQueryParam,
    data?: FormData | undefined,
  ): AxiosRequestConfig {
    const queryString = Object.entries(queryParam).reduce(
      (acum, [key, value]) => `${acum}${key}=${value}&`,
      '',
    );
    return {
      method,
      url: `http://${this.optionsGlob.baseURL}${
        !!this.optionsGlob.host ? ':' + this.optionsGlob.host : '5001'
      }/api/v0/${actions}${!!queryString ? '?' + queryString : ''}`,
      headers: !!data
        ? {
            ...data.getHeaders(),
          }
        : {},
      data: !!data ? data : '',
    } as AxiosRequestConfig;
  }
}
