// Key service
import { ApiResponse, Key, KeyType } from "@alehuo/clubhouse-shared";
import moment from "moment";

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
    updated_at: moment().toISOString(),
  },
  {
    keyId: 2,
    keyType: 1,
    userId: 2,
    unionId: 1,
    description: "",
    dateAssigned: moment(new Date(2014, 3, 7)).toISOString(),
    created_at: moment(new Date(2014, 3, 7)).toISOString(),
    updated_at: moment().toISOString(),
  },
];

const keyTypes: KeyType[] = [
  {
    keyTypeId: 1,
    title: "24h",
    created_at: moment(new Date(2014, 3, 7)).toISOString(),
    updated_at: moment(new Date(2014, 3, 7)).toISOString(),
  },
  {
    keyTypeId: 2,
    title: "Day",
    created_at: moment(new Date(2014, 3, 7)).toISOString(),
    updated_at: moment(new Date(2014, 3, 7)).toISOString(),
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
