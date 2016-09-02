/* eslint-env jest */
import { PropTypes } from 'react';

export const controlled = jest.fn((funcName, validator) => validator);
export const minNumber = jest.fn(() => PropTypes.number);
export const maxNumber = jest.fn(() => PropTypes.number);
