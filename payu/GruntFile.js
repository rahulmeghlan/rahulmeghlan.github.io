module.exports = function (grunt) {
    grunt.loadNpmTasks('@micahgodbolt/grunt-phantomcss');

    grunt.initConfig({
        phantomcss: {
            desktop: {
                options: {
                    screenshots: 'baselines/desktop',
                    results: 'results/desktop',
                    viewportSize: [1280, 800]
                },
                src: [
                    'tests/phantomcss/start.js',
                    'tests/phantomcss/*-test.js'
                ]
            }
        }
    });
};