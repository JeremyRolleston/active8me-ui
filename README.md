# active8me-ui

First, download and install Node.js http://nodejs.org/


Lnstall the latest Cordova and Ionic command-line tools. 
	
`npm install -g cordova ionic`


Open `/etc/hosts` file on windows run notepad as administrator and open 'C:\windows\system32\drivers\hosts' add this line to bottom of the file and save.

`your-ip-address  actui.sourcefuse.com`


now open nodjs shell/terminal navigate to 

`cd active8me-ui/active8me/`

`sudo ionic serve -p 80` on windows `ionic serve -p 80`

Open `actui.sourcefuse.com` on browser.


To build ios app:-

open nodjs shell/terminal navigate to 

`cd active8me-ui/active8me/`

`ionic build ios`

This command will generate `xcode` project on `platforms\ios`. You can open xcode project and take the build(You may need help from iOS developer)





