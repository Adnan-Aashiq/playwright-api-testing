import { APIRequestContext } from '@playwright/test';
import { readFileSync } from 'fs';

export default class MerchantClient {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async createMerchant(merchantGroupId: string) {
    const payload = JSON.parse(
      readFileSync('./fixtures/CreateMerchant.json', 'utf-8')
    );
    
    const response = await this.request.post(`${this.baseURL}/v1/merchant`, {
      data: { ...payload, merchantGroupId },
      headers: { 'Content-Type': 'application/json' }
    });

    return {
      status: response.status(),
      data: await response.json()
    };
  }
}