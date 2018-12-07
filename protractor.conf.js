const path = require('path');

exports.config = {
    // Framework definition - tells Protractor to use Serenity/JS
    framework: 'custom',
    frameworkPath: require.resolve('serenity-js'),

    specs: [ path.join(__dirname,'features/**/*.feature') ],

    cucumberOpts: {
        require:    [ path.join(__dirname,'features/**/*.ts') ], // loads step definitions
        format:     'pretty',               // enable console output
        compiler:   'ts:ts-node/register'   // interpret step definitions as TypeScript
    },

    serenity: {
        // crew:    [
        //     crew.serenityBDDReporter(),
        //     crew.photographer()
        // ],

        dialect: 'cucumber',  // or 'mocha'

        //Selenium
        seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
        
        //browser
        multiCapabilities: [
            {
                browserName: 'chrome',
                
                // chromeOptions: {
                //     args: [
                //         '--disable-infobars'
                //         // '--incognito',
                //         // '--disable-extensions',
                //         // '--show-fps-counter=true'
                //     ]
                // }
            },
        ]
    }
}