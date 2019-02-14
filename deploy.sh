cd ${CI_CD_PROJ}
ls
tar xvf secrets.tar 

chmod 600 deploy_key
echo "$(cat deploy_key)" >> ${HOME}/.ssh/id_rsa
echo "$(cat known_hosts)" >> ${HOME}/.ssh/known_hosts

ssh-add ${HOME}/.ssh/id_rsa
rm deploy_key
rm known_hosts
rm secrets.tar
ssh root@${NODE1} << 'ENDSSH'
ls
ENDSSH