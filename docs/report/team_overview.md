---
sidebar_position: 3
---

# Team Overview API

<details open>
<summary>
  <code>GET</code> <code><b>/widgets/team-overview</b></code>
  ###### Tài khoản: TSVHartberg
  ###### Tổng số truy vấn tạm tính: 703
</summary>
<code>
* Vấn đề xảy ra: Lỗi loop truy vấn SQL gây chậm
* Đánh giá: Tốc độ truy vấn mỗi truy vấn riêng lẻ khá nhanh, api chậm do có số lượng lớn truy vấn sql gọi trực tiếp đến DB dây ngập lụt (sql flood) dẫn đến truy vấn chậm
</code> 
<code>
Giải pháp sơ bộ: 
- thay đổi logic code, sử dụng design singleton để lưu trữ Player/User tránh truy vấn nhiều lần
- sử dụng where in để lấy các tham số trong mảng tránh việc foreach câu truy vấn nhiều lần
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
### 2. Mã lệnh SQL lặp
* Tìm thấy truy vấn đến bảng `questions` với các cột `system_type` khác nhau, tìm được 110 truy vấn sql

```sql
select * from `questions` 
where 
    `questions`.`user_id` = 116 and 
    `questions`.`user_id` is not null and 
    `system_type` = 'fatigue_and_recovery' limit 1
```
* Tìm thấy truy vấn đến bảng `users_configs` với các cột `key` khác nhau, tìm được 25 truy vấn sql

```sql
select `value` from `users_configs` 
where 
    `users_configs`.`user_id` = 116 and 
    `users_configs`.`user_id` is not null and 
    `key` = 'wellness_score_config' limit 1
```

* Tìm thấy truy vấn đến bảng `positions` với các cột `positions`.`id` khác nhau, tìm được 34 truy vấn sql

```sql
select * from `positions` 
where 
    `positions`.`id` = 3317 and `positions`.`id` is not null 
limit 1
```
* Tìm thấy truy vấn đến bảng `files` với các cột `files`.`id` khác nhau, tìm được 109 truy vấn sql

```sql
select * from `files` 
where 
    `files`.`id` = 181441 and 
    `files`.`id` is not null 
limit 1
```
* Tìm thấy truy vấn đến bảng `users` với các cột `users`.`id` khác nhau, tìm được 118 truy vấn sql

```sql
select * from `users` 
where 
    `users`.`id` = 116 and 
    `users`.`deleted_at` is null 
limit 1
```
* Tìm thấy truy vấn đến bảng `players` với các cột `players`.`id`, `last_name` khác nhau, tìm được 34 truy vấn sql

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
* Tìm thấy truy vấn đến bảng `players` với các cột `players`.`id` khác nhau, tìm được 55 truy vấn sql

```sql
select * from `players` 
where `players`.`id` = 151461 limit 1
```
* Tìm thấy truy vấn đến bảng `presence_lists` với các cột `player_id` khác nhau, tìm được 34 truy vấn sql

```sql
select `presence_option_id`, `note`, `date` from `presence_lists` 
where 
    `player_id` = 108812 
order by `date` desc
```
</details>