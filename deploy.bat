@echo off
echo Conectando-se ao servidor...
ssh agendoaqui@agendoaqui.infotech.app.br "cd htdocs && cd agendoaqui.infotech.app.br && git pull && npm install --force && npm run build"