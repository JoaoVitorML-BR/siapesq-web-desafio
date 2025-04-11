#!/bin/bash

print_color() {
    local color_code=$1
    local message=$2
    echo -e "\033[${color_code}m${message}\033[0m"
}

print_green() {
    print_color "0;32" "$1"
}

print_yellow() {
    print_color "0;33" "$1"
}

print_red() {
    print_color "0;31" "$1"
}

print_green "
       ____ ___    _    ____  _____ ____   ___        
      / ___|_ _|  / \  |  _ \| ____/ ___| / _ \       
      \___ \| |  / _ \ | |_) |  _| \___ \| | | |      
       ___) | | / ___ \|  __/| |___ ___) | |_| |      
     _|____/_/\/|/___\_\_|   |_____|____/_\__\_\____  
    | |/ _ \|/\/ / _ \  \ \   / /_ _|_   _/ _ \|  _ \ 
 _  | | | | |/_\| | | |  \ \ / / | |  | || | | | |_) |
| |_| | |_| / _ \ |_| |   \ V /  | |  | || |_| |  _ < 
 \___/ \___/_/ \_\___/     \_/  |___| |_| \___/|_| \_\                                       
"

print_yellow "Verificando o ambiente..."

print_red "Atenção às mensagens de erro!"

export $(grep -v '^#' .env | xargs)

# Função para verificar comandos disponíveis
check_command() {
    if ! command -v "$1" &> /dev/null; then
        print_red "Erro: '$1' não está instalado."
        exit 1
    fi
}

# Verificar comandos necessários
for cmd in git npm docker docker-compose curl; do
    check_command "$cmd"
done

# Atualizar repositório
print_yellow "Atualizando repositório Git..."
if ! git pull; then
    print_red "Erro ao atualizar repositório!"
    exit 1
fi

# Instalar dependências
print_yellow "Instalando dependências NPM..."
if ! npm install; then
    print_red "Erro ao instalar dependências NPM!"
    exit 1
fi

# Corrigir vulnerabilidades
print_yellow "Verificando vulnerabilidades..."
npm audit fix --force

# Subir containers Docker
print_yellow "Iniciando containers Docker..."
if ! docker-compose up --build -d; then
    print_red "Erro ao iniciar containers Docker!"
    exit 1
fi

print_yellow "Aguardando inicialização dos serviços..."
sleep 3

print_yellow "Aguardando inicialização do banco de dados..."
until docker exec desafio-siapesq-backend-db-1 mysqladmin ping -h "127.0.0.1" --silent; do
    print_yellow "Aguardando banco de dados ficar pronto..."
    sleep 3
done

# Verificar saúde da aplicação
print_yellow "Verificando saúde da aplicação..."
max_retries=10
retry_count=0
url="http://localhost:3000"

until curl -s "$url" > /dev/null; do
    retry_count=$((retry_count + 1))
    if [ $retry_count -ge $max_retries ]; then
        print_red "A aplicação não respondeu após $max_retries tentativas."
        exit 1
    fi
    print_yellow "[$retry_count/$max_retries] Aguardando aplicação responder em $url..."
    sleep 3
done

print_green "
 ____                                 _             _           _ _ 
/ ___|  ___ _ ____   _____ _ __   ___| |_ __ _ _ __| |_ ___  __| | |
\___ \ / _ \ '__\ \ / / _ \ '__| / __| __/ _ | '__| __/ _ \/ _ | |
 ___) |  __/  |   \ V /  __ / |   \__ \ || (_| | |  | ||  __/ (_| |_|
|____/ \___|_|    \_/ \___|__|   |___/\__\__,_|_|   \__\___|\__,_(_)
"

docker-compose logs -
