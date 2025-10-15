# Deployment Guide

This guide covers different deployment options for EliteStore.

## 🚀 Quick Deploy

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Set up and deploy
   - Link to existing project or create new
   - Configure build settings (auto-detected)

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `build` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or connect your GitHub repository for continuous deployment

### GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/elitestore",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔧 Environment Configuration

### Production Environment Variables

Create a `.env.production` file:

```env
REACT_APP_SITE_NAME=EliteStore
REACT_APP_SITE_URL=https://your-domain.com
REACT_APP_API_URL=https://your-api.com
GENERATE_SOURCEMAP=false
```

### Build Optimization

1. **Analyze Bundle Size**
   ```bash
   npm install --save-dev webpack-bundle-analyzer
   npm run build
   npx webpack-bundle-analyzer build/static/js/*.js
   ```

2. **Optimize Images**
   - Use WebP format when possible
   - Implement lazy loading
   - Compress images before deployment

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location /static/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Build and Run

```bash
docker build -t elitestore .
docker run -p 80:80 elitestore
```

## ☁️ Cloud Deployment

### AWS S3 + CloudFront

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   ```bash
   aws s3 sync build/ s3://your-bucket-name --delete
   ```

3. **Configure CloudFront**
   - Create distribution
   - Set origin to S3 bucket
   - Configure error pages for SPA routing

### Google Cloud Platform

1. **Install Google Cloud SDK**

2. **Deploy to App Engine**
   ```yaml
   # app.yaml
   runtime: nodejs18
   handlers:
   - url: /static
     static_dir: build/static
   - url: /(.*\.(json|ico|js))$
     static_files: build/\1
     upload: build/.*\.(json|ico|js)$
   - url: .*
     static_files: build/index.html
     upload: build/index.html
   ```

   ```bash
   gcloud app deploy
   ```

## 🔒 Security Considerations

### Content Security Policy

Add to `public/index.html`:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://fakestoreapi.com;
">
```

### HTTPS Configuration

- Always use HTTPS in production
- Configure HSTS headers
- Use secure cookies

## 📊 Monitoring

### Performance Monitoring

1. **Google Analytics**
   ```javascript
   // Add to public/index.html
   gtag('config', 'GA_TRACKING_ID');
   ```

2. **Web Vitals**
   ```bash
   npm install web-vitals
   ```

### Error Tracking

Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Hotjar for user behavior

## 🚀 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 📱 PWA Configuration

### Service Worker

The app is PWA-ready. To enable:

1. **Uncomment in src/index.tsx**
   ```typescript
   // serviceWorkerRegistration.register();
   ```

2. **Configure manifest.json**
   ```json
   {
     "short_name": "EliteStore",
     "name": "EliteStore - Premium Shopping",
     "icons": [
       {
         "src": "favicon.ico",
         "sizes": "64x64 32x32 24x24 16x16",
         "type": "image/x-icon"
       }
     ],
     "start_url": ".",
     "display": "standalone",
     "theme_color": "#000000",
     "background_color": "#ffffff"
   }
   ```

## 🔍 SEO Optimization

### Pre-rendering

For better SEO, consider:
- Next.js for SSR/SSG
- Gatsby for static generation
- Prerender.io for SPA pre-rendering

### Meta Tags

Already configured in `public/index.html`:
- Open Graph tags
- Twitter Card tags
- Structured data markup

## 📞 Support

For deployment issues:
- Check the [Issues](https://github.com/your-username/elitestore/issues) page
- Create a new issue with deployment logs
- Contact the maintainers