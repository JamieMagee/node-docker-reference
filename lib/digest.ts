const { anchoredDigestRegexp } = require('./regexp');

class InvalidDigestFormatError extends Error {
  constructor() {
    super('invalid digest format');
    this.name = 'InvalidDigestFormatError';
  }
}

class UnsupportedAlgorithmError extends Error {
  constructor() {
    super('unsupported digest algorithm');
    this.name = 'UnsupportedAlgorithmError';
  }
}

class InvalidDigestLengthError extends Error {
  constructor() {
    super('invalid checksum digest length');
    this.name = 'InvalidDigestLengthError';
  }
}

const algorithmsSizes: { [key: string]: number } = {
  sha256: 32,
  sha384: 48,
  sha512: 64,
};

/**
 *
 */
function checkDigest(digest: string): boolean {
  const indexOfColon = digest.indexOf(':');
  if (
    indexOfColon < 0 ||
    indexOfColon + 1 === digest.length ||
    !anchoredDigestRegexp.test(digest)
  ) {
    throw new InvalidDigestFormatError();
  }

  const algorithm = digest.substring(0, indexOfColon);
  if (!algorithmsSizes[algorithm]) {
    throw new UnsupportedAlgorithmError();
  }

  if (algorithmsSizes[algorithm] * 2 !== digest.length - indexOfColon - 1) {
    throw new InvalidDigestLengthError();
  }

  return true;
}

export function validateDigest(digest: string) {
  checkDigest(digest);
}

export function isDigest(digest: string): boolean {
  try {
    checkDigest(digest);
    return true;
  } catch (e) {
    return false;
  }
}
