# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Docker.mk                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: maiboyer <maiboyer@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2025/06/11 18:10:26 by maiboyer          #+#    #+#              #
#    Updated: 2025/07/28 18:00:02 by maiboyer         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

BUILD_IMAGE = trans_builder

all: build
	docker compose up -d

logs:
	docker compose logs -f

down:
	docker compose down

build:
	docker build -t "$(BUILD_IMAGE)" ./src
	docker compose build

re:
	$(MAKE) -f ./Docker.mk clean
	$(MAKE) -f ./Docker.mk all

clean:
	-docker rmi "$(BUILD_IMAGE)"
	docker compose down

prune: clean
	-if ! [ -z $(shell docker ps -a -q) ] ; then \
		docker stop    $(shell docker ps -a -q); \
		docker rm      $(shell docker ps -a -q); \
	fi
	-docker image   prune -a
	-docker volume  prune
	-docker network prune
	-docker system  prune -a

