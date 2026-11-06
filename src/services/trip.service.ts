import { injectable } from "tsyringe";
import { ERROR_MESSAGE, TRIP_STATUS_TRANSITIONS } from "#constants";
import { ConflictException, NotFoundException } from "#exceptions";
import type { TripStatus, TripWithCampsite } from "#prisma/models.js";
import {
  TripRepository,
  type TripCreateData,
  type TripUpdateData,
} from "#repositories";

@injectable()
export class TripService {
  constructor(private readonly tripRepository: TripRepository) {}

  async listTrips(status?: TripStatus): Promise<TripWithCampsite[]> {
    return this.tripRepository.findMany(status);
  }

  async getTrip(id: number): Promise<TripWithCampsite> {
    const trip = await this.tripRepository.findById(id);
    if (trip === null) {
      throw new NotFoundException(ERROR_MESSAGE.TRIP_NOT_FOUND);
    }
    return trip;
  }

  async createTrip(data: TripCreateData): Promise<TripWithCampsite> {
    const trip = await this.tripRepository.create(data);
    return this.getTrip(trip.id);
  }

  async updateTrip(
    id: number,
    data: TripUpdateData,
  ): Promise<TripWithCampsite> {
    const trip = await this.getTrip(id);

    if (
      data.status !== undefined &&
      !TRIP_STATUS_TRANSITIONS[trip.status].includes(data.status)
    ) {
      throw new ConflictException(ERROR_MESSAGE.TRIP_STATUS_CHANGE_NOT_ALLOWED);
    }

    const nextStatus = data.status ?? trip.status;
    if (data.rating !== undefined && nextStatus !== "done") {
      throw new ConflictException(ERROR_MESSAGE.TRIP_RATING_NOT_ALLOWED);
    }

    await this.tripRepository.update(id, data);
    return this.getTrip(id);
  }
}
