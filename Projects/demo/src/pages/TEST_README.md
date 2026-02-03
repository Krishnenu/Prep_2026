# JobPortal Component - Test Documentation

## Overview
This test suite provides comprehensive coverage for the `JobPortal` component, which displays job listings from Hacker News API with pagination functionality.

## Test Structure

### Test Files
- **`JobPortal.test.tsx`** - Main test file with all test cases
- **`setupTests.ts`** - Jest setup file for extending matchers
- **`jest.config.ts`** - Jest configuration

## Test Coverage

### 1. Initial Render Tests
- ✅ Renders the heading "Hacker News Jobs Board"
- ✅ Renders the "Load More" button

### 2. Fetching Job IDs Tests
- ✅ Fetches job IDs from API on component mount
- ✅ Handles errors when fetching job IDs fails

### 3. Loading Jobs Tests
- ✅ Loads first 6 jobs automatically on mount
- ✅ Displays job metadata (title, author, date) correctly
- ✅ Shows loading state while fetching jobs

### 4. Load More Functionality Tests
- ✅ Loads additional jobs when "Load More" button is clicked
- ✅ Disables button while loading
- ✅ Disables button when all jobs are loaded

### 5. Error Handling Tests
- ✅ Handles errors when fetching individual jobs fails
- ✅ Logs errors to console appropriately

### 6. Edge Cases Tests
- ✅ Handles empty job IDs array
- ✅ Doesn't fetch jobs if jobIds is empty

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

## Test Technologies

- **Jest** - Testing framework
- **React Testing Library** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers for DOM
- **ts-jest** - TypeScript support for Jest

## Mock Data

The tests use mock data to simulate API responses:
- Mock job IDs: Array of 12 job IDs
- Mock jobs: 6 sample job objects with realistic data

## Key Testing Patterns

### 1. Mocking fetch API
```typescript
global.fetch = jest.fn();
(global.fetch as jest.Mock).mockResolvedValue({
  json: async () => mockData,
});
```

### 2. Waiting for async operations
```typescript
await waitFor(() => {
  expect(screen.getByText('Job Title')).toBeInTheDocument();
});
```

### 3. Testing user interactions
```typescript
fireEvent.click(screen.getByRole('button', { name: /load more/i }));
```

## Coverage Goals

- **Statements**: > 80%
- **Branches**: > 80%
- **Functions**: > 80%
- **Lines**: > 80%

## Continuous Integration

These tests can be integrated into CI/CD pipelines:
```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: npm test
  
- name: Generate coverage
  run: npm run test:coverage
```

## Troubleshooting

### Common Issues

1. **Tests timing out**
   - Increase Jest timeout in test file: `jest.setTimeout(10000)`

2. **Mock not working**
   - Ensure `jest.clearAllMocks()` is called in `beforeEach`

3. **TypeScript errors**
   - Ensure `@types/jest` is installed
   - Check `tsconfig.json` includes test files

## Future Improvements

- [ ] Add snapshot tests for UI consistency
- [ ] Add integration tests with real API (optional)
- [ ] Add performance tests for large datasets
- [ ] Add accessibility tests with jest-axe
