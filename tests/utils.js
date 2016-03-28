/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/3/28
 * Description: Useful tools for testing.
 */

import TestUtils from 'react-addons-test-utils';
import _ from 'underscore';
import path from 'path';
import fs from 'fs';

function createDom(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}
export { createDom };

export function arrayIsEqual(a1, a2){
    return a.toString() === b.toString();
}

export function objectIsEqual(obj1, obj2){
    return _.isEqual(obj1, obj2);
}

function getDirectories(dp) {
    return fs.readdirSync(dp).filter(file => {
        return fs.statSync(path.join(dp, file)).isDirectory();
    });
}

function getFiles(dp) {
    return fs.readdirSync(dp).filter(file => {
        if(!fs.statSync(path.join(dp, file)).isFile()){
            return null;
        }
        return file.replace(/^.*[\\\/].*\./, '') === "md";
    });
}

export function loadBook(dp) {
    let book = {};
    book[dp] = {};
    getDirectories(dp).forEach(cp => {
        book[dp][cp] = {};
        getFiles(path.join(dp, cp)).forEach(f => {
            book[dp][cp][f] = fs.readFileSync(
                path.join(dp, cp, f)
            );
        });
    });
    return book;
}