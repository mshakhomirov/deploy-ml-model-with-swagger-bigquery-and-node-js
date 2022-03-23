# Skeleton project for Swagger



# BigQuery dataset

Our API will try to pull data from `analytics.user_churn` table.

## Create sample dataset

~~~sql
create table if not exists analytics.user_churn (
             user_id            int64
            ,last_online_ts     timestamp
        )
        ;

        insert analytics.user_churn (
                user_id
            ,   last_online_ts
        )
        with d as (
            select distinct 
                    user_id
                ,   last_online_ts

            from unnest([
            struct
            (

                1                                                      as user_id
            ,   timestamp_sub(current_timestamp(), interval 11 minute) as last_online_ts
                
            ),
            (
                2                                                      --as user_id
            ,   timestamp_sub(current_timestamp(), interval 12 minute) --as last_online_ts
            ),
            (
                3                                                      --as user_id
            ,   timestamp_sub(current_timestamp(), interval 13 minute) --as last_online_ts
            ),
            (
                4                                                      --as user_id
            ,   timestamp_sub(current_timestamp(), interval 14 minute) --as last_online_ts
            ),
            (
                5                                                      --as user_id
            ,   timestamp_sub(current_timestamp(), interval 15 minute) --as last_online_ts
            )
            ]
            ) as t
        )
        select
                user_id
            ,   last_online_ts
        from d
        ;
~~~
