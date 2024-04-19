build:
	npx webpack

install:
	npm ci

lint:
	npx eslint .
	npx stylelint statics/styles/**.css

start:
	node app/bin/index.js

deploy:
	ansible-playbook ./ansible/playbooks/deploy.yml -i ./ansible/hosts.ini -l webservers --vault-password-file ansible/vault-password-file

test-deploy:
	ansible-playbook ./ansible/playbooks/deploy.yml -i ./ansible/hosts.ini -l testserver --vault-password-file ansible/vault-password-file

install-ansible-roles:
	ansible-galaxy install -r ansible/requirements.yml

edit-env:
	ansible-vault edit ansible/files/.env.vault --vault-password-file ansible/vault-password-file