print_green() {
    echo -e "\033[0;32m$1\033[0m"
}

print_yellow(){
    echo -e "\033[0;33m$1\033[0m"
}

print_red(){
    echo -e "\033[0;31m$1\033[0m"
}

print_green ' 
       ____ ___    _    ____  _____ ____   ___        
      / ___|_ _|  / \  |  _ \| ____/ ___| / _ \       
      \___ \| |  / _ \ | |_) |  _| \___ \| | | |      
       ___) | | / ___ \|  __/| |___ ___) | |_| |      
     _|____/_/\/|/___\_\_|   |_____|____/_\__\_\____  
    | |/ _ \|/\/ / _ \  \ \   / /_ _|_   _/ _ \|  _ \ 
 _  | | | | |/_\| | | |  \ \ / / | |  | || | | | |_) |
| |_| | |_| / _ \ |_| |   \ V /  | |  | || |_| |  _ < 
 \___/ \___/_/ \_\___/     \_/  |___| |_| \___/|_| \_\                                       

'

print_yellow "wait, we are checking the environment..."

print_red "stay alert!"

git pull
if [ $? -ne 0 ]; then
    print_red "Error updating repository!"
    exit 1
fi

# Installing dependencies
print_yellow "Installing dependencies..."
npm i
sleep 3

# Fixing vulnerabilities
npm audit fix --force
sleep 3

# Up docker
docker-compose up --build -d
sleep 3

if curl -s http://localhost:3000 > /dev/null; then
    print_green "
     ____                                 _             _           _ _ 
    / ___|  ___ _ ____   _____ _ __   ___| |_ __ _ _ __| |_ ___  __| | |
    \___ \ / _ \ '__\ \ / / _ \ '__| / __| __/ _` | '__| __/ _ \/ _` | |
    ___) |  __/  |   \ V /  __ / |   \__ \ || (_| | |  | ||  __/ (_| |_|
    |____/ \___|_|    \_/ \___|__|   |___/\__\__,_|_|   \__\___|\__,_(_)
    "
else
     print_red "
     _____                           _             _   _                                            
    | ____|_ __ _ __ ___  _ __   ___| |_ __ _ _ __| |_(_)_ __   __ _   ___  ___ _ ____   _____ _ __ 
    |  _| | '__| '__/ _ \| '__| / __| __/ _` | '__| __| | '_ \ / _` | / __|/ _ \ '__\ \ / / _ \ '__|
    | |___| |  | | | (_) | |    \__ \ || (_| | |  | |_| | | | | (_| | \__ \  __/ |   \ V /  __/ |   
    |_____|_|  |_|  \___/|_|    |___/\__\__,_|_|   \__|_|_| |_|\__, | |___/\___|_|    \_/ \___|_|   
                                                            |___/                                
    "
    exit 1
fi