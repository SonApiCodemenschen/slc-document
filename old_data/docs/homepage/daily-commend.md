---
sidebar_position: 1
---

# Daily Comments API

<details open>
<summary>
  <code>POST</code> <code><b>/api/widgets/daily-comments</b></code>
</summary>
 

##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | Authorization      |  required | String   | `Bearer <Access Token>`  |
> | Content-Type      |  required | String   | `application/json`  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | action      |  required | String   | `ajax_get_data_widget`  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |
> | `200`         | `text/plain;charset=UTF-8`        | `json data`                                                         |

```javascript title="JSON DATA"
{
  "time": "2023-11-22 17:20:20",
  "playes": [
      {
          "name": "player_1",
          "status": "full",
          "comment": "comment data"
      },
      {
          "name": "player_2",
          "status": "Illness",
          "comment": "comment data"
      },
      //...
  ]
}
```
</details>


![Daily Comments](/img/home_daily-comment.png)


