import React from 'react';
import moment from 'moment';
import { render, cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'

import { Question } from "./Question";
import { DATE_FORMAT } from '../common/constants';

afterEach(cleanup);

describe('Basic Render', () => {
    it('should render the Question component', () => {
        const { container } = render(<Question />);
        const selector = container.querySelector('.question-box');

        expect(selector).not.toBeNull();
    });

    it('should render question title in Question component if `question` is provided', () => {
        const { container } = render(<Question question="foo" />);
        const selector = container.querySelector('.title');
        const expected = 'foo';

        expect(selector.textContent).toEqual(expected);
    });

    it('should render published in Question component if `published` is provided', () => {
        const timeStamp = '2015-05-27T21:22:26.670000+00:00';
        const { container } = render(<Question published={ timeStamp } />);
        const selector = container.querySelector('.published');
        const expected = moment(timeStamp).format(DATE_FORMAT);

        expect(selector.textContent).toEqual(expected);
    });

    it('should render choices in Question component if `choices` is provided', () => {
        const { container } = render(<Question choices={ 6 } />);
        const selector = container.querySelector('.choices');
        const expected = '6';

        expect(selector.textContent).toEqual(expected);
    });
});
