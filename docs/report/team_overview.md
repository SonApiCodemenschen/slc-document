---
sidebar_position: 2
---

# Team Overview API

<details open>
<summary>
  <code>GET</code> <code><b>/widgets/team-overview</b></code>
  ###### Test Account: TSVHartberg
  ###### Number of queries: > 703
  ###### Timer: 5006.129999999998 ms
</summary>
<code>
* Issue: SQL query loop causing slowdown
* Assessment: The query speed for each individual query is quite fast; however, the API is slow due to a large number of SQL queries being directly called to the overloaded database, leading to slow queries.
</code> 
<code>
Preliminary solution:

Modify the code logic, use the singleton design pattern to manager `Player`/`User` data to avoid multiple queries.
Use `WHERE IN` to retrieve parameters from the array to avoid multiple loop queries.
</code>  
</details>

<details open>
### 1. Controller/action - model
##### WidgetController.php(59): calculateWellnessScoreOfPlayer(108812, '2024-01-15', 116)

> helpers.php(4856): getWellnessScoreConfig(116)

> helpers.php(4842): defaultWellnessScoreConfig(116)

##### WidgetController.php(57): get_presence_of_player('2024-01-15', 107728)


##### app/Http/Middleware/CreatedTeam.php(2886)
> app/Models/Player.php(153)

</details>
<details open>
### 2. The SQL queries causing loop errors
* Found queries to the `questions` table with different `system_type` values, a total of 110 SQL queries were found.
```sql
select * from `questions` 
where 
    `questions`.`user_id` = 116 and 
    `questions`.`user_id` is not null and 
    `system_type` = 'fatigue_and_recovery' limit 1
```
* Found queries to the `users_configs` table with different `key` values, a total of 25 SQL queries were found.
```sql
select `value` from `users_configs` 
where 
    `users_configs`.`user_id` = 116 and 
    `users_configs`.`user_id` is not null and 
    `key` = 'wellness_score_config' limit 1
```

* Found queries to the `positions` table with different `positions`.`id` values, a total of 34 SQL queries were found.
```sql
select * from `positions` 
where 
    `positions`.`id` = 3317 and `positions`.`id` is not null 
limit 1
```
* Found queries to the `files` table with different `files`.`id` values, a total of 109 SQL queries were found.
```sql
select * from `files` 
where 
    `files`.`id` = 181441 and 
    `files`.`id` is not null 
limit 1
```
* Found queries to the `users` table with different `users`.`id` values, a total of 118 SQL queries were found.
```sql
select * from `users` 
where 
    `users`.`id` = 116 and 
    `users`.`deleted_at` is null 
limit 1
```
* Found queries to the `players` table with different `players`.`id`; `last_name` values, a total of 34 SQL queries were found.
```sql
select count(*) as aggregate from `players` 
where 
    `players`.`user_id` = 116 and 
    `players`.`user_id` is not null and 
    `id` != 17005 and 
    `last_name` = 'Rotter' and 
    `deactivated_at` is null and 
    `first_name` LIKE 'T%'
```
* Found queries to the `players` table with different `players`.`id` values, a total of 55 SQL queries were found.
```sql
select * from `players` 
where `players`.`id` = 151461 limit 1
```
* Found queries to the `presence_lists` table with different `player_id` values, a total of 34 SQL queries were found.
```sql
select `presence_option_id`, `note`, `date` from `presence_lists` 
where 
    `player_id` = 108812 
order by `date` desc
```
</details>

<details>
### 3. The entire SQL queries of the API /widgets/alert

