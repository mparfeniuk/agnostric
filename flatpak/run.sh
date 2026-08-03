#!/bin/sh
exec zypak-wrapper.sh /app/agnostric/agnostric \
  --ozone-platform-hint=auto \
  --disable-features=FallbackToSWIfGLES3NotSupported \
  "$@"
