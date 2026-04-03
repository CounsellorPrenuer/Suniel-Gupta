import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'bc4fmw79',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: 'sk21D5vLyQG1XHK6xRLizValrgj1uPXjLvcocshRgWGVFjMY4YZirDQIT7NkSnzf6idkGUas8GbAeeggRKsHCp4k3FQrOyXUx2ptkgBKEyuuShf37CDxrIPWjeL6Ew3z9u5SIxduw9OMv2lfpeuBFzFVi5yPxyewOjqPNVZx2OCX4UrmO0fz',
  useCdn: false,
});

async function updateSanity() {
  console.log('Fetching documents...');
  const homepage = await client.fetch('*[_type == "homepage"][0]');
  const about = await client.fetch('*[_type == "about"][0]');

  if (homepage) {
    console.log('Updating homepage stats...');
    const newStats = (homepage.stats || []).map(s => ({
      ...s,
      value: s.value.replace(/\s*plus\s*/gi, '+').trim()
    }));
    await client.patch(homepage._id).set({ stats: newStats }).commit();
    console.log('Homepage updated.');
  } else {
    console.log('No homepage found to update.');
  }

  if (about) {
    console.log('Updating about title...');
    let newTitle = about.title || '';
    if (newTitle === 'Hi, I’m Suniel Guptaa') {
      newTitle = 'Hi, I’m Suniel Guptaa.';
    }
    
    console.log('Updating about description blocks...');
    const newDescription = (about.description || []).map(block => {
      if (block._type === 'block' && block.children) {
        block.children = block.children.map(child => {
          if (child._type === 'span' && child.text.includes('What Next?')) {
             // Replace with proper case and italics (em mark)
             let text = child.text.replace(/What Next\? Journey to a Successful Career/gi, 'What Next? Journey To A Successful Career');
             return { ...child, text, marks: [...(child.marks || []), 'em'] };
          }
          return child;
        });
      }
      return block;
    });

    await client.patch(about._id).set({ 
      title: newTitle,
      description: newDescription
    }).commit();
    console.log('About updated.');
  }

  console.log('Done.');
}

updateSanity().catch(console.error);
