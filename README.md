![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

<br>

# Atelier Reviews API Service

### *Goal:*
Build a scalable REST API for a retail e-commerce front-end, optimized to handle web-scale traffic.

- Implemented an ETL process to migrate over 7GB/20M+ entries into a redesigned postreSQL database optimizing query times to ~1ms.
- Scaled horizontally to a micro-service architecture with 3 AWS EC2 instances.
- Installed an NGINX load balancer to distribute traffic across servers and utilize proxy_caching.

<br>

## Stress Testing
### *Scenario*
#### Randomized selections from bottom 20% of dataset @ 2000RPS

| Optimization                      | Avg. Response Time | Successful Response Count |
|-----------------------------------|--------------------|---------------------------|
| None                              | 2740ms             |  73533/120000             |
| (1) EC2 w/ NGINX Load Balancer    | 3326ms             |  61298/120000             |
| (2) EC2 w/ NGINX Load Balancer    | 1859ms             |  97917/120000             |
| (3) EC2 w/ NGINX Load Balancer    | 1609ms             | 107589/120000             |
| NGINX Tuned w/ proxy_caching      | 167ms              | 119974/120000             |

### *Loader.io*

<details>
<summary>Test 1</summary>
<br>
  
![](assets/1.png)
  
</details>

<details>
<summary>Test 2</summary>
<br>
  
![](assets/2.png)
  
</details>

<details>
<summary>Test 3</summary>
<br>
  
![](assets/3.png)
  
</details>

<details>
<summary>Test 4</summary>
<br>
  
![](assets/4.png)
  
</details>

<details>
<summary>Test 5</summary>
<br>
  
![](assets/5.png)
  
</details>
