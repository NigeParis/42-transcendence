FROM guergeiro/pnpm:22-10-alpine as builder

ARG SERVICE

WORKDIR /build
COPY @shared/package.json                                /build/@shared/
COPY ${SERVICE}/package.json                             /build/service/
COPY tsconfig.base.json pnpm-workspace.yaml package.json /build/

RUN	pnpm install;

COPY @shared/    /build/@shared/
COPY ${SERVICE}/ /build/service/

RUN cd /build/service                                          && \
	pnpm run build:prod                                        && \
	mkdir -p /dist/@shared /dist/service                       && \
	cp /build/pnpm-workspace.yaml   /dist/pnpm-workspace.yaml  && \
	cp /build/@shared/package.json  /dist/@shared/             && \
	cp /build/service/package.json  /dist/service/             && \
	cp /build/package.json          /dist/                     && \
	cp /build/pnpm-lock.yaml        /dist/;


FROM guergeiro/pnpm:22-10-alpine

WORKDIR /src

COPY --from=builder /dist /src

RUN pnpm install --prod --frozen-lockfile;
CMD ["node", "/src/run.cjs"]

