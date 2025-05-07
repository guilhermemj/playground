const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Configuration
const ROMS_FOLDER = './input-roms';
const CHECKSUM_FOLDER = './database';
const OUTPUT_FOLDER = './validated-roms';

const CHECKSUM_CONFIG = {
  '.sfc': 'Nintendo - Super Nintendo Entertainment System.dat',
  '.smc': 'Nintendo - Super Nintendo Entertainment System.dat',
  '.gba': 'Nintendo - Game Boy Advance.dat',
  '.bin': 'Sony - PlayStation.dat',
  // Add more mappings as needed
};

// Function to calculate MD5 hash of a file
function calculateMD5(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(filePath);

    stream.on('data', data => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

// Function to read checksums from reference file
function readChecksumList(checksumFilePath) {
  const content = fs.readFileSync(checksumFilePath, 'utf8');
  const checksumMap = new Map();
  const md5ToRomInfo = new Map();

  // Split content by lines and process each line
  content.split('\n').forEach(line => {
    line = line.trim();

    // Skip empty lines and header/footer
    if (!line || line.startsWith('clrmamepro (')) return;

    // ROM information line
    if (line.startsWith('rom (')) {
      const romLine = line.substring(4).trim();
      // Extract name and md5 using regex
      const nameMatch = /name "([^"]+)"/.exec(romLine);
      const md5Match = /md5 ([A-F0-9]{32})/i.exec(romLine);

      if (nameMatch && md5Match) {
        const filename = nameMatch[1];
        const md5 = md5Match[1].toLowerCase();
        checksumMap.set(filename, md5);
        md5ToRomInfo.set(md5, filename);
      }
    }
  });

  return { checksumMap, md5ToRomInfo };
}

// Main function
async function validateFiles() {
  try {
    // Create maps to store checksums and ROM info from all dat files
    const checksumsByExtension = {};
    const md5MappingsByExtension = {};

    // Load all checksum files
    for (const [ext, fileName] of Object.entries(CHECKSUM_CONFIG)) {
      const datPath = path.join(CHECKSUM_FOLDER, fileName);

      // Check if the checksum file exists
      if (fs.existsSync(datPath)) {
        const { checksumMap, md5ToRomInfo } = readChecksumList(datPath);
        checksumsByExtension[ext] = checksumMap;
        md5MappingsByExtension[ext] = md5ToRomInfo;
      } else {
        console.warn(`Warning: Checksum file ${datPath} not found for extension ${ext}`);
      }
    }

    const results = [];
    const files = fs.readdirSync(ROMS_FOLDER);

    // Process each file
    for (const file of files) {
      const filePath = path.join(ROMS_FOLDER, file);
      const extension = path.extname(file);

      // Skip if it's a directory or if we don't have checksums for this extension
      if (fs.statSync(filePath).isDirectory() || !checksumsByExtension[extension]) continue;

      const actualMD5 = await calculateMD5(filePath);
      const expectedFileName = md5MappingsByExtension[extension].get(actualMD5);

      results.push({
        filename: file,
        md5: actualMD5,
        matches: !!expectedFileName,
        expectedFilename: expectedFileName ?? 'Unknown ROM',
      });
    }

    // Display results in a table
    console.table(results);

    return results;
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}

// Function to copy and rename validated ROMs
async function copyValidatedRoms(results) {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_FOLDER)) {
    fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
  }

  for (const result of results) {
    if (result.matches) {
      const sourceFile = path.join(ROMS_FOLDER, result.filename);
      const targetFile = path.join(OUTPUT_FOLDER, result.expectedFilename);

      try {
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`Successfully copied and renamed: ${result.filename} -> ${result.expectedFilename}`);
      } catch (error) {
        console.error(`Error copying ${result.filename}:`, error.message);
      }
    }
  }
}

// Execute validation and copying
async function main() {
  const results = await validateFiles();
  if (results.length > 0 && !process.argv.includes('--skipCopy')) {
    await copyValidatedRoms(results);
  }
}

main();
