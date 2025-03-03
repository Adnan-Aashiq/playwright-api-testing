import { APIRequestContext } from '@playwright/test';
import { readFileSync } from 'fs';

export default class MerchantGroupClient {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async createMerchantGroup(nameSuffix: string) {
    const payload = JSON.parse(
      readFileSync('./fixtures/CreateMerchantGroup.json', 'utf-8')
    );
    
    const response = await this.request.post(`${this.baseURL}/v1/merchantgroup`, {
      data: { ...payload, name: `Merchant ${nameSuffix}` },
      headers: { 'Content-Type': 'application/json' }
    });

    return {
      status: response.status(),
      data: await response.json()
    };
  }
}