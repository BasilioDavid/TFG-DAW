const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  testMatch: ["**/+.spec.+(.ts)"],
  testPathIgnorePatterns:["/node_modules/", "/tmp/", "/dist", "/tools/"],
  projects: getJestProjects(),
};
