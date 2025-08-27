const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: "<rootDir>/src/",
	}),
	testMatch: ["<rootDir>/src/modules/**/application/useCases/**/*.spec.ts"],
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	coverageReporters: ["text-summary", "lcov"],
};
