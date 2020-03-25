'use strict';

const autoGlobals = require('auto-globals');
const test = autoGlobals(require('supertape'));
const createElement = require('./create-element');

const {isElementPresent} = createElement;
const {create} = autoGlobals;

test('create-element: isElementPresent', (t) => {
    const result = isElementPresent();
    
    t.notOk(result, 'should be not ok');
    t.end();
});

test('create-element: isElementPresent', (t, {document}) => {
    const {querySelector} = document;
    const el = {};
    
    querySelector
        .returns(el);
    
    const result = isElementPresent('hello');
    
    t.equal(result, el, 'should equal');
    t.end();
});

test('create-element: not found', (t) => {
    const parent = create();
    const result = createElement('div', {
        parent,
        dataName: 'hello',
    });
    
    t.equal(result.dataset.name, 'hello', 'should equal');
    t.end();
});

test('create-element: found', (t, {document}) => {
    const {querySelector} = document;
    const el = {};
    
    querySelector.returns(el);
    
    const parent = create();
    const result = createElement('div', {
        parent,
        dataName: 'hello',
    });
    
    t.equal(result, el, 'should equal');
    t.end();
});

test('create-element: found: not uniq', (t, {document}) => {
    const {querySelector} = document;
    const el = {};
    
    querySelector.returns(el);
    
    const parent = create();
    createElement('div', {
        parent,
        dataName: 'hello',
        uniq: false,
    });
    
    t.ok(parent.appendChild.called, 'should call appendChild');
    t.end();
});

test('create-element: innerHTML', (t) => {
    const innerHTML = 'hello';
    const parent = create();
    
    const el = createElement('div', {
        parent,
        innerHTML,
    });
    
    t.equal(el.innerHTML, innerHTML, 'should equal');
    t.end();
});

test('create-element: textContent', (t) => {
    const textContent = 'hello';
    const parent = create();
    
    const el = createElement('div', {
        parent,
        textContent,
    });
    
    t.equal(el.textContent, textContent, 'should equal');
    t.end();
});

test('create-element: notAppend', (t, {document}) => {
    const {body} = document;
    const notAppend = true;
    
    createElement('div', {
        notAppend,
    });
    
    t.notOk(body.appendChild.called, 'should equal');
    t.end();
});

test('create-element: no parent', (t, {document}) => {
    const {body} = document;
    const el = createElement('div');
    
    t.ok(body.appendChild.calledWith(el), 'should call body.appendChild');
    t.end();
});

