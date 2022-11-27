# ABOUT

The app is simple and speaks for it's self really... add the prospective client's details and out comes a PNG that you can download and share to a Telegram Channel / Chat. 

If you dont want Telegram, just exclude the API server and it's volumes / configmap / env from the deploment.

# SETUP

The `google-ads-preview.yaml` provides an example deployment of the 'Web App' (jadsy2107/xlr8-gap-web) and it's backend 'API Server' (jadsy2107/xlr8-gap-api) - running on ports 80, 8081 respectively.

***The API Server Messages a Shareable Link to a Telegram CHAT_ID using a BOT_TOKEN, so setup a `.env` file with your values***

.env 
```bash
NTBA_FIX_350 = '1'
BOT_TOKEN="<TELEGRAM BOT_TOKEN>"
CHAT_ID="<TELEGRAM CHAT_ID"
```

K8s Config Map
```json
{
	".env": "NTBA_FIX_350 = '1'
		BOT_TOKEN=\"<TELEGRAM BOT_TOKEN>\"
		CHAT_ID=\"<TELEGRAM CHAT_ID\""
}
```

# IMPORTANT (If you want to use Telegram)

The Web App Dockerfile creates a nginx:mainline-alpine and copies www directory to host, and importantly, copies nginx configuration which proxies any /api requests to localhost:8081 (API Server)

