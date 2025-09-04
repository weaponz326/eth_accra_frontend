import { Injectable } from '@angular/core';
// import { create } from 'ipfs-http-client';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Ipfs {
  private ipfs: any;

  constructor() {
    // this.ipfs = create({ url: environment.ipfsGateway });
  }

  async upload(data: string): Promise<string> {
    try {
      const result = await this.ipfs.add(data);
      return result.path; // CID
    } catch (error) {
      console.error('IPFS upload failed:', error);
      throw error;
    }
  }

  async download(cid: string): Promise<string> {
    try {
      const stream = await this.ipfs.cat(cid);
      let data = '';
      for await (const chunk of stream) {
        data += chunk.toString();
      }
      return data;
    } catch (error) {
      console.error('IPFS download failed:', error);
      throw error;
    }
  }
}