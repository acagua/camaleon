# Camaleon

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

**Edit a file, create a new file, and clone from Bitbucket in under 2 minutes**

When you're done, you can delete the content in this README and update the file with details for others getting started with your repository.

*We recommend that you open this README in another tab as you perform the tasks below. You can [watch our video](https://youtu.be/0ocf7u76WSo) for a full demo of all the steps in this tutorial. Open the video in a new tab to avoid leaving Bitbucket.*

---

## Edit a file

You’ll start by editing this README file to learn how to edit a file in Bitbucket.

1. Click **Source** on the left side.
2. Click the README.md link from the list of files.
3. Click the **Edit** button.
4. Delete the following text: *Delete this line to make a change to the README from Bitbucket.*
5. After making your change, click **Commit** and then **Commit** again in the dialog. The commit page will open and you’ll see the change you just made.
6. Go back to the **Source** page.

---

## Create a file

Next, you’ll add a new file to this repository.

1. Click the **New file** button at the top of the **Source** page.
2. Give the file a filename of **contributors.txt**.
3. Enter your name in the empty file space.
4. Click **Commit** and then **Commit** again in the dialog.
5. Go back to the **Source** page.

Before you move on, go ahead and explore the repository. You've already seen the **Source** page, but check out the **Commits**, **Branches**, and **Settings** pages.

---

## Clone a repository

Use these steps to clone from SourceTree, our client for using the repository command-line free. Cloning allows you to work on your files locally. If you don't yet have SourceTree, [download and install first](https://www.sourcetreeapp.com/). If you prefer to clone from the command line, see [Clone a repository](https://confluence.atlassian.com/x/4whODQ).

1. You’ll see the clone button under the **Source** heading. Click that button.
2. Now click **Check out in SourceTree**. You may need to create a SourceTree account or log in.
3. When you see the **Clone New** dialog in SourceTree, update the destination path and name if you’d like to and then click **Clone**.
4. Open the directory you just created to see your repository’s files.

Now that you're more familiar with your Bitbucket repository, go ahead and add a new file locally. You can [push your change back to Bitbucket with SourceTree](https://confluence.atlassian.com/x/iqyBMg), or you can [add, commit,](https://confluence.atlassian.com/x/8QhODQ) and [push from the command line](https://confluence.atlassian.com/x/NQ0zDQ).

## Ruteo del dominio:
1. Crear nuevo Hosted Zone en Route 53 para camaleon.shop. 
2. Crear 2 Record Sets (uno para www.camaleon.shop y otro para solo camaleon.shop) de Type:A, Alias:Yes, Alias Target escoger el S3 que corresponde (con o sin www). 
3. Salvar el Record
4. Guardar los registros que aparecen en el Rercord NS
5. En GoDaddy ir a Dominios y para Camaleon.shop poner DNS
6. En Nameservers actualizar / crear los registros guardados en el paso 4.

## Para Deployment en AWS:
1. Crear server.js
2. Crear carpetas y archivo server/router/api.js (para manejo de peticiones - no obligatorio)
3. ng build en el root del proyecto
4. Mantener los archivos en el root del dist sin carpetas intermediarias (o ajustar el server.js para que apunte ahí)
5. Comprimir server.js; package.json; /server; /dist

## Actualizar Angular-CLI (https://www.npmjs.com/package/@angular/cli):
1. Desinstalar Cli Global 
    a. npm uninstall -g @angular/cli
    b. npm cache verify
    c. npm install -g @angular/cli@latest
2. Desintalar Local
    a. rm -rf node_modules dist
    b. npm install --save-dev @angular/cli@latest
    c. npm install

## Error instalar módulo npm 
sudo npm i <modulo> --unsafe-perm=true --allow-root
sudo npm i bcrypt --unsafe-perm=true --allow-root

## Despliegue en EC2
1. sudo git pull origin master
2. sudo ng build
3. node server

## Instalar ambiente
1. sudo apt update
2. curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
3. sudo apt intall node npm
4. npm install -g @angular/cli

## Actualizar Angular
1. sudo ng update @angular/cli @angular/core

## Instalar n (node version manager)
1. sudo npm install n -g 
2. sudo ln -s /home/<username>/.npm-global/bin/n /usr/local/bin/n
3. sudo n --version

## Actualizar node
1. sudo npm cache clean -f 
2. sudo npm install -g n 
3. sudo n stable 
revisar versión, si no se actualiza:
4. sudo ln -sf /usr/local/n/versions/node/<xx.x.x (xx.x.x = nueva version)>/bin/node /usr/bin/node

## Actualizar npm
5. sudo npm install -g npm

## Daemon PM2 para levantar app
1. sudo pm2 delete all
2. sudo pm2 start /var/www/camaleon.shop/server.js --name="camaleon"
3. sudo pm2 save
4. sudo pm2 startup
5. copiar PATH resultante (ejemplo) sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu)
6. pm2 status

