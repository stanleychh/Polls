import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { getQuestionsList } from './util/api';
import { BTN_SIZE } from './common/constants';
import { Question } from './components/Question';
import { QuestionDetailTable } from './components/QuestionDetailTable';

import './css/App.css';

const App = () => {
    const [questionList, setQuestionList] = useState('');
    const [showDetail, setShowDetail] = useState(false);
    const [questionId, setQuestionId] = useState(null);

    useEffect(() => {
        getQuestionsList()
            .then((resp => {
                setQuestionList(resp.data);
            }))
            .catch(err => console.log(err));
    }, []);


    const navigateToQuestionList = () => setShowDetail(false);

    const handleQuestionSelected = (url) => {
        const id = url.split('/').pop();

        setShowDetail(true);
        setQuestionId(id);
    };

    return (
        <div className="App">
            { !showDetail ? (
                <>
                    <h2 className="title">Questions</h2>
                    <div className="flex-container">
                        {questionList && questionList.map((item, i) =>
                            <Question
                                key={i}
                                question={item.question}
                                published={item.published_at}
                                choices={item.choices.length}
                                url={item.url}
                                onSelect={ () => handleQuestionSelected(item.url) }
                            />
                        )}
                    </div>
                </>
            ) : (
                <>
                    <Button variant="info" size={ BTN_SIZE } onClick={() => navigateToQuestionList()}>
                        Back
                    </Button>
                    <h2 className="title">Question Detail</h2>
                    <br/>
                    <QuestionDetailTable id={ questionId }/>
                </>
            )}
        </div>
    );
}

export default App;
