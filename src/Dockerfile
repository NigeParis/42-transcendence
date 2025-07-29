# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: maiboyer <maiboyer@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2025/07/28 16:33:09 by maiboyer          #+#    #+#              #
#    Updated: 2025/07/29 13:54:54 by maiboyer         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# this file will be used to build everything at once
# then all the other Dockerfiles will just copy from this one...
#
# it'll always be tagged as `trans_builder`
# this is VERY UGLY
# I didn't find really a lot of other ways to do this thought...
# so yeah have mercy :P


# please do not touch this file unless you know what you are doing :)

FROM node:24-alpine

RUN apk add python3;

COPY ./ /src/
WORKDIR /src

RUN npm run install-all;
RUN npm run build;
