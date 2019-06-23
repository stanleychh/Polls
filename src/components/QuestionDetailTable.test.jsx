import React from 'react';
import { render, cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'

import { QuestionDetailTable } from "./QuestionDetailTable";

afterEach(cleanup);

describe('Basic Render', () => {
    it('should render the Question title', () => {
        const { container } = render(<QuestionDetailTable />);
        const titleSelector = container.querySelector('.detail-title');

        const expected = 'Question: ';

        expect(titleSelector.textContent).toEqual(expected);
    });
});
