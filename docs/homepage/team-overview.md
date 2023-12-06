---
sidebar_position: 2
---

# Team Overview API

<details open>
<summary>
  <code>POST</code> <code><b>/api/widgets/team-overview</b></code>
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
{
    "total_players": 28,
    "total_players_available": 28,
    "percent_players_available": 100,
    "options": [
        {
          "id": "159504",
          "name": "ILLNESS",
          "count_players": 0,
          "percent_players": 0
        },
        {
          "id": "7208",
          "name": "REST DAY",
          "count_players": 0,
          "percent_players": 0
        },
        {
          "id": "1062",
          "name": "FULL",
          "count_players": 0,
          "percent_players": 28
        },
        //...
    ],
    "selectedPlayers": [
        "152544", //player_id
        //..
    ],
    "players": [
        {
            "id": 152544,
            "team_id": 148315,
            "first_name": "Lennart",
            "last_name": "Grill",
            "position_id": 3316,
            "deactivated_at": null,
            "photo_id": 185239,
            "language_id": 3,
            "user_id": 450,
            "aka": "Franz Stolz",
            "max_velocity": "30.00",
            "max_heart_rate": "200.00",
            "birthday": "2001-02-14",
            "ignore_velocity": null,
            "need_for_speed": {
                "18495": null,
                "3382": null,
                "3375": null
            },
            "position": {
                "id": 3317,
                "name": "Goalkeeper",
                "alias": "GK",
                "color": "#cece1c"
            },
            "jersey": "12",
            "name": "Lennart Grill",
            "short_name": "Grill L.",
            "age": 22
        },
        //...
    ]
}
```
</details>
![Home Team Overview](/img/home_team-overview.png)
![Home Team Overview 2](/img/home_team-overview_2.png)