import filterByProp from '../Object';

describe('Object', () => {
  it('should filter object correctly', () => {
    const array = [
      { name: 'taylor', job: 'police' },
      { name: 'roy', job: 'gamer' },
      { name: 'roy', job: 'footballer' },
      { name: 'sam', job: 'doctor' },
      { name: 'rudy', job: 'doctor' },
    ];

    // filter by name
    expect(filterByProp(array, 'name', 'roy')).toEqual([
      { name: 'roy', job: 'gamer' },
      { name: 'roy', job: 'footballer' }
    ]);

    // filter by job
    expect(filterByProp(array, 'job', 'doctor')).toEqual([
      { name: 'sam', job: 'doctor' },
      { name: 'rudy', job: 'doctor' },
    ]);
  });
});
