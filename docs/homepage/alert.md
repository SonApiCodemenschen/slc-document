---
sidebar_position: 3
---

# Alert API

<details open>
<summary>
  <code>POST</code> <code><b>/api/widgets/alert</b></code>
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

```javascript title="JSON DATA" {13,14,15} showLineNumbers
[
    {
        "id": 152544,
        "team_id": 148315,
        "first_name": "Lennart",
        "last_name": "Grill",
        "playing_time": 12344678,
        "aka": "Franz Stolz",
        "max_velocity": "30.00",
        "max_heart_rate": "200.00",
        "birthday": "2001-02-14",
        "ignore_velocity": null,
        "injury_risk": {},
        "score": {},
        "ac": [],
        "need_for_speed": {
            "18495": null,
            "3382": null,
            "3375": null
        },
        "jersey": "12",
        "option": 1062,
        "sleep": null,
        "stress": null,
        "fatigue": null,
        "muscle": null,
        "week_to_week": [
            {
                "parameter_value": 0,
                "parameter_id": 3380
            },
            {
                "parameter_value": 0,
                "parameter_id": 3375
            },
            {
                "parameter_value": 0,
                "parameter_id": 3376
            },
            {
                "parameter_value": 0,
                "parameter_id": 3377
            }
        ],
        "wellness": [
            {
                "sleep": 1,
                "well_being": 2,
                "fatigue": 3,
                "muscle": 4,
                "wellness_score": 5
            }
        ]
    },
    //...
]
```
</details>
![Home Alert 1](/img/home_alert.png)