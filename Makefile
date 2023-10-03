up:
	npm run dev

open:
	open -a "Google Chrome" http://localhost:5173/

test-login:
	curl -X POST -H "Content-Type: application/json" -d '{"url":"https://the-internet.herokuapp.com/login", "instanceId": "123"}' "http://localhost:3001/open-url"
