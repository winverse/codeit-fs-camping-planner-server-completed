import { z } from 'zod';
import { config } from '#config';
import { goCampingResponseSchema } from '#schemas';

const BASE_URL = 'https://apis.data.go.kr/B551011/GoCamping';

export class GoCampingProvider {
  async fetchCampsites() {
    const params = new URLSearchParams({
      serviceKey: config.GOCAMPING_SERVICE_KEY,
      MobileOS: 'ETC',
      MobileApp: 'CampingPlanner',
      _type: 'json',
      numOfRows: '60',
      pageNo: '1',
    });

    const response = await fetch(`${BASE_URL}/basedList?${params}`);
    if (!response.ok) {
      throw new Error(
        `고캠핑 API가 ${response.status} 상태로 응답했습니다: ${await response.text()}`,
      );
    }

    const body = await response.json();

    const result = goCampingResponseSchema.safeParse(body);
    if (!result.success) {
      throw new Error(z.prettifyError(result.error));
    }

    return result.data.response.body.items.item;
  }
}
