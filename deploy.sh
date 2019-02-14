tar xvf secrets.tar; 
echo "$(cat deploy.pub)" >> ${HOME}/.ssh/id_rsa.pub
echo "$(cat known_hosts)" >> ${HOME}/.ssh/known_hosts
rm deploy.pub; 
rm known_hosts;
rm secrets.tar;
ssh root@${NODE1} << 'ENDSSH';
ls; 
ENDSSH; 