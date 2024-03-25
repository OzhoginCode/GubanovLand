build:
	npx webpack

install:
	npm ci

lint:
	npx eslint .

start:
	node app/bin/index.js

deploy:
	ansible-playbook ./ansible/playbooks/deploy.yml -i hosts.ini -l webservers

test-deploy:
	ansible-playbook ./ansible/playbooks/deploy.yml -i ./ansible/hosts.ini -l testserver

install-ansible-roles:
	ansible-galaxy install -r ansible/requirements.yml