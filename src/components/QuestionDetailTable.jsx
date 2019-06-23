import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, ProgressBar } from "react-bootstrap";

import { BTN_SIZE, TABLE_SIZE } from '../common/constants';
import { voteQuestion } from "../util/api";
import {
    INIT_STATE,
    VOTE,
    questionDetailStateReducer,
    initialState,
    getInitialState } from '../reducer/questionDetailStateReducer';

export const QuestionDetailTable = ({id}) => {
    const [state, dispatch] = useReducer(questionDetailStateReducer, initialState);
    const { questionTitle, choices, totalVotes } = state;

    useEffect(() => {
        getInitialState(id).then(newState => {
            dispatch({
                type: INIT_STATE,
                payload: newState
            });
        });
    }, [id]);

    const handleVote = (requestUrl, i) => {
        voteQuestion(requestUrl)
            .then(resp => {
                const cloneChoices = { ...choices };
                cloneChoices[i] = resp.data;

                const payload = {
                    choices: Object.values(cloneChoices),
                    totalVotes: totalVotes + 1
                };

                dispatch({
                    type: VOTE,
                    payload: payload
                });

            })
            .catch(err => console.log(err));
    };

    const generateTableHeader = () => {
        return (
            <thead>
                <tr>
                    <th>Choice</th>
                    <th>Vote</th>
                    <th>Percentage</th>
                    <th>Action</th>
                </tr>
            </thead>
        );
    };

    const generateTableBody = (choices) => {
        return (
            <tbody>
                {
                    choices && choices.map((item, i) => {
                        const percent = totalVotes === 0 ? 0 : Math.round((item.votes/totalVotes) * 100);

                        return ( <tr key={ i }>
                            <td>{ item.choice }</td>
                            <td>{ item.votes }</td>
                            <td><ProgressBar now={ percent } label={`${percent}%`} /></td>
                            <td>
                                <Button variant="primary" size={ BTN_SIZE } onClick={ ()=> handleVote(item.url, i) }>
                                    Vote
                                </Button>
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        );
    };

    return (
        <>
            <h3 className="detail-title">Question: { questionTitle }</h3>
            <Table size={ TABLE_SIZE }>
                { generateTableHeader() }
                { generateTableBody(choices) }
            </Table>
        </>
    );
};

QuestionDetailTable.propTypes = {
    id: PropTypes.string
};

QuestionDetailTable.defaultProps = {
    id: ''
};

QuestionDetailTable.displayName = 'QuestionDetailTable';