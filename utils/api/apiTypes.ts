export interface ExcuteResult {
  code?: string;
  errorMessage?: string;
  result?: any | string;
}

export type InputRegister = {
  userName: string;
  passwordHash: string;
  fullName: string;
};
export type WaterUser = {
  name?: string;
  code?: string;
  tollAreaId?: string;
  phone?: string;
  bank?: string;
  bankNo?: string;
  waterMeterCode?: string;
  address?: string;
  userName?: string;
  unitTypeId?: string;
  notificationMethod?: string;
  paymentMethod?: string;
  gps?: string;
  organization?: string;
  status?: string;
  lastWaterMeterNumber?: 0;
  lastReadDate?: Date;
  images?: string[] | string;
  id?: string;
};
export type InfoResult = {
  id?: string;
  name?: string;
  dsNhanVienModel?: [];
};

export type WaterUserType = {
  name?: string;
  code?: string;
  tollAreaId?: string;
  phone?: string;
  bank?: string;
  bankNo?: null;
  waterMeterCode?: null;
  address?: string;
  userName?: string;
  unitTypeId?: string;
  waterFactoryId?: string;
  id: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: null;
  updatedBy?: null;
  status?: null;
};

export type UseWaterRegister = {
  name?: string;
  representative?: string;
  title?: string;
  officeAddress?: string;
  mobilePhone?: string;
  landlinePhone?: string;
  email?: string;
  taxCode?: string;
  bankNo?: string;
  bankName?: string;
  provinceId?: string;
  districtId?: string;
  wardId?: string;
  address?: string;
  estimateAmoutWater?: string;
  reson?: string;
  identification?: string;
  identificationDate?: string;
  waterFactoryId?: string;
  unitTypeId?: string;
};
