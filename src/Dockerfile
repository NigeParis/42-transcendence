# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: maiboyer <maiboyer@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2025/07/28 16:33:09 by maiboyer          #+#    #+#              #
#    Updated: 2025/07/28 17:46:49 by maiboyer         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# this file will be used to build everything at once
# then all the other Dockerfiles will just copy from this one...
#
# it'll always be tagged as `ft_transcendance_global`
# this is VERY UGLY
# I didn't find really a lot of other ways to do this thought...
# so yeah have mercy :P

FROM node:24-alpine

RUN apk add python3;

COPY ./ /src/
WORKDIR /src

RUN npm run install-all;
RUN npm run build;
