module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/lib/'],
    verbose: true,
    collectCoverageFrom: ['lib/**/*.{js}', '!<rootDir>/node_modules/', '!lib/logger/**/*.{js}'],
}