## Para mostrar nuevos servicios o ajustes (carpeta server/)
1. sudo pm2 restart app-name

## Memoria para el Build
1. free -m -> para validar si se está usando
2. df -h -> para ver disponibilidad de espacio
3. sudo fallocate -l 1G /swapfile ->1G hace referencia a lo que se va a guardar en swap
4. ls -lh /swapfile -> validar si se creó
5. sudo chmod 600 /swapfile
6. sudo mkswap /swapfile
7. sudo swapon /swapfile
8. sudo swapon -s -> para ver si quedó bien

## Activar memoria SWAP para el Build
1. sudo mkswap /swapfile
2. sudo swapon /swapfile
8. sudo swapon -s

## instalar certificado SSL
1. sudo add-apt-repository ppa:certbot/certbot
2. sudo apt install python3-certbot-nginx

## Actualizar certificado SSL opcion A
1. sudo service nginx stop
2. cd /opt/letencrypt 
3. ./letsencrypt-auto certonly --standalone --email admin@camaleon.shop -d camaleon.shop -d www.camaleon.shop
./letsencrypt-auto certonly --standalone --renew-by-default --email admin@camaleon.shop camaleon.shop -d www.camaleon.shop
4. renew and replace
5. sudo service nginx start

## Actualizar certificado SSL opcion B
1. sudo service nginx stop
2. cd /opt/letsencrypt/ && ./letsencrypt-auto 
3. empty
4. renew and replace
5. redirect
6. sudo service nginx start

## Automatic Renewal SSL: 
1. sudo service nginx stop
2. cd /opt/letencrypt 
3. ./letsencrypt-auto certonly --standalone --renew-by-default --email admin@camaleon.shop -d camaleon.shop -d www.camaleon.shop
4. ./letsencrypt-auto renew
5. sudo service nginx start

## En caso de error nginx
1. sudo pkill -f nginx
2. sudo systemctl start nginx

## Modulos
1. Lazy Load https://www.npmjs.com/package/ng-lazyload-image

## nginx config
Activar UFW
1. sudo ufw enable
2. sudo ufw allow 'Nginx Full'
3. sudo ufw allow http
4. sudo ufw allow https
5. sudo ufw allow 'OpenSSH'
6. sudo ufw allow ssh
7. Crear nuevo config file en /etc/nginx/sites-available y al terminar hacer el sudo ln -s para pasarlo /etc/nginx/sites-enable (hacer la conexion desde /)
8. Contenido config file: 
server {
    listen 80;
    listen [::]:80;
    server_name http://camaleon.shop http://www.camaleon.shop camaleon.shop www.camaleon.shop;
    root /var/www/camaleon.shop/dist;
    #root /var/www/camaleon.shop;   
    server_tokens off;
    index index.html index.htm;

    error_log /var/log/nginx/camaleon.log;

location / {
        # First attempt to server request as file, then         
        # as directory, then fall back to displaying a 404.          
        try_files $uri $uri/ /index.html =404;
    }
}
