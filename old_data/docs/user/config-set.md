---
sidebar_position: 1
---

# User config set API

<details open>
<summary>
  <code>POST</code> <code><b>/api/user-config/set</b></code>
</summary>
 
##### Headers
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | Authorization      |  required | String   | `Bearer <Access Token>`  |
> | Content-Type      |  required | String   | `application/json`  |

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | items      |  required | Array   | `[{"key": "alert_widget_display_playing_time","value": 1}, /*...*/]`  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |
> | `200`         | `text/plain;charset=UTF-8`        | `json data`                                                         |

```javascript title="JSON DATA"
{
    "status": "succeed" /* failed */
}
```
</details>

![User config set API 1](/img/user-config/set_1.png)
![User config set API 2](/img/user-config/set_2.png)
![User config set API 3](/img/user-config/set_3.png)