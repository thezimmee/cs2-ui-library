## Setup for CLI / macOS users

1. Make sure [node and npm](https://nodejs.org/en/download){target="_blank"} and [git](https://git-scm.com/downloads){target="_blank"} are installed. Verify installation with the following commands:

    ```bash
    node -v
    npm -v
    git --version
    ```

2. Install grunt command line tools:

    ```bash
    npm -g install grunt-cli bower
    ```

3. Clone project & install local dependencies:

    ```bash
    git clone https://github.com/wsimlm/DS-WebOffice-V2.75.git <myprojectfolder>
    cd <myprojectfolder>
    npm install
    ```

4. Run `grunt watch` to watch your files for development.

    _Note: There is also a `grunt` command, which builds the files for production. This is only useful if you want to test the build with minified files._

5. Commit and push changes with git.

## Running the `grunt watch` task

Running `grunt watch` does the following:

- Builds the files for development
- Runs a local [BrowserSync](https://www.browsersync.io/docs/){target="_blank"} server
- Watches local files and automatically rebuilds when changes are detected
- Automatically reloads your browser once the project is rebuilt

### `grunt watch` options

You can pass the following arguments to the `grunt watch` command:

#### `--client`

Default: `acn` <br/>
Options: `acn` | `wakaya` | `visi` | `divvee` | `sunera` | `modere` | `magnabilities` | `mynt` | `epicmd` | `mnetwork`

Defines which client's site will run locally. In reality this is a simpler way of choosing the `--port`.

#### `--port`

Default: `20100`

The port is what determines which client will run on your local server. For an easier method of choosing a client to run locally, use the `--client` argument.