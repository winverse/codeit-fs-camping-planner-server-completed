import type { TripStatus } from '#constants';
import type { Cradle } from '../common/di/container.js';

export interface TripCreateData {
  campsiteId: number;
  people: number;
  memo?: string;
}

export interface TripUpdateData {
  people?: number;
  memo?: string;
  status?: TripStatus;
  rating?: number;
}

export class TripRepository {
  #db: Cradle['db'];

  constructor({ db }: Pick<Cradle, 'db'>) {
    this.#db = db;
  }

  // 캠핑 계획과 함께 캠핑장의 id·이름·이미지를 가져오는 쿼리입니다
  #withCampsite() {
    return this.#db.orm.public.Trip.include('campsite', (campsite) =>
      campsite.select('id', 'name', 'imageUrl'),
    );
  }

  async findMany(status?: TripStatus) {
    return this.#withCampsite()
      .where({ status })
      .orderBy((t) => t.createdAt.desc())
      .all();
  }

  async findById(id: number) {
    return this.#withCampsite().where({ id }).first();
  }

  async create(data: TripCreateData) {
    return this.#db.orm.public.Trip.create(data);
  }

  async update(id: number, data: TripUpdateData) {
    return this.#db.orm.public.Trip.where({ id }).update(data);
  }
}
