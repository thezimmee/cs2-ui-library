# Code Setup - Utah/Windows Developers

## Setup instructions

These are instructions for developers to get set up to run and work in the CS2 code from a Windows machine with Visual Studio.

- Download and install Git: https://git-scm.com/download
- Install the GitHub Visual Studio extension: https://visualstudio.github.com/
    - ~~Or go to Visual Studio extensions and search for GitHub Extension.~~ _Edit_: actually I tried this first and it didn't seem to work. I then installed it from the website and then I could see the GitHub option in the Team Explorer.
- Go to Team Explorer. Click the green "Connect" icon and you should see the option to log in to GitHub. Log in.
    - You may need to disconnect from TFS and go to Tools | Options | Source Control | Plug-in Selection and switch to Git
- Click the Clone option and clone DS-Admin-v2.75, DS-Enrollment-v2.75, DS-WebOffice-v2.75.
    - The other repos (DS-API-V2.75 and DS-Weboffice-Material-Design-V2.75) are no longer used.
- The API solution is in Visual Studio Team Services at $/CloudSpark2/API.
- The website npm script uses the 'sh' command which isn't available on Windows by default. Add the git bin directory to your path
    - WinKey+Pause / Change settings / Advanced / Environment Variables / Add "C:\Git\bin" (or whatever the Git location on your computer is--you may want to use the Browse feature) to PATH
- Open a command line window and run this command: npm -g install grunt-cli bower
- Website
    - The Enrollment site has a branch for each client. You can switch branches in VisualStudio to the site you want to work in. 
    - When you switch to a different branch or when you clone a repo for the first time, it overwrites your files on disk so you need to run these commands
        - npm install
        - bower install
- Open the website with File | Open | Web Site and then select the src folder. **Note: This is important. If you do not open the sites this way, Resharper will most likely crash trying to read the files in the other folders.**

## Development commands

From the folder of the project you are working on. There are a couple commands that can be used.

- grunt watch
    - This generates development versions of the built files. 
    - It cleans up any "grunt" files.
    - Then, it opens a browser to a local browserwatch web server page of your application. 
    - Any changes made to src files are automatically compiled and the browser is refreshed. The files built from this command are not appropriate to commit. They are just for local testing and development.
    - If you look at the grunt file that Tyson created you can see that it creates mini web servers on different ports for the different branches. By default it opens Wakaya Office, but you can pass in parameters to specify what you want. Ex: grunt watch --client=divvee
- grunt
    - This command generates the versions of the built files for release. These are the checksumed concatenated CSS/JS files that are rolled to the web servers.
    - It cleans up any "grunt watch" files.
    - This command can be used to prepare the output files for checkin.
    - When running the command it should delete the old versions of the disco-xxx bundle files, create new ones, and update the index.html to point to the new ones.

## Running V275 Admin locally

V275 Admin is different from the Office site.

- Pull the latest code.
- Don't run grunt watch.
- Find the code in app.js that kinda looks like this and make line 70 look exactly like this:

    ```js
        var urlForV3 = "";
        if (domain !-- "localhost") {

            urlForV3 = window.location.protocol + "//" + window.location.host.replace("admin2", 'admin') + '/#/';
        }
        else {
            urlForV3 = 'http://' + domain + ':23101/index.html#/';
        }


        return urlForV3;
        // return urlForV3;
    ```

- In IIS, add a new site. Do not give it a hostname, but give it a physical path of "[Your V275 code folder]\DS-Admin-v2.75\build\" and a port of 23101.
- Download this archive: https://drive.google.com/a/virtuosobranding.com/file/d/0B6gT7wMrloDfM1VzOWZSNDN1MWs/view?usp=sharing
- Unpack the archive and use the files within to overwrite the files in "[Your V275 code folder]\DS-Admin-v2.75\build\".
- Visit http://localhost:23101/index.html#/Login
- You should see a login screen.
- If you need to test different clients, use port 23101 for Wakaya, port 23201 for Divvee, and port 23301 for Sunera.
- Don't use grunt for anything. Change the code in DS-Admin-v2.75\src\ and when you want to see your changes, copy the src\ folder to DS-Admin-v2.75\build\.