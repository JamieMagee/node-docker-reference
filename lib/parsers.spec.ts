import { parseAll, parseFamiliarName, parseQualifiedName } from './parsers';

describe('parsers', () => {
  describe('parseAll', () => {
    it('should parse a familiar name with no domain, owner and tag', () => {
      const reference = parseAll('redis');

      expect(reference.toString()).toEqual('docker.io/library/redis');
    });

    it('should parse a familiar name with no domain and owner', () => {
      const reference = parseAll('redis:latest');

      expect(reference.toString()).toEqual('docker.io/library/redis:latest');
    });

    it('should parse a qualified name with tag', () => {
      const reference = parseAll('docker.io/library/redis:latest');

      expect(reference.toString()).toEqual('docker.io/library/redis:latest');
    });

    it('should parse a familiar name with digest', () => {
      const reference = parseAll(
        'redis@sha256:dbcc1c35ac38df41fd2f5e413' +
          '0b32ffdb93ebae8b3dbe638c23575912276fc9c'
      );

      expect(reference.toString()).toEqual(
        'docker.io/library/redis@sha256:dbcc1c35ac38df41' +
          'fd2f5e4130b32ffdb93ebae8b3dbe638c23575912276fc9c'
      );
    });

    it('should parse a qualified name with digest', () => {
      const reference = parseAll(
        'docker.io/library/redis@sha256:dbcc1c35ac38df41f' +
          'd2f5e4130b32ffdb93ebae8b3dbe638c23575912276fc9c'
      );

      expect(reference.toString()).toEqual(
        'docker.io/library/redis@sha256:dbcc1c35ac38df41' +
          'fd2f5e4130b32ffdb93ebae8b3dbe638c23575912276fc9c'
      );
    });

    it('should parse a familiar name with unofficial owner', () => {
      const reference = parseAll('dmcgowan/myapp');

      expect(reference.toString()).toEqual('docker.io/dmcgowan/myapp');
    });

    it('should parse a familiar name with unofficial owner and tag', () => {
      const reference = parseAll('dmcgowan/myapp:latest');

      expect(reference.toString()).toEqual('docker.io/dmcgowan/myapp:latest');
    });

    it('should parse a qualified name with unofficial owner and tag', () => {
      const reference = parseAll('docker.io/mcgowan/myapp:latest');

      expect(reference.toString()).toEqual('docker.io/mcgowan/myapp:latest');
    });

    it('should parse a familiar name with unofficial owner and digest', () => {
      const reference = parseAll(
        'dmcgowan/myapp@sha256:dbcc1c35ac38df41fd2f5' +
          'e4130b32ffdb93ebae8b3dbe638c23575912276fc9c'
      );

      expect(reference.toString()).toEqual(
        'docker.io/dmcgowan/myapp@sha256:dbcc1c35ac38df41' +
          'fd2f5e4130b32ffdb93ebae8b3dbe638c23575912276fc9c'
      );
    });

    it('should parse a qualified name with unofficial owner and digest', () => {
      const reference = parseAll(
        'docker.io/dmcgowan/myapp@sha256:dbcc1c35ac38df41' +
          'fd2f5e4130b32ffdb93ebae8b3dbe638c23575912276fc9c'
      );

      expect(reference.toString()).toEqual(
        'docker.io/dmcgowan/myapp@sha256:dbcc1c35ac38df41' +
          'fd2f5e4130b32ffdb93ebae8b3dbe638c23575912276fc9c'
      );
    });

    it('should parse an identifier name', () => {
      const reference = parseAll(
        'dbcc1c35ac38df41fd2f5e4130b32ffd' + 'b93ebae8b3dbe638c23575912276fc9c'
      );

      expect(reference.toString()).toEqual(
        'sha256:dbcc1c35ac38df41fd2f5e4130b3' +
          '2ffdb93ebae8b3dbe638c23575912276fc9c'
      );
    });

    it('should parse a digest', () => {
      const reference = parseAll(
        'sha256:dbcc1c35ac38df41fd2f5e4130b3' +
          '2ffdb93ebae8b3dbe638c23575912276fc9c'
      );

      expect(reference.toString()).toEqual(
        'sha256:dbcc1c35ac38df41fd2f5e4130b3' +
          '2ffdb93ebae8b3dbe638c23575912276fc9c'
      );
    });

    it('should parse familiar name that looks like identifier', () => {
      const reference = parseAll(
        'dbcc1c35ac38df41fd2f5e4130b32ff' + 'db93ebae8b3dbe638c23575912276fc9'
      );

      expect(reference.toString()).toEqual(
        'docker.io/library/dbcc1c35ac38df41fd2f5e' +
          '4130b32ffdb93ebae8b3dbe638c23575912276fc9'
      );
    });

    it('should parse familiar name that looks like identifier', () => {
      const reference = parseAll(
        'dbcc1c35ac38df41fd2f5e4130b32ff' + 'db93ebae8b3dbe638c23575912276fc9'
      );

      expect(reference.toString()).toEqual(
        'docker.io/library/dbcc1c35ac38df41fd2f5e' +
          '4130b32ffdb93ebae8b3dbe638c23575912276fc9'
      );
    });
  });

  describe('parseFamiliarName', () => {
    describe('should parse valid names without errors:', () => {
      it(`Valid name #1`, () => {
        parseFamiliarName('docker/docker');
      });

      it(`Valid name #2`, () => {
        parseFamiliarName('library/debian');
      });

      it(`Valid name #3`, () => {
        parseFamiliarName('debian');
      });

      it(`Valid name #4`, () => {
        parseFamiliarName('docker.io/docker/docker');
      });

      it(`Valid name #5`, () => {
        parseFamiliarName('docker.io/library/debian');
      });

      it(`Valid name #6`, () => {
        parseFamiliarName('docker.io/debian');
      });

      it(`Valid name #7`, () => {
        parseFamiliarName('index.docker.io/docker/docker');
      });

      it(`Valid name #8`, () => {
        parseFamiliarName('index.docker.io/library/debian');
      });

      it(`Valid name #9`, () => {
        parseFamiliarName('index.docker.io/debian');
      });

      it(`Valid name #10`, () => {
        parseFamiliarName('127.0.0.1:5000/docker/docker');
      });

      it(`Valid name #11`, () => {
        parseFamiliarName('127.0.0.1:5000/library/debian');
      });

      it(`Valid name #12`, () => {
        parseFamiliarName('127.0.0.1:5000/debian');
      });

      it(`Valid name #13`, () => {
        parseFamiliarName(
          'thisisthesongthatneverendsitgoesonandonandonthisisthesongthatnev'
        );
      });

      it(`Valid name #14`, () => {
        parseFamiliarName(
          'docker.io/1a3f5e7d9c1b3a5f7e9d1c3b5a7f9e1d3c5b7a9f1e3d5d7c9b1a3f5e7d9c1b3a'
        );
      });
    });

    describe('should parse invalid names without errors:', () => {
      it(`Invalid name #1`, () => {
        expect(() =>
          parseFamiliarName('https://github.com/docker/docker')
        ).toThrow();
      });

      it(`Invalid name #2`, () => {
        expect(() => parseFamiliarName('docker/Docker')).toThrow();
      });

      it(`Invalid name #3`, () => {
        expect(() => parseFamiliarName('-docker')).toThrow();
      });

      it(`Invalid name #4`, () => {
        expect(() => parseFamiliarName('-docker/docker')).toThrow();
      });

      it(`Invalid name #5`, () => {
        expect(() => parseFamiliarName('-docker.io/docker/docker')).toThrow();
      });

      it(`Invalid name #6`, () => {
        expect(() => parseFamiliarName('docker///docker')).toThrow();
      });

      it(`Invalid name #7`, () => {
        expect(() => parseFamiliarName('docker.io/docker/Docker')).toThrow();
      });

      it(`Invalid name #8`, () => {
        expect(() => parseFamiliarName('docker.io/docker///docker')).toThrow();
      });

      it(`Invalid name #9`, () => {
        expect(() =>
          parseFamiliarName(
            '1a3f5e7d9c1b3a5f7e9d1c3b5a7f9e1d3c5b7a9f1e3d5d7c9b1a3f5e7d9c1b3a'
          )
        ).toThrow();
      });
    });
  });

  describe('parseQualifiedName', () => {
    it('should parse repository only', () => {
      const reference = parseQualifiedName('test_com');

      expect(reference.type).toEqual('repository');
      expect(reference.repository).toEqual('test_com');
    });

    it('should parse tagged name', () => {
      const reference = parseQualifiedName('test.com:tag');

      expect(reference.type).toEqual('tagged');
      expect(reference.repository).toEqual('test.com');
      expect(reference.tag).toEqual('tag');
    });

    it('should parse tagged name which looks like port', () => {
      const reference = parseQualifiedName('test.com:5000');

      expect(reference.type).toEqual('tagged');
      expect(reference.repository).toEqual('test.com');
      expect(reference.tag).toEqual('5000');
    });

    it('should parse tagged name with domain', () => {
      const reference = parseQualifiedName('test.com/repo:tag');

      expect(reference.type).toEqual('tagged');
      expect(reference.domain).toEqual('test.com');
      expect(reference.repository).toEqual('repo');
      expect(reference.tag).toEqual('tag');
    });

    it('should parse repository only name with domain and port', () => {
      const reference = parseQualifiedName('test.com:5000/repo');

      expect(reference.type).toEqual('repository');
      expect(reference.domain).toEqual('test.com:5000');
      expect(reference.repository).toEqual('repo');
    });

    it('should parse tagged name with domain and port', () => {
      const reference = parseQualifiedName('test:5000/repo:tag');

      expect(reference.type).toEqual('tagged');
      expect(reference.domain).toEqual('test:5000');
      expect(reference.repository).toEqual('repo');
      expect(reference.tag).toEqual('tag');
    });

    it('should parse name with digest', () => {
      const reference = parseQualifiedName(
        'test:5000/repo@sha256:fffffffffffffffffffff' +
          'fffffffffffffffffffffffffffffffffffffffffff'
      );

      expect(reference.type).toEqual('canonical');
      expect(reference.domain).toEqual('test:5000');
      expect(reference.repository).toEqual('repo');
      expect(reference.digest).toEqual(
        'sha256:ffffffffffffffffffffffffffff' +
          'ffffffffffffffffffffffffffffffffffff'
      );
    });

    it('should parse name with digest and tag', () => {
      const reference = parseQualifiedName(
        'test:5000/repo:tag@sha256:fffffffffffffffffff' +
          'fffffffffffffffffffffffffffffffffffffffffffff'
      );

      expect(reference.type).toEqual('dual');
      expect(reference.domain).toEqual('test:5000');
      expect(reference.repository).toEqual('repo');
      expect(reference.tag).toEqual('tag');
      expect(reference.digest).toEqual(
        'sha256:ffffffffffffffffffffffffffff' +
          'ffffffffffffffffffffffffffffffffffff'
      );
    });

    it('should throw error when parsing empty name', () => {
      expect(() => parseQualifiedName('')).toThrow(
        'repository name must have at least one component'
      );
    });

    it('should throw error when parsing just a tag', () => {
      expect(() => parseQualifiedName(':justtag')).toThrow(
        'invalid reference format'
      );
    });

    it('should throw error when parsing just a digest', () => {
      expect(() =>
        parseQualifiedName(
          '@sha256:ffffffffffffffffffffffffffff' +
            'ffffffffffffffffffffffffffffffffffff'
        )
      ).toThrow('invalid reference format');
    });

    it('should throw error when parsing name with short digest', () => {
      expect(() =>
        parseQualifiedName('repo@sha256:ffffffffffffffffffffffffffffffffff')
      ).toThrow('invalid checksum digest length');
    });

    it('should throw error when parsing name with invalid digest', () => {
      expect(() =>
        parseQualifiedName(
          'validname@invaliddigest:ffffffffffffffffffff' +
            'ffffffffffffffffffffffffffffffffffffffffffff'
        )
      ).toThrow('unsupported digest algorithm');
    });

    it('should throw error when parsing name with capitals letters', () => {
      expect(() => parseQualifiedName('Uppercase:tag')).toThrow(
        'repository name must be lowercase'
      );
    });

    it('should throw error when parsing name with domain and capitals letters', () => {
      expect(() =>
        parseQualifiedName('test:5000/Uppercase/lowercase:tag')
      ).toThrow('repository name must be lowercase');
    });

    it('should not throw error when parsing name with capitals letters in the tag', () => {
      const reference = parseQualifiedName('lowercase:Uppercase');

      expect(reference.type).toEqual('tagged');
      expect(reference.repository).toEqual('lowercase');
      expect(reference.tag).toEqual('Uppercase');
    });

    it('should throw error when parsing a long name', () => {
      expect(() =>
        parseQualifiedName(`${new Array(129).fill('a').join('/')}:tag`)
      ).toThrow('repository name must not be more than 255 characters');
    });

    it('should not throw error when parsing name with over the max tag', () => {
      const reference = parseQualifiedName(
        `${new Array(128).fill('a').join('/')}` + `:tag-puts-this-over-max`
      );

      expect(reference.type).toEqual('tagged');
      expect(reference.domain).toEqual('a');
      expect(reference.repository).toEqual(new Array(127).fill('a').join('/'));
      expect(reference.tag).toEqual('tag-puts-this-over-max');
    });

    it('should throw error when parsing an invalid name', () => {
      expect(() => parseQualifiedName('aa/asdf$$^/aa')).toThrow(
        'invalid reference format'
      );
    });

    it('should parse valid name 1', () => {
      const reference = parseQualifiedName('sub-dom1.foo.com/bar/baz/quux');

      expect(reference.type).toEqual('repository');
      expect(reference.domain).toEqual('sub-dom1.foo.com');
      expect(reference.repository).toEqual('bar/baz/quux');
    });

    it('should parse valid name 2', () => {
      const reference = parseQualifiedName(
        'sub-dom1.foo.com/bar/baz/quux:some-long-tag'
      );

      expect(reference.type).toEqual('tagged');
      expect(reference.domain).toEqual('sub-dom1.foo.com');
      expect(reference.repository).toEqual('bar/baz/quux');
      expect(reference.tag).toEqual('some-long-tag');
    });

    it('should parse valid name 3', () => {
      const reference = parseQualifiedName(
        'b.gcr.io/test.example.com/my-app:test.example.com'
      );

      expect(reference.type).toEqual('tagged');
      expect(reference.domain).toEqual('b.gcr.io');
      expect(reference.repository).toEqual('test.example.com/my-app');
      expect(reference.tag).toEqual('test.example.com');
    });

    it('should parse valid name 4', () => {
      const reference = parseQualifiedName('xn--n3h.com/myimage:xn--n3h.com');

      expect(reference.type).toEqual('tagged');
      expect(reference.domain).toEqual('xn--n3h.com');
      expect(reference.repository).toEqual('myimage');
      expect(reference.tag).toEqual('xn--n3h.com');
    });

    it('should parse valid name 5', () => {
      const reference = parseQualifiedName(
        'xn--7o8h.com/myimage:xn--7o8h.com@sha512:fffffffff' +
          'ffffffffffffffffffffffffffffffffffffffffffffffffff' +
          'ffffffffffffffffffffffffffffffffffffffffffffffffff' +
          'fffffffffffffffffff'
      );

      expect(reference.type).toEqual('dual');
      expect(reference.domain).toEqual('xn--7o8h.com');
      expect(reference.repository).toEqual('myimage');
      expect(reference.tag).toEqual('xn--7o8h.com');
      expect(reference.digest).toEqual(
        'sha512:ffffffffffffffffffffffffffffffffffffffffffffff' +
          'fffffffffffffffffffffffffffffffffffffffffffffffffffff' +
          'fffffffffffffffffffffffffffff'
      );
    });

    it('should parse valid name 6', () => {
      const reference = parseQualifiedName('foo_bar.com:8080');

      expect(reference.type).toEqual('tagged');
      expect(reference.repository).toEqual('foo_bar.com');
      expect(reference.tag).toEqual('8080');
    });

    it('should parse valid name 7', () => {
      const reference = parseQualifiedName('foo/foo_bar.com:8080');

      expect(reference.type).toEqual('tagged');
      expect(reference.domain).toEqual('foo');
      expect(reference.repository).toEqual('foo_bar.com');
      expect(reference.tag).toEqual('8080');
    });
  });
});
