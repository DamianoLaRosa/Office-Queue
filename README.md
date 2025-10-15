# Commands

terminal 1: cd server;npm i;nodemon index.mjs
terminal 2: cd client;npm i;npm run dev 

# DB

counter_services ("id","counter_id","service_id")
counters ("counter_id","name")
services ("service_id","name","avg_service_time","tag")
tickets ("ticket_id","code","service_id")


## Counters, types and initial configuration
- The office consists of a set of counters that are usually identified by numbers
- Each counter can handle several types of services, which are defined at configuration time: a tag name that identifies the service type and an estimate of the average time needed to process that service type
- A service type can be served by multiple counters

## Clients and tickets
- Clients specify the service type and receive a ticket with a wait list code
- Ticket codes are unique and will be used to call clients to the correct counter when their request can be served

## Queues
- The system maintains different queues, one for each service type, so it is possible to know the number of people waiting for each type
- Every morning the queues are reset

## Officer
- When an officer at a counter is ready, he tells the system to call the next client
- Based on the counter id (it knows the services it can offer) the system returns the ticket code that will be handled by that counter

## Rules to choose the next ticket to be served
- select the first number from the longest queue among those corresponding to the service types the counter can handle
- If two or more queues have the same length, the queue associated with request type having the lowest service time is selected
- If all the queues the counter can serve are empty, the system does nothing
- Selected tickets are considered served and removed from their queue (which is therefore shortened by one)
- The system sends notifications concerning the length of the queues and the ticket codes called to the counters

## Display info when new ticked is issued
- one queue changes, therefore, the system possibly notify all the interested customers
- show on the main display board when a new ticket number is being called to a given counter
- show on the main display board the updated length of the queue associated with the type of served ticket
- The system should also provide an estimate of the waiting (minimum) time for the holder of a given ticket number

### Formula for the waiting time
Waiting_time= type_service_time*((number_people_ahead/sum(S/k))+0.5)
where the sum is done on all the counters:
- S is 1 (if the counter i serves that type of service) or 0 (if the counter i doesn't)
- k is the number of requests that counter i has served with that type of service

## Manager
- A manager in the office must be able to know how many customers have been served for each service type
- In addition the system should provide the number of customers each counter has served, further divided by service type
- Stats must be provided per day, week, month