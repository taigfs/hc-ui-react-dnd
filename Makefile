up:
	npm run dev

open:
	open -a "Google Chrome" http://localhost:5173/

test-login:
	curl -X POST -H "Content-Type: application/json" -d '{"url":"https://the-internet.herokuapp.com/login", "instanceId": "123"}' "http://localhost:3001/open-url"

test-type:
	curl -X POST -H "Content-Type: application/json" -d '{"selector":"#username", "text":"tomsmith", "instanceId": "123"}' "http://localhost:3001/type"

test-click:
	curl -X POST -H "Content-Type: application/json" -d '{"selector":".radius", "instanceId": "123"}' "http://localhost:3001/click"

test-close:
	curl -X POST -H "Content-Type: application/json" -d '{"instanceId": "123"}' "http://localhost:3001/close"
