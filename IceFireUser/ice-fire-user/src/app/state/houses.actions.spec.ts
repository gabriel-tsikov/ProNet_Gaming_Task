import * as HousesActions from './houses.actions';

describe('Houses Actions', () => {
  it('should create loadHouses action', () => {
    const action = HousesActions.loadHouses({ page: 1, size: 10 });
    expect(action.type).toBe('[Houses] Load');
    expect(action.page).toBe(1);
    expect(action.size).toBe(10);
  });

  it('should create loadHousesFailure action', () => {
    const error = 'Failed to load houses';
    const action = HousesActions.loadHousesFailure({ error });
    expect(action.type).toBe('[Houses] Load Failure');
    expect(action.error).toBe(error);
  });
}); 