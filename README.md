# exam
Test runner

## Usage
### Write tests
```js
import {test} from 'exam'

test('name', t => {
  
})

test('test2', t => {
  if ('a' !== 'b') {
    throw Error('fail')
  }
})
```

### Run tests
```sh
node index.js ./test
```
