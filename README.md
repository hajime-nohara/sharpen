# ![sharpen_logo](http://www.sharpen.tokyo/assets/images/logo_small.png?t=1) Sharpen
Sharpen is a JavaScript framework for building web gantt chart applications.

* Useful — Sharpen is made by Hyperapp JavaScript framework. It's easy that you will inject to gantt chart in your application.
* Well-designed — Sharpen is designed by Semantic-UI design framework. It gives you good experience.
  
# Getting Started
You can start standalone sharpen gantt chart application quickly.
```
git clone https://github.com/hajime-nohara/sharpen.git
cd sharpen
cp config/index.js.default config/index.js
cp src/ad/index.js.default src/ad/index.js
npm install
npm install -g gulp (ref: https://semantic-ui.com/introduction/getting-started.html) 
cd semantic
gulp build
npm run start
```
run webpack-dev-server on localhost:8080.

# Production site
You can use shapen gantt chart right now.  
http://www.sharpen.tokyo/

# Attention
This project is implemented just only front end javascript.
You can run as standalone application but api action is not work.
For working "publish", "Project URL", "URL for other browser", actions, you have to implement API.

# License
Sharpen is MIT licensed.
