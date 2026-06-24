import fs from 'fs';
import zlib from 'zlib';
import crypto from 'crypto';
import { Transform } from 'stream';

class EncryptsStream extends Transform {
    constructor(key, value) {
        super();
        this.key = key;
        this.value = value;
    }

    _transform(chunk, encoding, callback) {
        const cipher = crypto.createCipheriv(
            'aes-256-ocb',
            this.key,
            this.value,
            {
                authTagLength: 16
            }
        );

        const encrypted = Buffer.concat([
            cipher.update(chunk),
            cipher.final()
        ]);

        this.push(encrypted);
        callback();
    }
}

const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(12);

const readableStream = fs.createReadStream('text.txt');
const gzipStream = zlib.createGzip();
const encryptStream = new EncryptsStream(key, vector);
const writableStream = fs.createWriteStream('output.txt.gz.enc');

readableStream
    .pipe(gzipStream)
    .pipe(encryptStream)
    .pipe(writableStream);