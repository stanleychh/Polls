import React from 'react';
import { render, cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'
import App from "./app";

afterEach(cleanup);

describe('Basic Render', () => {
    it('should render', () => {
        render(<App />);
    });

    it('renders column selector as AutoCompleteInput', () => {
        const { container } = render(<App />);
        const titleSelector = container.querySelector('.title');

        const expected = 'Questions';

        expect(titleSelector.textContent).toEqual(expected);
    });

    it('renders the questions layout container', () => {
        const { container } = render(<App />);
        const layout = container.querySelector('.flex-container');

        expect(layout).not.toBeNull();
    });
});

