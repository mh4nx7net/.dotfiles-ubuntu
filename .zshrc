# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH
#==================Export==================#
export ZSH="/home/sec/.oh-my-zsh"
ZSH_THEME="spaceship"


export ANDROID_HOME=$HOME/Android/Sdk/
export PATH=$PATH:$ANDROID_HOME/tools/
export PATH=$PATH:/opt/flutter/bin/
export PATH=$PATH:/opt/AIK-Linux-v3.3-ALL/
export PATH=$PATH:$HOME/.config/composer/vendor/bin
export PATH=~/bin:$PATH
#export PATH="/home/sec/anaconda3/bin:$PATH"
#export PATH="/opt/AIK-Linux-v3.3-ALL:$PATH"
#export PATH="$PATH:$HOME/.rvm/bin"
#NPM_CONFIG_PREFIX=~/.npm-global

#Preferred editor for local and remote sessions
#if [[ -n $SSH_CONNECTION ]]; then
#  export EDITOR='nano'
#else
#  export EDITOR='pico'
#fi


#==================ZSH Conf==================#
HYPHEN_INSENSITIVE="true"
ENABLE_CORRECTION="true"
#COMPLETION_WAITING_DOTS="true"
#DISABLE_UNTRACKED_FILES_DIRTY="true"
#HIST_STAMPS="mm/dd/yyyy"
plugins=(
  adb
#  git
#  rails
#  chruby
#  coffee
  colored-man-page
  colorize
#  copyfile
#  docker
#  heroku
#  rake
#  rbenv
#  rsync
#  rvm
#  ruby
#  ubuntu
#  yarn
)
#==================Sauce==================#
source $ZSH/oh-my-zsh.sh
#==================Command==================#
neofetch
#==================Alias==================#
alias zshconfig="nano ~/.zshrc"
alias ohmyzsh="nano ~/.oh-my-zsh"
alias re="reset"
alias del="rm-trash"
alias li="tree"
alias "\q"="exit"
alias aikrefresh="sudo chown -R sec: /opt/AIK-Linux-v3.3-ALL"
alias aikcheck="la /opt/AIK-Linux-v3.3-ALL/"
alias aikbackup="sudo bash -c 'mkdir /opt/AIK-Linux-v3.3-ALL/bkp1 ; mv /opt/AIK-Linux-v3.3-ALL/{ramdisk,split_img} /opt/AIK-Linux-v3.3-ALL/bkp1'"
alias composer="php $HOME/Projects/PhpProject/composer.phar"

#docker management control keybind
#alias doccof="docker config"      #Manage Docker configs
#alias doccon="docker container"   #Manage containers
#alias doceng="docker engine"      #Manage the docker engine
#alias docimg="docker image"       #Manage images
#alias docnet="docker network"     #Manage networks
#alias docnod="docker node"        #Manage Swarm nodes
#alias docplu="docker plugin"      #Manage plugins
#alias docsec="docker secret"      #Manage Docker secrets
#alias docser="docker service"     #Manage services
#alias docstk="docker stack"       #Manage Docker stacks
#alias docswm="docker swarm"       #Manage Swarm
#alias docsys="docker system"      #Manage Docker
#alias doctrs="docker trust"       #Manage trust on Docker images
#alias docvol="docker volume"      #Manage volumes
#alias din="docker inspect"	   #inspectmode


# added by Anaconda3 5.3.0 installer
# >>> conda init >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$(CONDA_REPORT_ERRORS=false '$HOME/anaconda3/bin/conda' shell.bash hook 2> /dev/null)"
if [ $? -eq 0 ]; then
    \eval "$__conda_setup"
else
    if [ -f "$HOME/anaconda3/etc/profile.d/conda.sh" ]; then
        . "$HOME/anaconda3/etc/profile.d/conda.sh"
        CONDA_CHANGEPS1=false conda activate base
    else
        \export PATH="$HOME/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda init <<<
