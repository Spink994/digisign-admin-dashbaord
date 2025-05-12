/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require('next/jest');

/**
|--------------------------------------------------
| Creating the jest config
|--------------------------------------------------
*/
const createJestConfig = nextJest({
	dir: './',
});

/**
|--------------------------------------------------
| Custom configuration
|--------------------------------------------------
*/
const customJestConfig = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		'^@/components/(.*)$': '<rootDir>/src/components/$1',
		'^@/lib/(.*)$': '<rootDir>/src/lib/$1',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

module.exports = createJestConfig(customJestConfig);
