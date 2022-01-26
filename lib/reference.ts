abstract class AbstractReference {
  abstract readonly type: string;
  abstract toString(): string;
}

// sha256:abc123...
class DigestReference extends AbstractReference {
  readonly type = 'digest';
  constructor(readonly digest: string) {
    super();
  }

  toString(): string {
    return `${this.digest}`;
  }
}

// docker.io/library/ubuntu@sha256:abc123...
class CanonicalReference extends AbstractReference {
  readonly type = 'canonical';
  constructor(
    readonly domain: string,
    readonly repository: string,
    readonly digest: string
  ) {
    super();
  }

  toString(): string {
    return `${this.domain}/${this.repository}@${this.digest}`;
  }
}

// docker.io/library/ubuntu
class RepositoryReference extends AbstractReference {
  readonly type = 'repository';
  constructor(readonly domain: string, readonly repository: string) {
    super();
  }

  toString(): string {
    return `${this.domain}/${this.repository}`;
  }
}

// docker.io/library/ubuntu:latest
class TaggedReference extends AbstractReference {
  readonly type = 'tagged';
  constructor(
    readonly domain: string,
    readonly repository: string,
    readonly tag: string
  ) {
    super();
  }

  toString(): string {
    return `${this.domain}/${this.repository}:${this.tag}`;
  }
}

// docker.io/library/ubuntu:latest@sha256:abc123...
class DualReference extends AbstractReference {
  readonly type = 'dual';
  constructor(
    readonly domain: string,
    readonly repository: string,
    readonly tag: string,
    readonly digest: string
  ) {
    super();
  }

  toString(): string {
    return `${this.domain}/${this.repository}:${this.tag}@${this.digest}`;
  }
}

export type Reference =
  | DigestReference
  | CanonicalReference
  | RepositoryReference
  | TaggedReference
  | DualReference;
