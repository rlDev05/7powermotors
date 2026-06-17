# Deployment

This project is ready for Hostinger VPS Docker deployment.

## Hostinger Docker Manager

Use **Compose from URL** and paste the repository URL:

```text
https://github.com/rlDev05/7powermotors.git
```

The included `docker-compose.yml` exposes the site on port `8080`:

```text
http://srv1742945.hstgr.cloud:8080
```

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

Then open GitHub Actions, run **Docker Build and Deploy**, and set `deploy_to_vps` to `true`.
