// Common
const gulp = require('gulp');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const globSync = require('glob').sync;
// Base paths
const srcBase = './srcImg';
const distBase = './distImg';
// Paths
const paths = {
    srcBase: srcBase,
    distBase: distBase,
    src: {
        img: `${srcBase}/**/*.*`,
    },
    dist: {
        img: `${distBase}/`,
    },
};

// Common constants
const IMAGE_PATTERN = '**/*.{png,jpg,jpeg,gif}';

// Compression settings
const config = {
    build: {
        isOptimize: true, // Whether to optimize images
        jpgOptions: { quality: 90 },
        pngOptions: { quality: 90 },
        gifOptions: { quality: 90 },
        webpOptions: { quality: 90 },
        avifOptions: { quality: 70 },
    },
};

// Function to check if a file is a copy
const isCopyFile = (filename) => {
    const basename = path.basename(filename);
    return / copy|\scopy|\sコピー/.test(basename);
};

// Function to find image files
const findImageFiles = (dir, pattern = IMAGE_PATTERN) => {
    if (!fs.existsSync(dir)) return [];

    return globSync(`${dir}/${pattern}`, {
        ignore: ['**/*.webp', '**/*.avif'],
    }).filter((file) => !isCopyFile(file));
};

// Function to convert images to WebP and AVIF
const convertToWebPAndAVIF = async (filePath, mode = 'build', avif = true, outputDir = null) => {
    const ext = path.extname(filePath).toLowerCase();
    const baseName = path.basename(filePath, ext);
    const dirName = outputDir || path.dirname(filePath);

    if (!/\.(png|jpg|jpeg|gif)$/i.test(ext)) return;

    try {
        // Convert to WebP
        const webpPath = path.join(dirName, `${baseName}.webp`);
        if (!fs.existsSync(webpPath)) {
            await sharp(filePath).webp(config[mode].webpOptions).toFile(webpPath);
        }

        if (avif) {
            // Convert to AVIF
            const avifPath = path.join(dirName, `${baseName}.avif`);
            if (!fs.existsSync(avifPath)) {
                await sharp(filePath).avif(config[mode].avifOptions).toFile(avifPath);
            }
        }
    } catch (err) {
        console.error('\u001b[1;31m WebP/AVIF conversion error:', err);
    }
};

/**
 * Image Tasks
 */
const processImages = (destPath) => {
    console.time('\u001b[1;34m処理時間');
    const files = findImageFiles(srcBase);
    const promises = files.map(async (file) => {
        const ext = path.extname(file).toLowerCase();
        const baseName = path.basename(file, ext);
        const outputDir = path.join(destPath, path.dirname(file).replace(srcBase, ''));

        // Ensure the output directory exists
        fs.mkdirSync(outputDir, { recursive: true });

        // Compress jpg, png, jpeg
        if (/\.(jpg|jpeg|png)$/i.test(ext)) {
            const outputPath = path.join(outputDir, `${baseName}${ext}`);
            await sharp(file)
                .toFormat(ext.slice(1), config.build[`${ext.slice(1)}Options`])
                .toFile(outputPath);
        }

        // Convert to WebP and AVIF
        await convertToWebPAndAVIF(file, 'build', true, outputDir); // 第3引数がAVIF変換の真偽値です
    });
    return Promise.all(promises).then(() => {
        console.timeEnd('\u001b[1;34m処理時間');
    });
};

const imageCompression = () => processImages(paths.dist.img);

/**
 * Gulp Tasks
 */

exports.default = gulp.series(imageCompression);
