/* eslint-env jest */
import setRef from '../ref';

describe('setRef', () => {
  const testRef = { a: 1 };
  it('should call specified function to save ref value', () => {
    let savedRef;
    function target(ref) {
      savedRef = ref;
    }
    setRef(target, testRef);
    expect(savedRef).toBe(testRef);
  });

  it('should save ref value in \'current\' field of passed object', () => {
    const target = {};
    setRef(target, testRef);
    expect(target.current).toBe(testRef);
  });
});
