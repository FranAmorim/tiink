<p align="center">
<img width="550" height="300" src="https://raw.githubusercontent.com/FranAmorim/tiink/develop/extra/tiink.png">
</p>

# Tiink

TeaTime is a simple Job Schedule for NodeJS.
Don't miss your tea!

### Installation:

```sh
npm install tiink --save
```
or
```sh
npm install -g tiink
```

### Usage:
Import the module into your project

```javascript
const TeaTime = require('tiink')
```

Create a new TeaTime
```javascript
const schedule = new Tiink();
```

```javascript
const options = {
  hour: 3,
  weekday: '*'
};

schedule.addJob('<JOB_NAME>', options, async () => {
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
| setJob()      | Sets a job in the manager                       |   ✓   |
| restartJob()  | Restarts job in the manager                     |   ✓   |

#### Options:
| Option   | Description                               |
| -------- |:------------------------------------------|
| minute   |     Represents minute in numbers          |
| hour     |     Represents hour in numbers            |
| weekday  |     Represents weekday in numbers         |
