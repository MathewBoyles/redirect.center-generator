# redirect.center-generator

## Getting Started
Install dependencies
> yarn install

Start express server
> yarn start

## Endpoints
[GET] **/cname**
- *target*: The domain to be affected by the DNS record (e.g. jobs.old-website.com)
- *destination*: The absolute URL to the destination page (e.g. https://new-website.com/jobs)
- *usePath*: Boolean - Should the target path be included in the redirect (i.e. https://jobs.old-website.com/view/123 -> https://new-website.com/jobs/view/123)

---
Response:
*/cname?target=jobs.old-website.com&destination=https://new-website.com/jobs&usePath=true*
```
{
    "result": {
        "records": [
            {
                "type": "CNAME",
                "host": "jobs",
                "value": "new-website.com.opts-slash.jobs.opts-https.opts-uri.redirect.center"
            }
        ],
        "target": "jobs.old-website.com",
        "destination": "https://new-website.com/jobs",
        "usePath": true,
        "isHttps": true
    }
}
```

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/dba7c3a32028969f1eb8)
