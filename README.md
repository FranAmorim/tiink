<p align="center">
<img width="550" height="300" src="https://raw.githubusercontent.com/FranAmorim/tiink/develop/extra/tiink.png">
</p>

# Tiink

Tiink is a simple Job Schedule for NodeJS.

### Installation:

```sh
npm install tiink --save
```

### Usage:
Import the module into your project

```javascript
const Tiink = require('tiink');
// OR
import { Tiink } from 'tiink';
```

Create a new TeaTime
```javascript
const manager = new Tiink();
```

```javascript
const options = {
  hour: 3,
  weekday: []
};

manager.addJob('<JOB_NAME>', options, async () => {
  /*...YOUR LOGIC GOES HERE ...*/
});
```
### Specifications:

#### Methods:
| Methods       | Description                                     | Ready |
| ------------- |:------------------------------------------------|:-----:|
| addJob()      | Creates a job in the manager                    |   ✓   |
| stopJob()     | Only stops a job in the manager                 |   ✓   |
| deleteJob()   | Deletes a job from the manager                  |   ✓   |
| restartJob()  | Restarts job in the manager                     |   ✓   |

#### Options:
| Option   | Description                               |
| -------- |:------------------------------------------|
| minute   |     Represents minute in numbers          |
| hour     |     Represents hour in numbers            |
| weekday  |     Represents weekday in numbers         |
