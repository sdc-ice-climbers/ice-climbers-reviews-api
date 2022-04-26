import http from 'k6/http';
import { sleep } from 'k6';
// export const options = {
//   VUs: 1000,
//   duration: '30s',
//   // scenarios: {
//   //   constant_request_rate: {
//   //     executor: 'constant-arrival-rate',
//   //     rate: 1000,
//   //     timeUnit: '1s',
//   //     duration: '30s',
//   //     preAllocatedVus: 20,
//   //     maxVUs: 200
//   //   }
//   // },
//   thresholds: {
//     http_req_failed: ['rate<0.01'], // http errors should be less than 1%
//     http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
//   }
// };

export const options = {
  InsecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '10s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1000 },
    { duration: '3m', target: 1000 },
    { duration: '10s', target: 100 },
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 },
  ],
};

// export default function () {
//   const res = http.get(`http://localhost:1128/reviews/meta/?product_id=${Math.floor(Math.random()*999999)}`);
//   console.log('Response time was ' + String(res.timings.duration) + ' ms');

  export default function () {
    const res = http.get(`http://localhost:1128/reviews/?product_id=${Math.floor(Math.random()*999999)}&page=1&count=500&sort=helpfulness`);
    console.log('Response time was ' + String(res.timings.duration) + ' ms');

}

// k6 run script.js