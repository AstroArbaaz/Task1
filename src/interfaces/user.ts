export interface IAddress {
  city: string;
  state: string;
  country: string;
  street: string;
}

export interface IItems {
  id: string;
  gender: string;
  name: string;
  address: IAddress;
  email: string;
  age: string;
  picture: string;
  createdAt: Date;
}

export interface IPagination {
  total: number;
  limit: number;
  page: number;
  sortBy: string;
  items: IItems[];
}

export interface IUserFetchConfig {
  sleepTime: number;
  requestsPerBatch: number;
  requestsPerSecond: number;
  batchSleep: number;
}

export interface ISearchCriteria {
  [key:string]: any;
  name?: string;
  email?: string;
  age?: string;
  gender?: string;
  country?: string;
}
