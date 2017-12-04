const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  //
  // async initializing() {
  //   this.blueprints = await utils.getBluprints();
  // }

  prompting() {
    this.log(
      'HTML web app with html partial support\n Version ' + this.rootGeneratorVersion() + '\n',
      {'left-pad': '     '});

    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname // Default to current folder name
      },

      {
        type: 'confirm',
        name: 'performInstall',
        message: 'Would you like to install dependencies now?'
      }])
      .then((answers) => {
        if (answers.name !== this.appname) {
          this.destinationRoot(this.destinationPath(answers.name));
        }

        this.performInstall = answers.performInstall;
      });
  }

  writing() {
    this.fs.copy(
      this.templatePath('**/*'),
      this.destinationPath(),
      { globOptions: { dot: true } }
    );
  }

  install() {
    if (this.options.install || this.performInstall) {
      this.npmInstall();
    }
  }
};
