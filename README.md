# homey
<p align="center">
  <img src="https://github.com/vlfldr/homey/blob/master/screenshot.png?raw=true" alt="homey dashboard"/>
</p>

**Work in progress! Not ready yet.**

Homey is a simple home server dashboard loosely inspired by Homer. From one cozy page, you can:
* Manage (pause/start/stop/restart) docker containers locally via the Docker API or remotely via Portainer - no custom tags required.
* Manage torrents through Flood and view realtime upload/download stats
* Add services with a simple YAML file
* View weather forecasts
* Watch your services stack up on the interactive Docker whale
* Play with a 3D spinning house

*For API functionality (Docker/Portainer, Flood, weather) [homey-server](https://github.com/vlfldr/homey-server) is required.*

When the project is released, a docker image and corresponding documentation will be provided.

Built with:

* Vue (frontend, data binding)
* SASS (layout, theming)
* Three.js & Tween.js (eyecandy)
* Flask (backend)

## Project setup
```
npm i
npm run dev
```
