---
sidebar_position: 5
---

# Calendar: Next dates

<details open>
<summary>
  <code>POST</code> <code><b>/api/widgets/recommendations</b></code>
</summary>
 
##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | Authorization      |  required | String   | `Bearer <Access Token>`  |
> | Content-Type      |  required | String   | `application/json`  |

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | start_date      |  required | String   | `Y-m-d` `example: 2023-11-30`  |
> | end_date      |  required | String   | `Y-m-d` `example: 2023-12-05`  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |
> | `200`         | `text/plain;charset=UTF-8`        | `json data`                                                         |

```javascript title="JSON DATA"
[
    {
        "day": "2023-11-10 10:20:22",
        "task": {
            "name": "tranning",
            "time": "10:00:00",
            "status": ""
        }
    },
    {
        "day": "2023-11-11 10:20:22",
        "task": {
            "name": "tranning",
            "time": "10:00:00",
            "status": ""
        }
    },
    {
        "day": "2023-11-12 10:20:22",
        "task": {
            "name": "tranning",
            "time": "10:00:00",
            "status": ""
        }
    },
    //...
]
```
</details>
![Home Team Overview](/img/home_calendar.png)