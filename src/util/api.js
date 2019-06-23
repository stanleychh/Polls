import { BASED_URL } from '../common/constants';

const axios = require('axios');

export const getQuestionsList = async () => {
    return await axios.get(`${BASED_URL}/questions`);
};

export const getQuestionDetail = async (questionId) => {
    const url = `${BASED_URL}/questions/${questionId}`;

    return await axios.get(url);
};

export const voteQuestion = async (requestUrl) => {
    const url = BASED_URL + requestUrl;

    return await axios.post(url);
};