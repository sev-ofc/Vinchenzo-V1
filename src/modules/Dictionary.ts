import fs from 'fs';

let AmongusCock;
try {  
    var data = fs.readFileSync('AmongusCock.txt', 'utf8');
    AmongusCock = data.toString();
} catch(e) {
    console.log('Error Reading AmongusCock.txt', e.stack);
}

let dictionary = new Map;
dictionary.set(['among us', 'amogus', 'amung us', 'amog us', 'amongus', 'anogus', 'sus'], AmongusCock);
dictionary.set(['vincent', '<@!291940792459722752>', '@ultraorange#2804'], 'https://media.discordapp.net/attachments/653035130738311188/860075731622166538/VINCENT.gif?width=540&height=540');
dictionary.set(['i know','why',  'wow', 'ok', 'mean', 'stop', 'wow dude', 'dude'], 'cry about it');

let dmDictionary = new Map;
dmDictionary.set(['bro', 'brutha', 'bruh'], "https://steamcommunity.com/sharedfiles/filedetails/?id=1731654961");

export {dictionary, dmDictionary, AmongusCock};