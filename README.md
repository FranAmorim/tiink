# TeaTime

TeaTime is a simple Job Schedule for NodeJS.
Don't miss your tea!

### Installation:

```sh
npm install @framorim/teatime
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

##### Methods:
| Methods       | Description                                     | Ready |
| ------------- |:------------------------------------------------|:-----:|
| addJob()      | Used to create a Job                            |   ✓   |
| stopJob()     | Stops a Job but doesn't remove from the manager |   ✓   |
| removeJob()   | Stops and Removes a Job from the Manager        |   ✗   |

##### Options:
| Option   | Description  |
| -------- |:-------------|
| minute   |              |
| hour     |              |
| weekday  |              |
