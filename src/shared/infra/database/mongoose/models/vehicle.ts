import { model, Document, Schema } from 'mongoose';

export interface IVehicleModel extends Document {
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

export const VehicleSchema = new Schema({
  placa: { type: String, required: true },
  chassi: { type: String, required: true },
  renavam: { type: String, required: true },
  modelo: { type: String, required: true },
  marca: { type: String, required: true },
  ano: { type: Number, required: true },
});

const VehicleMongoModel = model<IVehicleModel>('vehicle', VehicleSchema);
export default VehicleMongoModel;
