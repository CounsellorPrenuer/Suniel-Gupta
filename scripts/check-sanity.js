import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'bc4fmw79',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: 'sk21D5vLyQG1XHK6xRLizValrgj1uPXjLvcocshRgWGVFjMY4YZirDQIT7NkSnzf6idkGUas8GbAeeggRKsHCp4k3FQrOyXUx2ptkgBKEyuuShf37CDxrIPWjeL6Ew3z9u5SIxduw9OMv2lfpeuBFzFVi5yPxyewOjqPNVZx2OCX4UrmO0fz',
  useCdn: false,
});

async function checkData() {
  const homepage = await client.fetch('*[_type == "homepage"][0]');
  const about = await client.fetch('*[_type == "about"][0]');
  console.log('--- HOMEPAGE ---');
  console.log(JSON.stringify(homepage, null, 2));
  console.log('--- ABOUT ---');
  console.log(JSON.stringify(about, null, 2));
}

checkData();
