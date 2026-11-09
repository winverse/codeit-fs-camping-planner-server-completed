export const TRIP_STATUSES = ['wish', 'booked', 'done', 'canceled'] as const;

export type TripStatus = (typeof TRIP_STATUSES)[number];

export const MIN_PEOPLE = 1;
export const MAX_PEOPLE = 8;
export const MAX_MEMO_LENGTH = 200;
export const MIN_RATING = 1;
export const MAX_RATING = 5;

// 상태마다 다음으로 바꿀 수 있는 상태 목록입니다
export const TRIP_STATUS_TRANSITIONS: Record<TripStatus, TripStatus[]> = {
  wish: ['booked', 'canceled'],
  booked: ['done', 'canceled'],
  done: [],
  canceled: [],
};
