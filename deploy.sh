cd ${CI_CD_PROJ};
# just trying to see the available files and folders
ls;
# Can't encrypt multiple files: https://docs.travis-ci.com/user/encrypting-files#Encrypting-multiple-files
tar xvf secrets.tar; 

chmod 600 deploy_key;
echo "$(cat deploy_key)" >> ${HOME}/.ssh/id_rsa;
echo "$(cat known_hosts)" >> ${HOME}/.ssh/known_hosts;

# Add permissions to the key
chmod 600 ${HOME}/.ssh/id_rsa;

eval "$(ssh-agent -s)";
# Add the key
ssh-add ${HOME}/.ssh/id_rsa;

# Remove all of the secret files
rm deploy_key;
rm known_hosts;
rm secrets.tar;
# ENDSSH is a marker to let us keep running commands until it reaches the marker
ssh root@${NODE1} << 'ENDSSH'
ls
ENDSSH