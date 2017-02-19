/* eslint-env jest */

const WINDOW = { Width: 1920, Height: 1080 };

export default jest.fn(position => WINDOW[position]);
