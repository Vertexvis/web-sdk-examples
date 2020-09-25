const fs = require('fs').promises;
const rimraf = require('rimraf');
const path = require('path');
const { Command, flags } = require('@oclif/command');

class Scaffold extends Command {
  async run() {
    const {
      flags: { skipJs, skipCss },
      args: { name },
    } = this.parse(Scaffold);

    const dirName = name
      .toLowerCase()
      .replace(/[^\w\d\s-_]/g, '') // Removes any punctuation
      .replace(/[\s_]+/g, '-'); // Convert spaces and underscores to dashes
    const examplePath = path.join('examples', dirName);

    try {
      await fs.stat(examplePath);
      this.log(`Cannot create example, ${examplePath} already exists`);
    } catch (e) {
      try {
        await this.createExample(name, examplePath, { skipJs, skipCss });
        this.log(`Created example files in ${examplePath}`);
      } catch (e) {
        this.log(e.toString());
        this.exit(1);
      }
    }
  }

  async createExample(name, examplePath, options) {
    await fs.mkdir(examplePath);

    try {
      await Promise.all([
        this.createHtml(name, path.join(examplePath, 'index.html'), options),
        options.skipJs
          ? Promise.resolve()
          : this.createJs(path.join(examplePath, 'main.js'), options),
        options.skipCss
          ? Promise.resolve()
          : this.createCss(path.join(examplePath, 'styles.css'), options),
      ]);
    } catch (e) {
      await this.removeDir(examplePath);
      throw e;
    }
  }

  async removeDir(dir) {
    return new Promise((resolve, reject) => {
      rimraf(dir, (err) => (err != null ? resolve() : reject(err)));
    });
  }

  async createHtml(name, filePath, { skipJs, skipCss }) {
    const html = `
<!DOCTYPE html>
<html>
  <title>${name}</title>
  <head>
    <!-- Live reload script -->
    <script src="http://localhost:35729/livereload.js?snipver=1"></script>

    ${!skipCss && '<link rel="stylesheet" type="text/css" href="styles.css">'}
    ${!skipJs && '<script type="module" src="main.js"></script>'}
  </head>
  <body></body>
</html>`;

    await fs.writeFile(filePath, html.trimLeft());
  }

  async createJs(filePath) {
    const js = `
document.addEventListener('DOMContentLoaded', () => {
  main();
});

async function main() {
  const viewer = document.querySelector('vertex-viewer');

  // Your code here
}
`;

    await fs.writeFile(filePath, js.trimLeft());
  }

  async createCss(filePath) {
    await fs.writeFile(filePath, ''.trimLeft());
  }
}

Scaffold.usage = `create "My Example"`;

Scaffold.description = `Scaffolds an example with an HTML, CSS and JS file.`;

Scaffold.flags = {
  help: flags.help(),
  skipJs: flags.boolean({
    default: false,
    description: 'If true, skips generation of a JS file.',
  }),
  skipCss: flags.boolean({
    default: false,
    description: 'If true, skips generation of a CSS file.',
  }),
};

Scaffold.args = [
  { name: 'name', required: true, description: 'Name of the example' },
];

module.exports = Scaffold;
