# =============================================================
# AXION static site — multi-stage Docker build
# - No build step (vanilla HTML/CSS/JS)
# - Served by nginx alpine on port 8080 (non-root)
# - Final image: ~15 MB
# =============================================================

# --- Runtime stage ---------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Drop the default config; ship our own
RUN rm -f /etc/nginx/conf.d/default.conf

# Custom nginx config (gzip, brotli, caching, security headers)
COPY nginx.conf /etc/nginx/conf.d/axion.conf

# Static site
COPY index.html /usr/share/nginx/html/index.html
COPY css/       /usr/share/nginx/html/css/
COPY js/        /usr/share/nginx/html/js/
# NOTE: only ship the .webp assets that the site actually renders.
# README preview PNGs live in /assets but are referenced by README.md only,
# so we exclude them to keep the image lean.
COPY assets/*.webp /usr/share/nginx/html/assets/

# Run nginx as the unprivileged `nginx` user (uid 101) on the high port 8080.
# The base image already provides this user; we just need to make sure
# /var/cache/nginx, /var/log/nginx and the pid file are writable.
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=2s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
