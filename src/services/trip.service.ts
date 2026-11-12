import type { TripStatus } from '#constants';
import { ERROR_MESSAGE, TRIP_STATUS_TRANSITIONS } from '#constants';
import { ConflictException, NotFoundException } from '#exceptions';
import type { TripCreateData, TripUpdateData } from '#repositories';
import type { Cradle } from '../common/di/container.js';

export class TripService {
  #tripRepository: Cradle['tripRepository'];

  constructor({ tripRepository }: Pick<Cradle, 'tripRepository'>) {
    this.#tripRepository = tripRepository;
  }

  async listTrips(status?: TripStatus) {
    return this.#tripRepository.findMany(status);
  }

  async getTrip(id: number) {
    const trip = await this.#tripRepository.findById(id);
    if (trip === null) {
      throw new NotFoundException(ERROR_MESSAGE.TRIP_NOT_FOUND);
    }
    return trip;
  }

  async createTrip(data: TripCreateData) {
    const trip = await this.#tripRepository.create(data);
    return this.getTrip(trip.id);
  }

  async updateTrip(id: number, data: TripUpdateData) {
    const trip = await this.getTrip(id);

    if (
      data.status !== undefined &&
      !TRIP_STATUS_TRANSITIONS[trip.status].includes(data.status)
    ) {
      throw new ConflictException(ERROR_MESSAGE.TRIP_STATUS_CHANGE_NOT_ALLOWED);
    }

    const nextStatus = data.status ?? trip.status;
    if (data.rating !== undefined && nextStatus !== 'done') {
      throw new ConflictException(ERROR_MESSAGE.TRIP_RATING_NOT_ALLOWED);
    }

    const count = await this.#tripRepository.update(id, trip.status, data);
    if (count === 0) {
      throw new ConflictException(ERROR_MESSAGE.TRIP_UPDATE_CONFLICT);
    }
    return this.getTrip(id);
  }
}
