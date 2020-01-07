## run validation

```shell script
npm install
npx openapi2schema -i spec.yaml -p >| json-schema.json 

# save the response json to test to test.json
node validate.js json-schema.json test.json <url> <method> <status code>
```