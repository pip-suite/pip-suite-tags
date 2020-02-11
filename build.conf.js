module.exports = {
    module: {
        name: 'pipTags',
        styles: 'index',
        export: 'pip.tags',
        standalone: 'pip.tags'
    },
    build: {
        js: false,
        ts: false,
        tsd: true,
        bundle: true,
        html: true,
        sass: true,
        lib: true,
        images: true,
        dist: false
    },
    browserify: {
        entries: [ 
             './temp/pip-suite-tags-html.min.js',
            './src/index.ts'
        ]
    },      
    file: {
        lib: [
            '../node_modules/pip-webui-all/dist/**/*',
            '../pip-suite-rest/dist/**/*',
            '../pip-suite-entry/dist/**/*'
        ]
    },
    samples: {
        port: 8195,
        https: false
    },
    api: {
        port: 8191
    }
};
