###  MQTT Alarm Aggregator
For this task we would like you design a mqtt client that subscribes and keeps track of six alarm topics using Node.js (Nest.js framework preferred but not required).  When **any** of these child topics publishes a value of '0', the client will publish a '0' to the parent topic. Only when  **all** child topics last published a value of '1',  then the client can publish '1' to the parent topic.  The value of '0' represents a flag indicating of that status of that system needing attention, while a value of '1' indicates no attention needed. Assume the initial state of the parent topic is '1'.   
 
The topics are as follows:
```json
"childTopics" : [
  "site/123/photovoltaic/skidControlUnits/01A/inverters/1/status",
  "site/123/photovoltaic/skidControlUnits/01A/inverters/2/status",
  "site/123/photovoltaic/skidControlUnits/01A/inverters/3/status",
  "site/123/photovoltaic/skidControlUnits/01A/inverters/4/status",
  "site/123/photovoltaic/skidControlUnits/01A/inverters/5/status",
  "site/123/photovoltaic/skidControlUnits/01A/inverters/6/status"
]
"parentTopic":  "site/123/photovoltaic/skidControlUnits/01A/status" 
```
Your code will be tested using a local mosquitto broker by publishing '0's and '1's to the child topics.  While subscribing to parent topic to verify the correct status. The broker config (`mosquitto.conf`) will have the following settings:
```
log_type all
listener 1883
allow_anonymous true
```
 
Please use the mqtt.js library and submit as a zip via email or git link. Feel free to add typechecking, unit tests, formatters, linters or any other tooling you think might help or you simply like to use. 

If you have any additional questions while working through the exercise, you can contact Natalie Guidry (natalie.guidry@fractalems.com) for clarifications.
