const translate = require('google-translate-api');
const readLine = require('readline');
const fs = require('fs');
const config = require('./../config');

const r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

let _inputLanguage = "";
let _targetLanguage = "";
let _inputFileAddress = "";
let _fileContents = "";

const getLanguage = function () {
    r1.question('What is your input language:(For example type fa for persian or en for english):\n', (inputLanguage) => {
        inputLanguage = inputLanguage.trim();
        if (inputLanguage !== "") {
            _inputLanguage = inputLanguage;
            r1.question('What is your target language:\n', function (targetLanguage) {
                targetLanguage = targetLanguage.trim();
                if (targetLanguage !== "") {
                    _targetLanguage = targetLanguage;
                    getFileAddress();
                } else {
                    console.error("Target language is empty");
                    getLanguage();
                }
            });
        } else {
            console.error("Input is empty");
            getLanguage();
        }
    })
};

console.log("Google translate requester by M.Fakhreddin");
const getFileAddress = function () {
    r1.question('Plz enter input file address:\n', function (inputFileAddress) {
        inputFileAddress = inputFileAddress.trim();
        fs.exists(inputFileAddress,
            function (exists) {
                if (exists) {
                    _inputFileAddress = inputFileAddress;
                    fs.readFile(inputFileAddress, 'utf8', function (err, contents) {
                        if (err) {
                            console.error("Error in reading file:\nDetail is :\n");
                            console.error(err);
                            getFileAddress();
                        } else {
                            _fileContents = contents;
                            requestToGoogle();
                        }
                    });
                } else {
                    console.error("File does not exists");
                    getFileAddress();
                }
            });
    });
};

const requestToGoogle = function () {
    console.log("Requesting to google");
    translate(_fileContents, {
        from: _inputLanguage,
        to: _targetLanguage
    }).then(function (res) {
        let targetFileAddress = (config.IS_WINDOWS) ? _inputFileAddress.split('.')[0] + "-translated.txt" :
            _inputFileAddress + "-translated";
        fs.writeFile(targetFileAddress, res.text, 'utf8',
            function (err) {
                if (err) {
                    console.error("Error in writing result,Detail is:");
                    console.error(err);
                    getFileAddress();
                } else {
                    console.log("Result write in following file:");
                    console.log(targetFileAddress);
                    console.log("-------------------------------");
                    getFileAddress();
                }
            }
        );

    }).catch(function (err) {
        console.error("Request failed,Detail is :");
        console.error(err);
        r1.question("do you want to try again?(y=yes,n=no)\n", function (answer) {
            if (answer.trim() === "y") {
                requestToGoogle();
            } else {
                getFileAddress();
            }
        });
    });
};

getLanguage();