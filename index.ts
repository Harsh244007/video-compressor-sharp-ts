import * as fs from 'fs';
import * as sharp from 'sharp';

const inputDirectory = 'aplus-images-backup/images';
const outputDirectory = 'aplus-images-backup/output_images';
const compressQuality = 80;

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

fs.readdir(inputDirectory, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    return;
  }

  files.forEach((file) => {
    const inputPath = `${inputDirectory}/${file}`;
    const outputPath = `${outputDirectory}/${file}`;

    sharp(inputPath)
      .jpeg({ quality: compressQuality })
      .toFile(outputPath, (err, info) => {
        if (err) {
          console.error(`Error compressing ${file}:`, err);
        } else {
          console.log(`Compressed ${file} to ${info.size} bytes`);
        }
      });
  });
});
