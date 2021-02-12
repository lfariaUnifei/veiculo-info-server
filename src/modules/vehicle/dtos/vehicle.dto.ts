export interface VehicleDto {
  _id?: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}

export interface VehicleListDto {
  vehicles: VehicleDto[];
  totalCount: number;
}
