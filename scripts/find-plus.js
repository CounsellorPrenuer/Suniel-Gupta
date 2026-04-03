import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'bc4fmw79',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: 'sk21D5vLyQG1XHK6xRLizValrgj1uPXjLvcocshRgWGVFjMY4YZirDQIT7NkSnzf6idkGUas8GbAeeggRKsHCp4k3FQrOyXUx2ptkgBKEyuuShf37CDxrIPWjeL6Ew3z9u5SIxduw9OMv2lfpeuBFzFVi5yPxyewOjqPNVZx2OCX4UrmO0fz',
  useCdn: false,
});

async function findPlus() {
  const allDocs = await client.fetch('*[text() match "plus"]');
  console.log('--- DOCUMENTS WITH "PLUS" ---');
  console.log(JSON.stringify(allDocs, null, 2));

  const allHomePageDocs = await client.fetch('*[_type == "homepage"]');
   console.log('--- ALL HOMEPAGE DOCS ---');
  console.log(JSON.stringify(allHomePageDocs, null, 2));

  const allHeroDocs = await client.fetch('*[_type == "hero"]');
  console.log('--- ALL HERO DOCS ---');
  console.log(JSON.stringify(allHeroDocs, null, 2));
}

findPlus();
