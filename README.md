![Screen Shot 2022-11-27 at 2 01 38 pm](https://user-images.githubusercontent.com/107200645/204117351-eec283ad-dd05-4e78-b665-b0561d4d0454.png)


# ABOUT

The app is simple and speaks for it's self really... add the prospective client's details and out comes a PNG that you can download or POST to a Telegram Channel / Chat - to be forwarded via your mobile device. 

If you dont want Telegram, just exclude the API server and it's volumes / configmap / env from the deploment. 

The input is first rendered to html and then to PNG using html-to-image; the HTML is visible on in main content, where the PNG image is available inside the pop up modal when you click GENERATE.


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

