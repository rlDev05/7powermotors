# Production deployment

The production architecture is:

```text
Browser -> HTTPS Nginx reverse proxy -> 127.0.0.1:8080 -> Node/Express container
                                                   |-> static React application
                                                   `-> /api/partnership -> Brevo SMTP
```

The application port is bound to localhost by default and should not be exposed publicly. Nginx is the only public web entry point.

## Required DNS records

At the authoritative DNS provider, point both public names at the VPS:

```text
Type   Name   Value
A      @      187.77.133.171
A      www    187.77.133.171
```

Remove conflicting `A`, `AAAA`, or `CNAME` records for these names. DNS propagation must finish before requesting a certificate.

## Server environment

Create `/opt/7powermotors-new/.env` from `.env.example` on the server. Keep this file uncommitted and readable only by the deployment account. Replace the SMTP password placeholder with the Brevo SMTP key; do not use the Brevo login password.

The sender `service@cr-1phillipines.com` and the domain must be verified in Brevo. Add the exact DKIM and other authentication records that Brevo displays for this domain. Do not guess these DNS values.

Start the container from the application directory:

```bash
docker compose config
docker compose up -d --build
docker compose ps
curl --fail http://127.0.0.1:8080/api/health
```

The health endpoint reports `503` until complete SMTP credentials are present. The Compose service remains unhealthy in that state by design.

## Nginx and HTTPS

Install Nginx and Certbot on the host, then use the bootstrap configuration before a certificate exists:

```bash
sudo mkdir -p /var/www/certbot
sudo cp deploy/nginx/cr-1phillipines.com.bootstrap.conf /etc/nginx/sites-available/cr-1phillipines.com
sudo ln -s /etc/nginx/sites-available/cr-1phillipines.com /etc/nginx/sites-enabled/cr-1phillipines.com
sudo nginx -t
sudo systemctl reload nginx
sudo certbot certonly --webroot -w /var/www/certbot -d cr-1phillipines.com -d www.cr-1phillipines.com
```

After the certificate is issued, install the HTTPS configuration:

```bash
sudo cp deploy/nginx/cr-1phillipines.com.conf /etc/nginx/sites-available/cr-1phillipines.com
sudo nginx -t
sudo systemctl reload nginx
sudo certbot renew --dry-run
```

Verify the apex domain, `www` redirect, TLS, form submission, internal notification, and visitor confirmation before considering the release complete.

## GitHub Actions Workflow

The workflow in `.github/workflows/docker-deploy.yml` runs on pushes and pull requests to `main`.

It verifies:

- `npm ci`
- `npm run build`
- `docker build`

## Optional VPS Deploy From GitHub Actions

To enable the manual deploy job, add these GitHub repository secrets:

```text
VPS_HOST=srv1742945.hstgr.cloud
VPS_USER=your-vps-ssh-user
VPS_SSH_KEY=your-private-ssh-key
VPS_PORT=22
VPS_APP_PATH=/path/to/7powermotors
```

Then open GitHub Actions, run **Docker Build and Deploy**, and set `deploy_to_vps` to `true`. The server-side `.env`, Nginx configuration, DNS, and certificate are deliberately not stored in GitHub.
