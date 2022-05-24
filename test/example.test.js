import {test} from '../index.js'

test('name', t => {
  if (false) {
    throw Error('this is error')
  }
})

test('test2', t => {
  if ('a' !== 'b') {
    throw Error('fubar')
  }
})

test('test4', t => {
  if ('a' !== 'b') {
    throw Error('bad times')
  }
})

test('test3', t => {
  if ('a' !== 'a') {
    throw Error('sad times')
  }
})

test('test3', t => {
  if ('a' !== 'a') {
    throw Error('sad times')
  }
})
