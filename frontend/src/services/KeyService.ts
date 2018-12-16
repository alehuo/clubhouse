// Key service
import { ApiResponse } from "@alehuo/clubhouse-shared";
import moment from "moment";

// TODO: Move to shared lib
export interface Key {
  keyId: number; // Key id
  keyType: number; // Key type
  userId: number; // User id the key is assigned to
  unionId: number; // Student union the key is assigned to
  description: string; // Additional information of the key
  dateAssigned: string; // Assigned date
  created_at: string; // Created at date
  modified_at: string; // Modified at date
}

// Mocked key data
const keys: Key[] = [
  {
    keyId: 1,
    keyType: 1,
    userId: 1,
    unionId: 1,
    description: "",
    dateAssigned: moment(new Date(2015, 3, 7)).toISOString(),
    created_at: moment(new Date(2015, 3, 7)).toISOString(),
    modified_at: moment().toISOString(),
  },
  {
    keyId: 2,
    keyType: 1,
    userId: 2,
    unionId: 1,
    description: "",
    dateAssigned: moment(new Date(2014, 3, 7)).toISOString(),
    created_at: moment(new Date(2014, 3, 7)).toISOString(),
    modified_at: moment().toISOString(),
  },
];

// TODO: Move to shared lib
export interface KeyType {
  keyTypeId: number;
  title: string;
}

const keyTypes: KeyType[] = [
  {
    keyTypeId: 1,
    title: "24h",
  },
  {
    keyTypeId: 2,
    title: "Day",
  },
];

const getKeys = async (token: string) => {
  const response: ApiResponse<Key[]> = {
    payload: keys,
    success: true,
  };
  return Promise.resolve(response);
};

const getKeyTypes = async (token: string) => {
  const response: ApiResponse<KeyType[]> = {
    payload: keyTypes,
    success: true,
  };
  return Promise.resolve(response);
};

export default { getKeys, getKeyTypes };
