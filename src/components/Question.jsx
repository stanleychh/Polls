import React from 'react';
import Moment from "react-moment";
import PropTypes from 'prop-types';

import { DATE_FORMAT } from '../common/constants';

export const Question = ({question, published, choices, onSelect}) => {
    return (
        <div className="question-box" onClick={ onSelect }>
            <div>
                <label>Question:</label>
                <span className="title">{ question }</span>
            </div>
            <div>
                <label>Published:</label>
                <span className="published">
                    <Moment format={ DATE_FORMAT }>{ published }</Moment>
                </span>
            </div>
            <div>
                <label>Choices:</label>
                <span className="choices">{ choices }</span>
            </div>
        </div>
    );
};

Question.propTypes = {
    question: PropTypes.string,
    published: PropTypes.string,
    choices: PropTypes.number,
    onSelect: PropTypes.func
};

Question.defaultProps = {
    question: '',
    published: '',
    choices: 0
};

Question.displayName = 'Question';