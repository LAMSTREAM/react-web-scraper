const cracoAlias = require("craco-alias");

module.exports = {
    plugins: [
        {
            plugin: cracoAlias,
            options: {
                baseUrl: ".",
                source: "tsconfig",
                tsConfigPath: "./tsconfig.json",
            },
        },
    ],
    webpack: {
        //remove module scope limit
        configure: webpackConfig => {
            const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
                ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
            );

            webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
            return webpackConfig;
        }
    }
};