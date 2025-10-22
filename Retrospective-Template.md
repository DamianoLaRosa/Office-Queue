TEMPLATE FOR RETROSPECTIVE (Team 01)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done -> 2 vs 2 (stories)
- Total points committed vs. done -> 6 vs 6 (points)
- Nr of hours planned vs. spent (as a team) -> 54 vs 56 (hours)

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- BackEnd side
- Client side
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

### Detailed statistics

| Story  | # Tasks | Story points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _Uncategorized_   |   OQ 30 - Code Review     |   -    |   6h         |      4h    |
| _Uncategorized_   |   OQ 19 - Sprint Planning     |  -     |       12h     |    17h          |
| _Uncategorized_   |   OQ 09 - Creation of the database     |   -    |   2h 30m         |      3h 30m        |
| _Uncategorized_   |   OQ 16 - Review Javascript    |   -    |     6h       |     8h         |
| _Uncategorized_   |   OQ 27 - Data models BackEnd     |   -    |    1h 30m        |     1h 30m            |
| 1   |   OQ 15 - Show available services       |  3     |     1h       |      1h        |
| 1    |    OQ 17 - Design UI     |    3    |   2h         |      1h        |  
| 1   |   OQ 18 - Provide available services for a client      |   3    |      1h      |       30m       |
| 1    |  OQ 12 - Select service and provide ticket number       |    3    |    1h        |    1h          |  
| 1   | OQ 13 - BackEnd API        |   3    |     1h       |     45m         |
| 1    |  OQ 20 - Testing story 01       |   3     |     6h       |     6h         |  
| 1    |  OQ 14 - Client side API      |     3   |      1h      |     1h         | 
| 2   |   OQ 24 - Client show new ticket number and service type       |    3   |    1h        |      30m        |
| 2    |    OQ 10 - Get services by counter id   |   3     |     1h       |     1h         |  
| 2   |   OQ 26 - Delete previous ticket from the queue      |   3    |    30m        |      45m        |
| 2    |  OQ 29 - Get all counters      |   3     |   30m         |     1h         |  
| 2    |  OQ 25 - Select next ticket query      |   3     |    1h        |    1h 30m          |
| 2   | OQ 21 - BackEnd API        |   3    |     2h       |   2h           |
| 2    |  OQ 28 - Testing story 02       |   3     |    6h        |    3h          |  
| 2    |  OQ 22 - Client side API      |     3   |    1h        |      1h        | 

- Hours per task average, standard deviation (estimate and actual)

|            | Mean | StDev |
|------------|------|-------|
| Estimation |   2.70 h   |   2.90 h    | 
| Actual     |   2.80 h   |    3.79 h  |

- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1 = 3.70%

    $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1$$
    
- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n = 28.67%

    $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| $$
  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated -> 11 h
  - Total hours spent -> 8 h
  - Nr of automated unit test cases -> 9 tests
  - Coverage -> 90 % lines
- E2E testing:
  - Total hours estimated -> 1 h 
  - Total hours spent -> 1 h 
  - Nr of test cases -> 2

  > the testing hours were not divided in the tracker so we assigned 1 h to E2E testing from the actual hours and the estimated hours

  > in the next sprint we will divide them

- Code review 
  - Total hours estimated -> 6h
  - Total hours spent -> 4h
  


## ASSESSMENT

- What did go wrong in the sprint?

  > We struggled to organize ourselves and reach an agreement in a short time, especially when it came to organizing the initial phase of the project.

- What caused your errors in estimation (if any)?

  > The estimation errors were mostly caused by our limited experience in estimating how long it takes to write code.

- What lessons did you learn (both positive and negative) in this sprint?

  > To keep constant communication with one another.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > Better comunication

  > Shorter (and better) planning sessions

- One thing you are proud of as a Team!!
  > We succeded in doing the two planned stories