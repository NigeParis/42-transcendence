#!/bin/sh

kibana_setup() {
	set -xe
	until curl -s -f "localhost:5601/api/status"; do
		sleep 2
	done

	curl -v -X POST "localhost:5601/api/saved_objects/index-pattern/docker-logs" \
		-H "kbn-xsrf: true" \
		-H "Content-Type: application/json" \
		-d '@/setup/docker-logs.json'
	exit 0
}
kibana_setup &
exec /usr/local/bin/kibana-docker >/dev/null
