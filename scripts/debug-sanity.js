import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'bc4fmw79',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: 'sk21D5vLyQG1XHK6xRLizValrgj1uPXjLvcocshRgWGVFjMY4YZirDQIT7NkSnzf6idkGUas8GbAeeggRKsHCp4k3FQrOyXUx2ptkgBKEyuuShf37CDxrIPWjeL6Ew3z9u5SIxduw9OMv2lfpeuBFzFVi5yPxyewOjqPNVZx2OCX4UrmO0fz',
  useCdn: false,
});

async function findInSanity() {
  const homepage = await client.fetch('*[_type == "homepage"]');
  const hero = await client.fetch('*[_type == "hero"]');
  const about = await client.fetch('*[_type == "about"]');
  const siteConfig = await client.fetch('*[_type == "siteConfig"]');
  const footer = await client.fetch('*[_type == "footer"]');
  const all = [...homepage, ...hero, ...about, ...siteConfig, ...footer];

  console.log('--- ALL RELEVANT DOCS ---');
  console.log(JSON.stringify(all, null, 2));
}

findInSanity();
