import { getQuestionDetail } from "../util/api";

export const INIT_STATE = 'init_state';
export const VOTE = 'vote';

export const calTotalVotes = (choices) => {
    let voteSum = 0;

    choices.forEach((item) => {
        voteSum += item.votes;
    });

    return voteSum;
};

export const initialState = {
    questionTitle: '',
    choices: [],
    totalVote: 0
};

export const getInitialState = (questionId) => {
    const promise = getQuestionDetail(questionId)
        .then(resp => {
            return {
                questionTitle: resp.data.question,
                choices: resp.data.choices,
                totalVotes: calTotalVotes(resp.data.choices)
            };
        })
        .catch(err => console.log(err));

    return promise;
};

export const questionDetailStateReducer = (state, {type, payload}) => {
    switch (type) {
        case INIT_STATE: {
            return {
                ...state,
                ...payload
            };
        }
        case VOTE: {
            return {
                ...state,
                ...payload
            };
        }
        default:
            return state;
    }
};