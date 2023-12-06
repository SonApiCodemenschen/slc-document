---
sidebar_position: 4
---

# Recommendations API

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
> | action      |  required | String   | ajax_get_data_widget  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |
> | `200`         | `text/plain;charset=UTF-8`        | `json data`                                                         |

```javascript title="JSON DATA"
[
    {
        "id": 152544,
        "team_id": 148315,
        "first_name": "Lennart",
        "last_name": "Grill",
        "position_id": 3316,
        "deactivated_at": null,
        "photo_id": 185239,
        "language_id": 3,
        "aka": "Franz Stolz",
        "max_velocity": "30.00",
        "max_heart_rate": "200.00",
        "jersey": "12",
        "recommendations": [
            {
                "accr_ratio": 0,
                "parameter_id": 3374,
                "type": "alert",
                "kind": "AC:CR",
                "message": "AC:CR workload is too low. Increase the load for this player for the next sessions"
            }
        ],
        "option": 1062,
        "photo_url": "https:\/\/speed.soccer-load-calculator.com\/uploads\/450\/CQFaZ2LzyBugCbS7w3MXlrsIbPAYPQMGpBJUdS5z.png",
        "name": "Lennart Grill",
        "short_name": "Grill L.",
        "position": {
            "id": 3316,
            "name": "Goalkeeper",
            "alias": "GK",
            "color": "#cece1c",
            "user_id": null,
            "created_at": "2021-12-13T08:10:07.000000Z",
            "updated_at": null,
            "order": null
        },
        "age": 22
    },
    //...
]
```
</details>
![Home Team Overview](/img/home_recommentdations_1.png)