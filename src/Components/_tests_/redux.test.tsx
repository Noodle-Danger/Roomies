import subject from '../../context/GlobalContext';

describe('perkReducer', ()=> {
    it('should return a default state when given an undefined input', () => {
        expect(subject(undefined, { type: undefined })).toEqual(state);
      });
})