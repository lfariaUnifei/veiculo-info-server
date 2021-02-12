/* eslint no-unused-expressions: 0 */
import mongoose from 'mongoose';
import { expect } from 'chai';
import { VehicleRepository } from '../../../../src/modules/vehicle/repositories/vehicle.repository';
import { VehicleModel } from '../../../../src/modules/vehicle/models/vehicle.model';

describe('Test create operations in vehicle repository', () => {
  // Simplificando url do banco
  before('connect', () => mongoose.connect(
    'mongodb://localhost:27018/infovehicletest',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  ));
  it('Should create a vehicle when all required fields are fulfilled', async () => {
    const repository = new VehicleRepository();
    const data: VehicleModel = {
      ano: 2015,
      chassi: 'ABCSDQ512',
      marca: 'Fiat',
      modelo: 'Punto',
      placa: 'ABC-EFG1ds',
      renavam: 'CCCASEE',
    };
    await repository.create(data);
    expect(data._id).to.be.not.null;
  });

  it('Should not create a vehicle when all required field are missing', async () => {
    const repository = new VehicleRepository();
    const data: VehicleModel = {
      ano: 2015,
      chassi: 'ABCSDQ512',
      marca: 'Fiat',
      modelo: 'Punto',
      placa: 'ABC-EFG1ds',
      renavam: 'CCCASEE',
    };
    // @ts-ignore
    delete data.ano;
    try {
      await repository.create(data);
    } catch (e) {
      expect(data._id).to.be.undefined;
    }
  });
});
