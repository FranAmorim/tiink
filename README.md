<p align="center">
<img width="250" height="250" src="https://github.com/FranAmorim/teatime/blob/develop/extra/tiink.png">
</p>

# TeaTime

TeaTime is a simple Job Schedule for NodeJS.
Don't miss your tea!

### Installation:

```sh
npm install @framorim/teatime --save
```
or
```sh
npm install -g @framorim/teatime
```

### Usage:
Import the module into your project

```javascript
const TeaTime = require('@framorim/teatime')
```

Create a new TeaTime
```javascript
const schedule = new TeaTime();
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
