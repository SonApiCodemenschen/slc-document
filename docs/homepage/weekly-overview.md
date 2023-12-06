---
sidebar_position: 2
---

# Weekly Overview API

<details open>
<summary>
  <code>POST</code> <code><b>/api/charts/weekly-overview</b></code>
</summary>
 
##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | Authorization      |  required | String   | `Bearer <Access Token>`  |
> | Content-Type      |  required | String   | `application/json`  |

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | is_weekly      |  required | String   | 1  |
> | is_percentage      |  required | String   | 0  |
> | start_day      |  required | String   | Y-m-d  |
> | end_day      |  required | String   | Y-m-d  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |
> | `200`         | `text/plain;charset=UTF-8`        | `json data`                                                         |

```javascript title="JSON DATA"
{
    
}
```
</details>
![Home Team Overview](/img/home_team-overview.png)
![Home Team Overview 2](/img/home_team-overview_2.png)