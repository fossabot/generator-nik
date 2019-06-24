const SRC_ROOT = "src";
const CI_ROOT = SRC_ROOT;
const E2E_TESTMATCH = ["**/__tests__/**/*.e2e.[jt]s?(x)"];
const UNIT_TESTMATCH = ["**/__tests__/**/*.test.[jt]s?(x)"];
const rootMap = arr => root => arr.map((file) => `<rootDir>/${root}/${file}`);
const e2e = rootMap([E2E_TESTMATCH]);
const unit = rootMap(UNIT_TESTMATCH);


let config = {};

let devBase = {
    modulePathIgnorePatterns: ["templates", ".tmp"],

};

let ciBase = {
    transform: {},
    reporters: ["default", "jest-junit"],
    collectCoverage: true
};

switch (process.env.JEST_ENV) {
    case "ci-unit":
        config = { ...devBase, ...ciBase, testMatch: unit(CI_ROOT)};
        break;

    case "ci-e2e":
        config = { ...devBase, ...ciBase, testMatch: e2e(CI_ROOT) };
        break;

    case "dev-unit":
        config = { ...devBase, testMatch: unit(SRC_ROOT) };
        break;

    case "dev-e2e":
        config = { ...devBase, testMatch: e2e(SRC_ROOT) };
        break;

    case "wallaby":
        config = { ...devBase, testMatch: unit(SRC_ROOT) };
        break;

    default:
        throw new Error(`JEST_ENV variable not set to correct value...`);
}

module.exports = config;
