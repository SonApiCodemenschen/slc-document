---
sidebar_position: 3
---

# Alert API

<details open>
<summary>
  <code>GET</code> <code><b>/widgets/alert</b></code>
  ###### Tài khoản: TSVHartberg
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
##### /app/Http/Controllers/WidgetController.php(415): calculate_week_to_week_player_parameter_of_date()
> gọi 1242 lần hàm calculate_week_to_week_player_parameter_of_date với các tham số đầu vào khác nhau

> gọi 14 lần calculate_week_to_week_player_parameter_of_date với cùng tham số
##### app/Http/Controllers/WidgetController.php(443): App\\Models\\Player->calculateAcuteLoad()

##### app/Http/Controllers/WidgetController.php(404): calculateWellnessScoreOfPlayer()

</details>
<details open>
### 2. Mã lệnh SQL lặp
* Tìm thấy truy vấn đến bảng `players` với các condition where trùng nhau, tìm được 113 truy vấn sql

```sql
select * from `players` where `players`.`id` = 108812 limit 1
```
* Tìm thấy truy vấn đến bảng `users` với các condition where trùng nhau, tìm được 51 truy vấn sql

```sql
select * from `users` 
where 
    `users`.`id` = 116 and 
    `users`.`deleted_at` is null limit 1
```

* Tìm thấy truy vấn đến bảng `users_deactivated_parameters` với các `parameter_id` khác nhau, tìm được 83 truy vấn sql
```sql
select count(*) as aggregate from `users_deactivated_parameters` 
where `user_id` = 116 and `parameter_id` = 3374
```

* Tìm thấy truy vấn đến bảng `users_parameters` với các `parameter_id` khác nhau, tìm được 83 truy vấn sql

```sql
select * from `users_parameters` 
where 
    `users_parameters`.`parameter_id` = 3374 and 
    `users_parameters`.`parameter_id` is not null and 
    `parameter_id` = 3374 and `user_id` = 116 
limit 1
```

* Tìm thấy truy vấn đến bảng `files` với các `files`.`id` khác nhau, tìm được 93 truy vấn sql

```sql
select * from `files` where `files`.`id` = 3384 and `files`.`id` is not null limit 1
```

* Tìm thấy truy vấn đến bảng `players_tests` với các `player_id` khác nhau, tìm được 50 truy vấn sql

```sql
select `value` from `players_tests` 
where 
    `player_id` = 17027 and 
    `value` is not null and 
    `test_id` = 1 order by `date` desc limit 1
```

* Tìm thấy truy vấn đến bảng `acute_chronic_configs` với các `parameter_id` `player_id` khác nhau, tìm được 205 truy vấn sql

```sql
select * from `acute_chronic_configs` 
where 
    `acute_chronic_configs`.`user_id` = 116 and 
    `acute_chronic_configs`.`user_id` is not null and 
    `parameter_id` = 3382 and `player_id` = 16999 limit 1
```

* Tìm thấy truy vấn đến bảng `questions` với các `system_type` khác nhau, tìm được 65 truy vấn sql

```sql
select * from `questions` 
where 
    `questions`.`user_id` = 116 and 
    `questions`.`user_id` is not null and 
    `system_type` = 'fatigue_and_recovery' limit 1
```
</details>