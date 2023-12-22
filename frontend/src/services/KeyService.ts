// Key service
import { ApiResponse, Key, KeyType } from '@alehuo/clubhouse-shared';
import customAxios from './custom-axios';

const keyEndpoint = 'api/v1/key';
const keyTypeEndpoint = 'api/v1/keyType';

const getKeys = async (token: string) => {
    const res = await customAxios.withToken(token).get<ApiResponse<Key[]>>(keyEndpoint);
    return res.data;
};

const addKey = async (token: string, userId: number, unionId: number, keyType: number, description: string) => {
    const res = await customAxios.withToken(token).post<ApiResponse<Key>>(keyEndpoint, {
        userId,
        unionId,
        keyType,
        description,
    });
    return res.data;
};

const getKeyTypes = async (token: string) => {
    const res = await customAxios.withToken(token).get<ApiResponse<KeyType[]>>(keyTypeEndpoint);
    return res.data;
};

export default { getKeys, getKeyTypes, addKey };
