import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BASED_URL } from '../common/constants';
import { getQuestionsList } from './api';

describe('getQuestionsList', () => {
    it('returns data and status is 200 when getQuestionsList is called', done => {
        const mock = new MockAdapter(axios);
        const data = { response: true };
        const status = 200;
        mock.onGet(BASED_URL + '/questions').reply(200, data);

        getQuestionsList().then(response => {
            expect(response.data).toEqual(data);
            expect(response.status).toEqual(status);
            done();
        });
    });
});