const pptxgen = require('pptxgenjs');
const path = require('path');

const html2pptx = require(path.resolve('C:/Users/itska/.gemini/antigravity/skills/pptx-official/scripts/html2pptx.js'));

async function buildDeck() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Team Synapse';
  pptx.title = 'GottaGO - Parametric Income Protection for Gig Workers';
  pptx.subject = 'Guidewire DEVTrails 2026';

  const slidesDir = path.resolve(__dirname, 'slides');

  const slideFiles = [
    'slide01-title.html',
    'slide02-problem.html',
    'slide03-solution.html',
    'slide04-why-us.html',
    'slide05-techstack.html',
    'slide06-bvp.html',
    'slide07-scalability.html',
    'slide08-architecture.html',
    'slide09-closing.html',
  ];

  for (const file of slideFiles) {
    const htmlPath = path.join(slidesDir, file);
    console.log(`Processing: ${file}...`);
    try {
      const { slide, placeholders } = await html2pptx(htmlPath, pptx);
      console.log(`  OK (${placeholders.length} placeholders)`);
    } catch (err) {
      console.error(`  ERROR in ${file}: ${err.message}`);
      if (err.message.includes('overflow')) {
        console.error('  Continuing despite overflow...');
      }
    }
  }

  const outputPath = path.resolve(__dirname, 'GottaGO-PitchDeck.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`\nDeck saved to: ${outputPath}`);
}

buildDeck().catch(console.error);
