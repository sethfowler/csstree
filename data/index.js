var mdnProperties = require('./mdn-data-properties.json');
var mdnAtrules = require('./mdn-data-at-rules.json');
var mdnSyntaxes = require('./mdn-data-syntaxes.json');
var patch = require('./patch.json');
var data = {
    properties: {},
    atrules: {},
    types: {}
};

// apply patch
for (var key in patch.properties) {
    if (key in mdnProperties) {
        if (patch.properties[key]) {
            mdnProperties[key].syntax = patch.properties[key].syntax;
        } else {
            delete mdnProperties[key];
        }
    } else {
        mdnProperties[key] = patch.properties[key];
    }
}

for (var key in patch.syntaxes) {
    if (patch.syntaxes[key].syntax) {
        mdnSyntaxes[key] = patch.syntaxes[key].syntax;
    } else {
        delete mdnSyntaxes[key];
    }
}

// normalize source mdnProperties syntaxes, since it uses html token
for (var key in mdnProperties) {
    data.properties[key] = mdnProperties[key].syntax;
}

for (var atrule in mdnAtrules) {
    data.atrules[atrule.substr(1)] = {
        syntax: mdnAtrules[atrule].syntax,
        descriptors: {}
    };
    for (var key in mdnAtrules[atrule].descriptors) {
        data.atrules[atrule.substr(1)].descriptors[key] = mdnAtrules[atrule].descriptors[key].syntax;
    }
}

for (var key in mdnSyntaxes) {
    data.types[key] = mdnSyntaxes[key];
}

module.exports = data;
