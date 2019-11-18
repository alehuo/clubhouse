import { ApiResponse, Rule } from '@alehuo/clubhouse-shared';
import customAxios from './custom-axios';

const getRules = async () => {
    const res = await customAxios.withoutToken().get<ApiResponse<Rule[]>>('api/v1/rule');
    return res.data;
};

export default { getRules };
