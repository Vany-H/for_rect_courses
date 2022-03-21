import { BadRequestException, Logger } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosStatic } from 'axios';
import * as axiosRetry from 'axios-retry';

export type IAxiosRetry = (
  axios: AxiosStatic | AxiosInstance,
  axiosRetryConfig?: axiosRetry.IAxiosRetryConfig,
) => void;

const retry = axiosRetry as unknown as IAxiosRetry;

export class HttpClientAbstract {
  public client: AxiosInstance;

  constructor(
    protected readonly config: AxiosRequestConfig = {},
    protected retryCondition?: axiosRetry.IAxiosRetryConfig,
  ) {
    this.client = axios.create(this.config);
    if (this.retryCondition) retry(this.client, this.retryCondition);

    this.setupContentTypeInterceptor();
    this.setupErrorInterceptor();
  }

  private setupContentTypeInterceptor() {
    this.client.interceptors.request.use((config) => {
      config.headers['Content-Type'] = 'application/json';
      return config;
    });
  }

  private setupErrorInterceptor() {
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        Logger.error(error);
        throw new BadRequestException(error.message);
      },
    );
  }
}
