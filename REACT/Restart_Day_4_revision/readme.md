# Today's Learning
- Props use in React 
- Basically by default react gives props parameter with any function we create and pass it to the function 
- the flow is whenever we call the function it also takes some parameters and it is in object form by default , here is example code while calling it by curly braces we can pass our variables 
``` javascript 
  <Card channelName='chaiaurcode ' somearr={myarr}/>
```
- and we can destruct dirctly while taking it and also set default value here is the example code 
``` javascript 
export default function Card({channelName='guest'}) {
  return (
    <h2 className="text-3xl font-semibold tracking-wide">{channelName}</h2>
    )}
```
- saw dev.ui library 
- so much learning today with just half hour video 