```SQL showLineNumbers
select * from `auth_sessions` where `id` = 'YUMrXS1wjibWrFWnNZ3HRfXrL90TjXYXxsJfOszc' limit 1	3.88
select * from `users` where `id` = 116 and `users`.`deleted_at` is null limit 1	1
select count(*) as aggregate from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `is_system` = 1	3.62
select count(*) as aggregate from `notifications` where `notifications`.`user_id` = 116 and `notifications`.`user_id` is not null and `is_system` = 1	0.9
select count(*) as aggregate from `medic_settings_acute_injury` where `type` = 'categories' and `user_id` = 116	21.7
select count(*) as aggregate from `medic_settings_acute_injury` where `type` = 'rehab' and `user_id` = 116	21.78
select count(*) as aggregate from `medic_settings_acute_injury` where `type` = 'rehab' and `user_id` = 116 and `name` = 'Illness'	20.68
select count(*) as aggregate from `medic_settings_acute_injury` where `type` = 'rehab' and `user_id` = 116 and `name` = 'Full'	17.78
select count(*) as aggregate from `medic_settings_acute_injury` where `type` = 'localisation' and `user_id` = 116	15.68
select count(*) as aggregate from `medic_settings_acute_injury` where `type` = 'precisley' and `user_id` = 116	13.07
select count(*) as aggregate from `medic_settings_acute_injury` where `type` = 'rehab' and `name` = 'SUA' and `user_id` = 116	14.14
select * from `medic_settings_acute_injury` where `type` = 'categories' and `name` = 'Tendons' and `user_id` = 116 limit 1	0.79
select * from `medic_settings_acute_injury` where `type` = 'localisation' and `id_parent` = 333	24.15
select * from `medic_settings_acute_injury` where `type` = 'diagnosis' and `id_parent` = 333	25.66
select * from `medic_settings_acute_injury` where `type` = 'categories' and `name` = 'Cartilage' and `user_id` = 116 limit 1	0.6
select * from `medic_settings_acute_injury` where `type` = 'localisation' and `id_parent` = 334	25.87
select * from `medic_settings_acute_injury` where `type` = 'diagnosis' and `id_parent` = 334	24.83
select * from `medic_settings_acute_injury` where `type` = 'categories' and `name` = 'Bones' and `user_id` = 116 limit 1	0.69
select * from `medic_settings_acute_injury` where `type` = 'localisation' and `id_parent` = 332	26.02
select * from `medic_settings_acute_injury` where `type` = 'diagnosis' and `id_parent` = 332	26.46
select * from `medic_settings_acute_injury` where `type` = 'categories' and `user_id` = 116 and `name` = 'Cartilage' limit 1	0.71
select * from `medic_settings_acute_injury` where `type` = 'diagnosis' and `user_id` = 116 and `name` = 'Rupture' and `id_parent` = 334 limit 1	3.12
select * from `medic_settings_acute_injury` where `type` = 'categories' and `user_id` = 116 and `name` = 'Cartilage' limit 1	0.63
select * from `medic_settings_acute_injury` where `type` = 'diagnosis' and `user_id` = 116 and `name` = 'Partial rupture' and `id_parent` = 334 limit 1	3.08
select * from `medic_settings_acute_injury` where `type` = 'categories' and `user_id` = 116 and `name` = 'Tendons' limit 1	0.69
select * from `medic_settings_acute_injury` where `type` = 'diagnosis' and `user_id` = 116 and `name` = 'Tendon partial rupture' and `id_parent` = 333 limit 1	3.57
select count(*) as aggregate from `teams` where `teams`.`user_id` = 116 and `teams`.`user_id` is not null	0.69
select * from `teams` where `teams`.`user_id` = 116 and `teams`.`user_id` is not null limit 1	0.64
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.06
select * from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'team_overview_config' limit 1	1.26
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.96
select * from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `deactivated_at` is null	2.74
select * from `players_details` where `players_details`.`player_id` in (16999, 17005, 17013, 17027, 36128, 87119, 87121, 107728, 108812, 148665, 149051, 149053, 149632, 149726, 149735, 149877, 149933, 149976, 149977, 149982, 149983, 151461, 151462, 151463, 151568, 151569, 151589, 151591, 151594, 151596, 151652, 151697, 151928, 151937)	2.19
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.77
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'presence_options_positions' limit 1	1.46
select * from `presence_options` where (`user_id` = 116 or `user_id` is null) order by id=1062 DESC, id=159554 DESC, id=1056 DESC, id=50860 DESC, id=1057 DESC, id=7208 DESC, id=48576 DESC, id=1058 DESC, id=159504 DESC, id=159505 DESC	4.59
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 108812 order by `date` desc	134.8
select * from `players` where `players`.`id` = 108812 limit 1	1.14
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.32
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.11
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.66
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.24
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.32
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.36
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.38
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 107728 order by `date` desc	131.55
select * from `players` where `players`.`id` = 107728 limit 1	1.3
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.26
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.13
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.29
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.16
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	4.47
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	10.55
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.07
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.35
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 87121 order by `date` desc	186.78
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 87119 order by `date` desc	267.45
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 36128 order by `date` desc	282.92
select * from `players` where `players`.`id` = 36128 limit 1	1.12
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.07
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	6.82
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	6.59
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.31
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.79
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.1
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.2
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.91
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 17027 order by `date` desc	244.24
select * from `players` where `players`.`id` = 17027 limit 1	0.86
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.9
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	0.98
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.17
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	0.89
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.07
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.04
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.34
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.35
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 17013 order by `date` desc	288.98
select * from `players` where `players`.`id` = 17013 limit 1	1
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.05
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	0.93
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	0.99
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	0.97
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.62
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	0.98
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.91
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.16
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 17005 order by `date` desc	270.32
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 16999 order by `date` desc	209.7
select * from `players` where `players`.`id` = 16999 limit 1	1.04
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.01
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.06
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.1
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.55
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	2.3
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.17
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.08
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.35
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 148665 order by `date` desc	115.53
select * from `players` where `players`.`id` = 148665 limit 1	1.46
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.01
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.1
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.11
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	0.96
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.01
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.89
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.19
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 149051 order by `date` desc	182.21
select * from `players` where `players`.`id` = 149051 limit 1	0.88
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.9
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.08
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.91
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.75
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.01
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.85
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.83
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 149053 order by `date` desc	60.94
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 149632 order by `date` desc	101.19
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 149726 order by `date` desc	86.36
select * from `players` where `players`.`id` = 149726 limit 1	0.97
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.34
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	0.93
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.19
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	0.96
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	0.95
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	0.93
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.86
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.19
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 149735 order by `date` desc	95.9
select * from `players` where `players`.`id` = 149735 limit 1	1.19
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.01
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.57
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.57
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.37
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.17
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.38
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.2
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.42
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 149877 order by `date` desc	85.65
select * from `players` where `players`.`id` = 149877 limit 1	0.96
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.9
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	0.98
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	0.93
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.6
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.07
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.37
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.87
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.33
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 149933 order by `date` desc	72.8
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 149976 order by `date` desc	68.87
select * from `players` where `players`.`id` = 149976 limit 1	0.97
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.93
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.8
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.07
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.06
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.33
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.04
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.96
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.29
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 149977 order by `date` desc	93.78
select * from `players` where `players`.`id` = 149977 limit 1	1.21
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.3
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.1
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.14
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.71
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.02
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.05
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.75
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	2.21
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 149982 order by `date` desc	92.91
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 149983 order by `date` desc	72.57
select * from `players` where `players`.`id` = 149983 limit 1	0.84
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.98
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.12
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.08
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.04
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.05
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.14
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.04
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.9
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151652 order by `date` desc	60.95
select * from `players` where `players`.`id` = 151652 limit 1	0.94
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.91
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.04
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.23
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.64
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.19
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.61
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.29
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.19
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151697 order by `date` desc	59.98
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151596 order by `date` desc	59.85
select * from `players` where `players`.`id` = 151596 limit 1	1.09
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.1
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	2.21
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.11
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.18
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	2.9
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.2
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.18
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	2.09
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151594 order by `date` desc	109.46
select * from `players` where `players`.`id` = 151594 limit 1	1.38
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.28
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.23
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.38
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	2.08
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.18
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.52
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	2.32
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.26
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151591 order by `date` desc	62.92
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151589 order by `date` desc	50.44
select * from `players` where `players`.`id` = 151589 limit 1	0.88
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.54
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.18
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.47
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.55
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.16
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.21
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.1
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.53
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151569 order by `date` desc	71.55
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151568 order by `date` desc	62.01
select * from `players` where `players`.`id` = 151568 limit 1	0.92
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.35
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.77
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.67
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.37
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.02
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.96
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	3.27
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151463 order by `date` desc	69.65
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151462 order by `date` desc	56.68
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151461 order by `date` desc	52.27
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151928 order by `date` desc	40.22
select * from `players` where `players`.`id` = 151928 limit 1	1.06
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.06
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.19
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.29
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.12
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.2
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.24
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.18
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.75
select `presence_option_id`, `note`, `date` from `presence_lists` where `player_id` = 151937 order by `date` desc	64.13
select * from `players` where `players`.`id` = 151937 limit 1	0.99
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.09
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.25
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	0.97
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	0.95
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.21
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.31
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.84
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.17
select * from `parameters` where `user_id` = 116 or `user_id` is null order by `order` IS NULL ASC, `order` asc, `name` asc	22.37
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 3374	0.86
select * from `users_parameters` where `users_parameters`.`parameter_id` = 3374 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 3374 and `user_id` = 116 limit 1	0.6
select * from `files` where `files`.`id` = 3384 and `files`.`id` is not null limit 1	0.89
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 3375	0.63
select * from `users_parameters` where `users_parameters`.`parameter_id` = 3375 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 3375 and `user_id` = 116 limit 1	0.75
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.5
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 3376	0.71
select * from `users_parameters` where `users_parameters`.`parameter_id` = 3376 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 3376 and `user_id` = 116 limit 1	0.65
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.53
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 3377	0.68
select * from `users_parameters` where `users_parameters`.`parameter_id` = 3377 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 3377 and `user_id` = 116 limit 1	0.69
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.47
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 3378	0.62
select * from `users_parameters` where `users_parameters`.`parameter_id` = 3378 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 3378 and `user_id` = 116 limit 1	0.65
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.52
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 21950	0.66
select * from `users_parameters` where `users_parameters`.`parameter_id` = 21950 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 21950 and `user_id` = 116 limit 1	0.67
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.44
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48356	0.69
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48356 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48356 and `user_id` = 116 limit 1	0.65
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.92
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48357	0.6
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48357 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48357 and `user_id` = 116 limit 1	0.82
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.68
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18501	0.62
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18501 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18501 and `user_id` = 116 limit 1	0.63
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	1.05
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18502	0.61
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18502 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18502 and `user_id` = 116 limit 1	0.71
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.46
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48354	0.66
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48354 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48354 and `user_id` = 116 limit 1	0.66
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	1.31
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48355	0.56
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48355 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48355 and `user_id` = 116 limit 1	0.59
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.82
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48365	0.59
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48365 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48365 and `user_id` = 116 limit 1	0.63
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.76
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48366	0.65
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48366 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48366 and `user_id` = 116 limit 1	0.61
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.86
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 3383	0.83
select * from `users_parameters` where `users_parameters`.`parameter_id` = 3383 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 3383 and `user_id` = 116 limit 1	0.6
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.44
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48360	0.55
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48360 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48360 and `user_id` = 116 limit 1	0.63
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.93
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48361	0.61
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48361 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48361 and `user_id` = 116 limit 1	0.6
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.41
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18503	0.59
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18503 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18503 and `user_id` = 116 limit 1	0.8
select * from `files` where `files`.`id` = 3974 and `files`.`id` is not null limit 1	0.95
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18504	0.57
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18504 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18504 and `user_id` = 116 limit 1	0.67
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.43
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48358	0.64
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48358 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48358 and `user_id` = 116 limit 1	0.62
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.86
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48359	0.65
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48359 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48359 and `user_id` = 116 limit 1	0.87
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	1.01
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48367	0.57
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48367 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48367 and `user_id` = 116 limit 1	0.69
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.88
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48368	0.65
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48368 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48368 and `user_id` = 116 limit 1	0.62
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.94
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18486	0.61
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18486 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18486 and `user_id` = 116 limit 1	1
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.47
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18493	0.63
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18493 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18493 and `user_id` = 116 limit 1	0.71
select * from `files` where `files`.`id` = 18796 and `files`.`id` is not null limit 1	0.86
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154179	0.59
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154179 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154179 and `user_id` = 116 limit 1	0.6
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.45
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154180	0.63
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154180 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154180 and `user_id` = 116 limit 1	0.81
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.64
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154469	0.56
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154469 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154469 and `user_id` = 116 limit 1	0.66
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.44
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154470	0.58
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154470 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154470 and `user_id` = 116 limit 1	0.69
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.42
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18494	0.59
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18494 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18494 and `user_id` = 116 limit 1	0.69
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.64
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18497	0.62
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18497 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18497 and `user_id` = 116 limit 1	0.62
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.45
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18498	0.7
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18498 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18498 and `user_id` = 116 limit 1	0.64
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.59
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154461	0.73
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154461 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154461 and `user_id` = 116 limit 1	0.72
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.51
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154462	0.69
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154462 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154462 and `user_id` = 116 limit 1	0.7
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.49
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 78671	0.88
select * from `users_parameters` where `users_parameters`.`parameter_id` = 78671 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 78671 and `user_id` = 116 limit 1	1.15
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.82
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 78672	0.61
select * from `users_parameters` where `users_parameters`.`parameter_id` = 78672 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 78672 and `user_id` = 116 limit 1	0.68
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.96
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154465	0.57
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154465 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154465 and `user_id` = 116 limit 1	0.67
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.51
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154466	0.72
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154466 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154466 and `user_id` = 116 limit 1	0.64
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.48
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154463	0.54
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154463 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154463 and `user_id` = 116 limit 1	0.58
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.46
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154464	0.56
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154464 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154464 and `user_id` = 116 limit 1	0.59
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.71
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48137	1.2
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48137 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48137 and `user_id` = 116 limit 1	0.62
select * from `files` where `files`.`id` = 3972 and `files`.`id` is not null limit 1	0.93
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 48138	0.61
select * from `users_parameters` where `users_parameters`.`parameter_id` = 48138 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 48138 and `user_id` = 116 limit 1	0.63
select * from `files` where `files`.`id` = 3972 and `files`.`id` is not null limit 1	0.91
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 23182	0.57
select * from `users_parameters` where `users_parameters`.`parameter_id` = 23182 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 23182 and `user_id` = 116 limit 1	0.54
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.4
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18491	0.91
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18491 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18491 and `user_id` = 116 limit 1	0.86
select * from `files` where `files`.`id` = 3972 and `files`.`id` is not null limit 1	0.78
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18492	0.64
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18492 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18492 and `user_id` = 116 limit 1	0.63
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.4
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 66690	0.53
select * from `users_parameters` where `users_parameters`.`parameter_id` = 66690 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 66690 and `user_id` = 116 limit 1	0.6
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.75
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 3382	0.51
select * from `users_parameters` where `users_parameters`.`parameter_id` = 3382 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 3382 and `user_id` = 116 limit 1	0.75
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.66
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 66691	0.58
select * from `users_parameters` where `users_parameters`.`parameter_id` = 66691 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 66691 and `user_id` = 116 limit 1	0.56
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.42
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18449	0.55
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18449 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18449 and `user_id` = 116 limit 1	0.56
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.41
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154181	0.51
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154181 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154181 and `user_id` = 116 limit 1	0.62
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.4
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154182	0.93
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154182 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154182 and `user_id` = 116 limit 1	0.62
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.43
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18487	0.58
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18487 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18487 and `user_id` = 116 limit 1	1.02
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.93
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18488	0.75
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18488 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18488 and `user_id` = 116 limit 1	0.67
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.49
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18499	1.11
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18499 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18499 and `user_id` = 116 limit 1	0.65
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.42
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18500	0.59
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18500 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18500 and `user_id` = 116 limit 1	0.67
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.39
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 38742	0.57
select * from `users_parameters` where `users_parameters`.`parameter_id` = 38742 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 38742 and `user_id` = 116 limit 1	0.54
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	2.28
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 38743	0.59
select * from `users_parameters` where `users_parameters`.`parameter_id` = 38743 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 38743 and `user_id` = 116 limit 1	0.61
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	0.74
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154467	0.64
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154467 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154467 and `user_id` = 116 limit 1	0.58
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.37
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154468	0.57
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154468 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154468 and `user_id` = 116 limit 1	0.62
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.42
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 3380	1.45
select * from `users_parameters` where `users_parameters`.`parameter_id` = 3380 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 3380 and `user_id` = 116 limit 1	0.96
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.42
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18448	0.63
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18448 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18448 and `user_id` = 116 limit 1	0.59
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.4
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 4289	0.53
select * from `users_parameters` where `users_parameters`.`parameter_id` = 4289 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 4289 and `user_id` = 116 limit 1	0.57
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.39
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 4170	0.55
select * from `users_parameters` where `users_parameters`.`parameter_id` = 4170 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 4170 and `user_id` = 116 limit 1	0.98
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.4
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18505	0.58
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18505 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18505 and `user_id` = 116 limit 1	0.63
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.4
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18506	0.63
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18506 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18506 and `user_id` = 116 limit 1	0.59
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.43
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18495	0.66
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18495 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18495 and `user_id` = 116 limit 1	0.6
select * from `files` where `files`.`id` = 3973 and `files`.`id` is not null limit 1	1.41
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 51293	0.7
select * from `users_parameters` where `users_parameters`.`parameter_id` = 51293 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 51293 and `user_id` = 116 limit 1	0.64
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.39
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 51294	0.56
select * from `users_parameters` where `users_parameters`.`parameter_id` = 51294 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 51294 and `user_id` = 116 limit 1	0.66
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.41
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18496	0.58
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18496 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18496 and `user_id` = 116 limit 1	0.62
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.44
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18489	0.77
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18489 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18489 and `user_id` = 116 limit 1	0.62
select * from `files` where `files`.`id` = 3972 and `files`.`id` is not null limit 1	1.06
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18490	0.58
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18490 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18490 and `user_id` = 116 limit 1	0.82
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.46
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154459	0.75
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154459 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154459 and `user_id` = 116 limit 1	0.58
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.51
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 154460	1.03
select * from `users_parameters` where `users_parameters`.`parameter_id` = 154460 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 154460 and `user_id` = 116 limit 1	0.83
select * from `files` where `files`.`id` is null and `files`.`id` is not null limit 1	0.4
select * from `parameters` where `parameters`.`id` = '18493' limit 1	0.87
select count(*) as aggregate from `users_deactivated_parameters` where `user_id` = 116 and `parameter_id` = 18493	0.62
select * from `users_parameters` where `users_parameters`.`parameter_id` = 18493 and `users_parameters`.`parameter_id` is not null and `parameter_id` = 18493 and `user_id` = 116 limit 1	0.69
select * from `files` where `files`.`id` = 18796 and `files`.`id` is not null limit 1	0.89
select * from `files` where `files`.`id` = 18796 and `files`.`id` is not null limit 1	0.87
select * from `players` where `players`.`id` = 108812 limit 1	1.48
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.91
select * from `acute_chronic_configs` where `acute_chronic_configs`.`user_id` = 116 and `acute_chronic_configs`.`user_id` is not null and `parameter_id` = '18493' and `player_id` is null limit 1	0.88
select * from `players` where `players`.`id` = 107728 limit 1	1.14
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.04
select * from `players` where `players`.`id` = 87121 limit 1	0.93
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.84
select * from `players` where `players`.`id` = 87119 limit 1	1.21
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.83
select * from `players` where `players`.`id` = 36128 limit 1	0.91
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.11
select * from `players` where `players`.`id` = 17027 limit 1	1.06
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.45
select * from `players` where `players`.`id` = 17013 limit 1	1.11
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.94
select * from `players` where `players`.`id` = 17005 limit 1	0.92
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.9
select * from `players` where `players`.`id` = 16999 limit 1	0.87
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.27
select * from `players` where `players`.`id` = 148665 limit 1	0.91
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.92
select * from `players` where `players`.`id` = 149051 limit 1	1.37
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.1
select * from `players` where `players`.`id` = 149053 limit 1	1.4
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.04
select * from `players` where `players`.`id` = 149632 limit 1	1.05
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.16
select * from `players` where `players`.`id` = 149726 limit 1	1
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.92
select * from `players` where `players`.`id` = 149735 limit 1	1.31
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.17
select * from `players` where `players`.`id` = 149877 limit 1	1.03
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.66
select * from `players` where `players`.`id` = 149933 limit 1	0.89
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.95
select * from `players` where `players`.`id` = 149976 limit 1	0.92
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.95
select * from `players` where `players`.`id` = 149977 limit 1	0.93
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.19
select * from `players` where `players`.`id` = 149982 limit 1	0.85
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1
select * from `players` where `players`.`id` = 149983 limit 1	1.39
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.36
select * from `players` where `players`.`id` = 151652 limit 1	0.89
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.98
select * from `players` where `players`.`id` = 151697 limit 1	0.85
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.88
select * from `players` where `players`.`id` = 151596 limit 1	0.82
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.93
select * from `players` where `players`.`id` = 151594 limit 1	0.94
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.94
select * from `players` where `players`.`id` = 151591 limit 1	0.93
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.11
select * from `players` where `players`.`id` = 151589 limit 1	0.88
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.03
select * from `players` where `players`.`id` = 151569 limit 1	1.25
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.9
select * from `players` where `players`.`id` = 151568 limit 1	0.83
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.83
select * from `players` where `players`.`id` = 151463 limit 1	0.84
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.91
select * from `players` where `players`.`id` = 151462 limit 1	0.92
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.01
select * from `players` where `players`.`id` = 151461 limit 1	1.02
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.02
select * from `players` where `players`.`id` = 151928 limit 1	0.97
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.72
select * from `players` where `players`.`id` = 151937 limit 1	1.1
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.18
select * from `formations` where `user_id` = 116 or `user_id` is null	0.8
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.21
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'team_overview_field_color' limit 1	1.09
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'team_overview_formation_config' limit 1	3.24
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.04
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'fatigue_and_recovery' limit 1	1.11
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'stress_level' limit 1	1.2
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'motivation_and_mood' limit 1	1.19
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'general_muscular' limit 1	1.11
select * from `questions` where `questions`.`user_id` = 116 and `questions`.`user_id` is not null and `system_type` = 'sleep_quality' limit 1	1.06
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.99
select `value` from `users_configs` where `users_configs`.`user_id` = 116 and `users_configs`.`user_id` is not null and `key` = 'wellness_score_config' limit 1	1.56
select * from `files` where `files`.`id` = 181444 and `files`.`id` is not null limit 1	0.94
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.83
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 108812 and `last_name` = 'Steinwender' and `deactivated_at` is null and `first_name` LIKE 'M%'	2.18
select * from `positions` where `positions`.`id` = 3317 and `positions`.`id` is not null limit 1	0.81
select * from `files` where `files`.`id` = 184897 and `files`.`id` is not null limit 1	0.84
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.81
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 107728 and `last_name` = 'Avdijaj' and `deactivated_at` is null and `first_name` LIKE 'D%'	2.67
select * from `positions` where `positions`.`id` = 3325 and `positions`.`id` is not null limit 1	0.91
select * from `files` where `files`.`id` = 181435 and `files`.`id` is not null limit 1	0.82
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.9
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 87121 and `last_name` = 'Lemmerer' and `deactivated_at` is null and `first_name` LIKE 'J%'	2.15
select * from `positions` where `positions`.`id` = 3327 and `positions`.`id` is not null limit 1	1.02
select * from `files` where `files`.`id` = 181441 and `files`.`id` is not null limit 1	0.89
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.09
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 87119 and `last_name` = 'Pußwald' and `deactivated_at` is null and `first_name` LIKE 'M%'	3.2
select * from `positions` where `positions`.`id` = 3316 and `positions`.`id` is not null limit 1	1.03
select * from `files` where `files`.`id` = 182638 and `files`.`id` is not null limit 1	1.12
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.04
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 36128 and `last_name` = 'Gollner' and `deactivated_at` is null and `first_name` LIKE 'M%'	2.41
select * from `positions` where `positions`.`id` = 3317 and `positions`.`id` is not null limit 1	0.93
select * from `files` where `files`.`id` = 181436 and `files`.`id` is not null limit 1	0.93
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.66
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 17027 and `last_name` = 'Heil' and `deactivated_at` is null and `first_name` LIKE 'J%'	2.67
select * from `positions` where `positions`.`id` = 3319 and `positions`.`id` is not null limit 1	1.04
select * from `files` where `files`.`id` = 181451 and `files`.`id` is not null limit 1	1.08
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.08
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 17013 and `last_name` = 'Kainz' and `deactivated_at` is null and `first_name` LIKE 'T%'	2.55
select * from `positions` where `positions`.`id` = 3321 and `positions`.`id` is not null limit 1	0.94
select * from `files` where `files`.`id` = 181450 and `files`.`id` is not null limit 1	1.3
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.24
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 17005 and `last_name` = 'Rotter' and `deactivated_at` is null and `first_name` LIKE 'T%'	2.33
select * from `positions` where `positions`.`id` = 3317 and `positions`.`id` is not null limit 1	0.86
select * from `files` where `files`.`id` = 181447 and `files`.`id` is not null limit 1	1.03
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.94
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 16999 and `last_name` = 'Sallinger' and `deactivated_at` is null and `first_name` LIKE 'R%'	2.37
select * from `positions` where `positions`.`id` = 3316 and `positions`.`id` is not null limit 1	1.36
select * from `files` where `files`.`id` = 181439 and `files`.`id` is not null limit 1	1.04
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.91
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 148665 and `last_name` = 'Kröpfl' and `deactivated_at` is null and `first_name` LIKE 'M%'	2.29
select * from `positions` where `positions`.`id` = 3326 and `positions`.`id` is not null limit 1	0.89
select * from `files` where `files`.`id` = 181442 and `files`.`id` is not null limit 1	0.95
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.91
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 149051 and `last_name` = 'Sellinger' and `deactivated_at` is null and `first_name` LIKE 'M%'	2.37
select * from `positions` where `positions`.`id` = 3321 and `positions`.`id` is not null limit 1	1.4
select * from `files` where `files`.`id` = 181430 and `files`.`id` is not null limit 1	0.85
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.95
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 149053 and `last_name` = 'Wilfinger' and `deactivated_at` is null and `first_name` LIKE 'F%'	2.44
select * from `positions` where `positions`.`id` = 3320 and `positions`.`id` is not null limit 1	0.91
select * from `files` where `files`.`id` = 181438 and `files`.`id` is not null limit 1	1.01
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.02
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 149632 and `last_name` = 'Karamarko' and `deactivated_at` is null and `first_name` LIKE 'M%'	2.2
select * from `positions` where `positions`.`id` = 3317 and `positions`.`id` is not null limit 1	1.51
select * from `files` where `files`.`id` = 181428 and `files`.`id` is not null limit 1	1
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.08
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 149726 and `last_name` = 'Frieser' and `deactivated_at` is null and `first_name` LIKE 'D%'	2.43
select * from `positions` where `positions`.`id` = 3326 and `positions`.`id` is not null limit 1	0.86
select * from `files` where `files`.`id` = 181448 and `files`.`id` is not null limit 1	1.01
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.89
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 149735 and `last_name` = 'Providence' and `deactivated_at` is null and `first_name` LIKE 'R%'	2.87
select * from `positions` where `positions`.`id` = 3325 and `positions`.`id` is not null limit 1	1.12
select * from `files` where `files`.`id` = 181437 and `files`.`id` is not null limit 1	1.17
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.03
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 149877 and `last_name` = 'Pfeifer' and `deactivated_at` is null and `first_name` LIKE 'M%'	2.44
select * from `positions` where `positions`.`id` = 3318 and `positions`.`id` is not null limit 1	1
select * from `files` where `files`.`id` = 181431 and `files`.`id` is not null limit 1	2.87
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.72
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 149933 and `last_name` = 'Ehmann' and `deactivated_at` is null and `first_name` LIKE 'F%'	2.7
select * from `positions` where `positions`.`id` = 3316 and `positions`.`id` is not null limit 1	0.96
select * from `files` where `files`.`id` = 181445 and `files`.`id` is not null limit 1	1
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	4.86
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 149976 and `last_name` = 'Diakité' and `deactivated_at` is null and `first_name` LIKE 'O%'	3.21
select * from `positions` where `positions`.`id` = 3320 and `positions`.`id` is not null limit 1	1.01
select * from `files` where `files`.`id` = 182637 and `files`.`id` is not null limit 1	1.03
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.07
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 149977 and `last_name` = 'Sangare' and `deactivated_at` is null and `first_name` LIKE 'M%'	2.36
select * from `positions` where `positions`.`id` = 3324 and `positions`.`id` is not null limit 1	0.96
select * from `files` where `files`.`id` = 184898 and `files`.`id` is not null limit 1	1
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.01
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 149982 and `last_name` = 'Halwachs' and `deactivated_at` is null and `first_name` LIKE 'J%'	6.06
select * from `positions` where `positions`.`id` = 3320 and `positions`.`id` is not null limit 1	0.97
select * from `files` where `files`.`id` = 181429 and `files`.`id` is not null limit 1	0.99
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.2
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 149983 and `last_name` = 'Prokop' and `deactivated_at` is null and `first_name` LIKE 'D%'	2.3
select * from `positions` where `positions`.`id` = 3325 and `positions`.`id` is not null limit 1	0.94
select * from `files` where `files`.`id` = 181433 and `files`.`id` is not null limit 1	1.65
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.16
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151652 and `last_name` = 'Bowat' and `deactivated_at` is null and `first_name` LIKE 'I%'	2.47
select * from `positions` where `positions`.`id` = 3317 and `positions`.`id` is not null limit 1	1.04
select * from `files` where `files`.`id` = 182636 and `files`.`id` is not null limit 1	1.05
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.09
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151697 and `last_name` = 'Lind' and `deactivated_at` is null and `first_name` LIKE 'H%'	2.51
select * from `positions` where `positions`.`id` = 3321 and `positions`.`id` is not null limit 1	2.3
select * from `files` where `files`.`id` = 181425 and `files`.`id` is not null limit 1	0.92
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.01
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151596 and `last_name` = 'Lang' and `deactivated_at` is null and `first_name` LIKE 'C%'	2.25
select * from `positions` where `positions`.`id` = 3324 and `positions`.`id` is not null limit 1	0.96
select * from `files` where `files`.`id` = 182639 and `files`.`id` is not null limit 1	0.85
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.27
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151594 and `last_name` = 'Fillafer' and `deactivated_at` is null and `first_name` LIKE 'M%'	2.24
select * from `positions` where `positions`.`id` = 3326 and `positions`.`id` is not null limit 1	1.21
select * from `files` where `files`.`id` = 181449 and `files`.`id` is not null limit 1	1.11
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.01
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151591 and `last_name` = 'Schutti' and `deactivated_at` is null and `first_name` LIKE 'S%'	2.38
select * from `positions` where `positions`.`id` = 3318 and `positions`.`id` is not null limit 1	0.85
select * from `files` where `files`.`id` = 181426 and `files`.`id` is not null limit 1	1.26
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.89
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151589 and `last_name` = 'Urdl' and `deactivated_at` is null and `first_name` LIKE 'C%'	2.98
select * from `positions` where `positions`.`id` = 3321 and `positions`.`id` is not null limit 1	0.93
select * from `files` where `files`.`id` = 181427 and `files`.`id` is not null limit 1	1.32
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.1
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151569 and `last_name` = 'Kovacevic' and `deactivated_at` is null and `first_name` LIKE 'D%'	2.26
select * from `positions` where `positions`.`id` = 3319 and `positions`.`id` is not null limit 1	0.92
select * from `files` where `files`.`id` = 181446 and `files`.`id` is not null limit 1	1.34
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.9
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151568 and `last_name` = 'Komposch' and `deactivated_at` is null and `first_name` LIKE 'P%'	3.24
select * from `positions` where `positions`.`id` = 3317 and `positions`.`id` is not null limit 1	1.01
select * from `files` where `files`.`id` = 181443 and `files`.`id` is not null limit 1	0.93
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.92
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151463 and `last_name` = 'Entrup' and `deactivated_at` is null and `first_name` LIKE 'M%'	2.3
select * from `positions` where `positions`.`id` = 3327 and `positions`.`id` is not null limit 1	0.87
select * from `files` where `files`.`id` = 181440 and `files`.`id` is not null limit 1	0.94
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	1.71
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151462 and `last_name` = 'Postl' and `deactivated_at` is null and `first_name` LIKE 'M%'	2.19
select * from `positions` where `positions`.`id` = 3327 and `positions`.`id` is not null limit 1	0.96
select * from `files` where `files`.`id` = 181432 and `files`.`id` is not null limit 1	0.86
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.94
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151461 and `last_name` = 'Postl' and `deactivated_at` is null and `first_name` LIKE 'H%'	2.22
select * from `positions` where `positions`.`id` = 3316 and `positions`.`id` is not null limit 1	0.82
select * from `files` where `files`.`id` = 184899 and `files`.`id` is not null limit 1	1.36
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.93
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151928 and `last_name` = 'Knoflach' and `deactivated_at` is null and `first_name` LIKE 'T%'	2.33
select * from `positions` where `positions`.`id` = 3316 and `positions`.`id` is not null limit 1	0.78
select * from `files` where `files`.`id` = 184896 and `files`.`id` is not null limit 1	0.83
select * from `users` where `users`.`id` = 116 and `users`.`deleted_at` is null limit 1	0.84
select count(*) as aggregate from `players` where `players`.`user_id` = 116 and `players`.`user_id` is not null and `id` != 151937 and `last_name` = 'Brückner' and `deactivated_at` is null and `first_name` LIKE 'A%'	2.21
select * from `positions` where `positions`.`id` = 3319 and `positions`.`id` is not null limit 1	0.89
update `auth_sessions` set `payload` = 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZ1hFWFFPRmNHbm1jWGFmTkZBaFl6cWJTMWc4M0MzNWd2RkRWRG5UTSI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTE2O3M6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI3OiJodHRwOi8vbG9jYWxob3N0OjMzMDA0L2hvbWUiO319', `last_activity` = 1705283845, `user_id` = 116, `ip_address` = '172.18.0.1', `user_agent` = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' where `id` = 'YUMrXS1wjibWrFWnNZ3HRfXrL90TjXYXxsJfOszc'	3.32
```
</details>