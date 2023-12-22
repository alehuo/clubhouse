import { ApiResponse, Document } from '@alehuo/clubhouse-shared';
import customAxios from './custom-axios';

const getDocuments = async () => {
    const res = await customAxios.withoutToken().get<ApiResponse<Document[]>>('api/v1/document');
    return res.data;
};

export default { getDocuments };
