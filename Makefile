up:
	npm run dev

open:
	open -a "Google Chrome" http://localhost:5173/

test-login:
	curl "http://localhost:3001/open-url?url=https://the-internet.herokuapp.com/login"