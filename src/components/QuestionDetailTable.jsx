import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, ProgressBar } from "react-bootstrap";

import { BTN_SIZE, TABLE_SIZE } from '../common/constants';
import { getQuestionDetail, voteQuestion } from "../util/api";

export const QuestionDetailTable = ({id}) => {
    const [choices, setChoices] = useState([]);
    const [questionTitle, setQuestionTitle] = useState('');
    const [totalVotes, setTotalVotes] = useState(0);

    useEffect(() => {
        getQuestionDetail(id)
            .then(resp => {
                setQuestionTitle(resp.data.question);
                setChoices(resp.data.choices);
                calTotalVotes(resp.data.choices);
            })
            .catch(err => console.log(err));
    }, []);

    const calTotalVotes = (choices) => {
        let voteSum = 0;

        choices.forEach((item) => {
            voteSum += item.votes;
        });

        setTotalVotes(voteSum);
    };

    const handleVote = (requestUrl, i) => {
        voteQuestion(requestUrl)
            .then(resp => {
                const cloneChoices = { ...choices };
                cloneChoices[i] = resp.data;
                setChoices(Object.values(cloneChoices));
                setTotalVotes(totalVotes + 1);
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