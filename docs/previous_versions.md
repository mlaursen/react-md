# Previous Versions

Here are the steps for creating a "backup" or a deployment for a previous version:

## Configure DNS Settings

Start by configuring the DNS settings with my domain manager to allow the
`v{version}` host. Currently it is through Squarespace at
[DNS Settings](https://account.squarespace.com/domains/managed/react-md.dev/dns/dns-settings).

- Host: v{version}
- Type: A
- Priority: -
- TTL: 1h
- IP Address: Copy/paste the same as others

## Create a Vercel Deployment

Next, create a `support/v{version}` branch, push to Github, and login to Vercel.

- Add the new version to the [domains](https://vercel.com/mikkel-laursens-projects/react-md-i25l/settings/domains):
  - Domain: `v{version}.react-md.dev`
  - Redirect to: `No Redirect`
  - Environment: `Preview`
  - Git Branch: `support/v{version}`
- Update the [build and deployment](https://vercel.com/mikkel-laursens-projects/react-md-i25l/settings/build-and-deployment)
  - v5 and before settings:
    - Build Command: `yarn build-website`
    - Output Directory: `./packages/documentation/.next`
    - Install Command: `yarn && yarn setup`
    - Root Directory: `-`
  - v6:
    - Build Command: `cd ../../ && pnpm build --filter=docs^... && pnpm build --filter docs`
    - Root Directory: `apps/docs`
    - Include files outside the root directory in the Build Step: ✅
- Find the `support/v{version}` deployment and `Redeploy`
- 🎉 The website should be available in about 1h when the DNS records update
