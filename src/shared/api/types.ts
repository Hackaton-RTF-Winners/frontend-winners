export interface PipeNomenclature {
  Id: string
  CategoryId: string
  TypeId: string
  IDTypeNew: string
  ProductionType: string
  IDFunctionType: string
  Name: string
  Gost: string
  FormOfLength: string
  Manufacturer: string
  SteelGrade: string
  Diameter: number
  ProfileSize2: number
  PipeWallThickness: number
  Status: number
  Koef: number
}

export interface PipeType {
  Id: string
  Name: string
  IDParentType: string
}

export interface PipePrice {
  Id: string
  StockId: string
  PriceT: number
  PriceLimitT1: number
  PriceT1: number
  PriceLimitT2: number
  PriceT2: number
  PriceM: number
  PriceLimitM1: number
  PriceM1: number
  PriceLimitM2: number
  PriceM2: number
  NDS: number
}

export interface PipeRemants {
  Id: string
  StockId: string
  InStockT: number
  InStockM: number
  SoonArriveT: number
  SoonArriveM: number
  ReservedT: number
  ReservedM: number
  UnderTheOrder: boolean
  AvgTubeLength: number
  AvgTubeWeight: number
}

export interface PipeStockInfo {
  IDStock: string
  Stock: string
  StockName: string
  Address: string
  Schedule: string
  IDDivision: string
  CashPayment: boolean
  CardPayment: boolean
  FIASId: string
  OwnerInn: string
  OwnerKpp: string
  OwnerFullName: string
  OwnerShortName: string
  RailwayStation: string
  ConsigneeCode: string
}

export interface ValidationError {
  field: string
  message: string
}
