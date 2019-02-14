cd ${CI_CD_PROJ}
ls
tar xvf secrets.tar 
echo "$(cat deploy.pub)" >> ${HOME}/.ssh/id_rsa
echo "$(cat known_hosts)" >> ${HOME}/.ssh/known_hosts

ssh-add ${HOME}/.ssh/id_rsa
rm deploy.pub
rm known_hosts
rm secrets.tar
ssh root@${NODE1} << 'ENDSSH'
ls
ENDSSH