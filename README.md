# American Fugitive - Interactive Map

An interactive "American Fugitive" map powered by Leaflet, PostGIS, and Redis.

## Structure

- `app/` - The front-end web application source.
- `public/` - The compiled and minified front-end code.
- `server/` - The Node.js API server code.

## Setup

To setup the project, simply download or clone the project to your local machine and `npm install`.

For local development you can deploy a Postgres & Redis instance using Docker

```bash
# Up
docker-compose up -d

# Down
docker-compose down -v
```

The only extra step is adding a `.env` file in order to properly initialize the required environment variables.

Here's an example `.env` file with sensible defaults for local development

```bash
PORT=5000
DATABASE_URL=posgres://posgres@localhost:5432/american_fugitive?ssl=false
REDIS_HOST=localhost
REDIS_PORT=6379
CORS_ORIGIN=http://localhost:8080
```

You'll need to change the username in the DATABASE_URL entry to match your PostgreSQL user credentials. Unless your name is "Patrick", that is, in which case it might already be fine.

Run `npm run dev` to start the API server on `localhost:5000`, and to build/watch/serve the frontend code from `localhost:8080`.

## Attribution

```bash
The MIT License (MIT)

Copyright (c) 2018 Patrick Triest

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
