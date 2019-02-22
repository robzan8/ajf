workspace(name = "ajf")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Add NodeJS rules (explicitly used for sass bundle rules)
http_archive(
  name = "build_bazel_rules_nodejs",
  url = "https://github.com/bazelbuild/rules_nodejs/archive/0.16.5.zip",
  strip_prefix = "rules_nodejs-0.16.5",
)

# Add TypeScript rules
http_archive(
  name = "build_bazel_rules_typescript",
  url = "https://github.com/bazelbuild/rules_typescript/archive/2e761b53ca465a140c4a265cb80887e7bcf61eb9.zip",
  strip_prefix = "rules_typescript-2e761b53ca465a140c4a265cb80887e7bcf61eb9",
)

# Add Angular source and Bazel rules.
http_archive(
  name = "angular",
  url = "https://github.com/angular/angular/archive/7.2.1.zip",
  strip_prefix = "angular-7.2.1",
)

http_archive(
  name = "angular_material",
  url = "https://github.com/angular/material2/archive/085bbb78bc089e15092269d454e4fa44cc965f8e.zip",
  strip_prefix = "material2-085bbb78bc089e15092269d454e4fa44cc965f8e",
)

# Add RxJS as repository because those are needed in order to build Angular from source.
# Also we cannot refer to the RxJS version from the node modules because self-managed
# node modules are not guaranteed to be installed.
# TODO(gmagolan): remove this once rxjs ships with an named UMD bundle and we
# are no longer building it from source.
http_archive(
  name = "rxjs",
  url = "https://registry.yarnpkg.com/rxjs/-/rxjs-6.3.3.tgz",
  strip_prefix = "package/src",
  sha256 = "72b0b4e517f43358f554c125e40e39f67688cd2738a8998b4a266981ed32f403",
)

http_archive(
  name = "ngx_translate_core",
  url = "https://github.com/gnucoop/core/archive/23bf3e5eaa6a2aac24a9e709821f636483e070aa.zip",
  strip_prefix = "core-23bf3e5eaa6a2aac24a9e709821f636483e070aa/projects/ngx-translate/core/src",
  build_file="//tools/build_files/ngx-translate-core:BUILD.bazel.ngxtc",
  workspace_file="//tools/build_files/ngx-translate-core:WORKSPACE.ngxtc"
)

http_archive(
  name = "ionic_angular",
  url = "https://github.com/ionic-team/ionic/archive/v4.0.2.zip",
  strip_prefix = "ionic-4.0.2/angular/src",
  build_file="//tools/build_files/ionic:BUILD.bazel.ionic",
  workspace_file="//tools/build_files/ionic:WORKSPACE.ionic",
  sha256="d0476ac06327e2230bff0570f6fe6b81002fb6917bcef9405604a72a7abc9f99"
)

http_archive(
  name = "ionic_selectable",
  url = "https://github.com/gnucoop/ionic-selectable/archive/2e2e32baacca01d72dfff22647c37917d4eeb73a.zip",
  strip_prefix = "ionic-selectable-2e2e32baacca01d72dfff22647c37917d4eeb73a",
  build_file="//tools/build_files/ionic-selectable:BUILD.bazel.ionic-selectable",
  workspace_file="//tools/build_files/ionic-selectable:WORKSPACE.ionic-selectable"
)

http_archive(
  name = "ngx_color_picker",
  url = "https://github.com/zefoy/ngx-color-picker/archive/v7.3.0.zip",
  strip_prefix = "ngx-color-picker-7.3.0",
  build_file="//tools/build_files/ngx-color-picker:BUILD.bazel.ngx-color-picker",
  workspace_file="//tools/build_files/ngx-color-picker:WORKSPACE.ngx-color-picker"
)

# We need to create a local repository called "npm" because currently Angular Material
# stores all of it's NPM dependencies in the "@matdeps" repository. This is necessary because
# we don't want to reserve the "npm" repository that is commonly used by downstream projects.
# Since we still need the "npm" repository in order to use the Angular or TypeScript Bazel
# rules, we create a local repository that is just defined in **this** workspace and is not
# being shipped to downstream projects. This can be removed once downstream projects can
# consume Angular Material completely from NPM.
# TODO(devversion): remove once Angular Material can be consumed from NPM with Bazel.
local_repository(
  name = "npm",
  path = "tools/npm-workspace"
)

# Add sass rules
http_archive(
  name = "io_bazel_rules_sass",
  url = "https://github.com/bazelbuild/rules_sass/archive/1.16.1.zip",
  strip_prefix = "rules_sass-1.16.1",
)

# Since we are explitly fetching @build_bazel_rules_typescript, we should explicitly ask for
# its transitive dependencies in case those haven't been fetched yet.
load("@build_bazel_rules_typescript//:package.bzl", "rules_typescript_dependencies")
rules_typescript_dependencies()

# Since we are explitly fetching @build_bazel_rules_nodejs, we should explicitly ask for
# its transitive dependencies in case those haven't been fetched yet.
load("@build_bazel_rules_nodejs//:package.bzl", "rules_nodejs_dependencies")
rules_nodejs_dependencies()

# Fetch transitive dependencies which are needed by the Angular build targets.
load("@angular//packages/bazel:package.bzl", "rules_angular_dependencies")
rules_angular_dependencies()

# Fetch transitive dependencies which are needed to use the Sass rules.
load("@io_bazel_rules_sass//:package.bzl", "rules_sass_dependencies")
rules_sass_dependencies()

load("@build_bazel_rules_nodejs//:defs.bzl", "check_bazel_version", "node_repositories")

# The minimum bazel version to use with this repo is 0.18.0
check_bazel_version("0.18.0")

node_repositories(
  # For deterministic builds, specify explicit NodeJS and Yarn versions. Keep the Yarn version
  # in sync with the version of Travis.
  node_version = "10.13.0",
  yarn_version = "1.12.1",
)

# Setup TypeScript Bazel workspace
load("@build_bazel_rules_typescript//:defs.bzl", "ts_setup_workspace")
ts_setup_workspace()

# Setup the Sass rule repositories.
load("@io_bazel_rules_sass//:defs.bzl", "sass_repositories")
sass_repositories()

# Setup Angular workspace for building (Bazel managed node modules)
load("@angular//:index.bzl", "ng_setup_workspace")
ng_setup_workspace()

load("@angular_material//:index.bzl", "angular_material_setup_workspace")
angular_material_setup_workspace()

load("@ajf//:index.bzl", "ajf_setup_workspace")
ajf_setup_workspace()

# Setup Go toolchain (required for Bazel web testing rules)
load("@io_bazel_rules_go//go:def.bzl", "go_rules_dependencies", "go_register_toolchains")
go_rules_dependencies()
go_register_toolchains()

# Setup web testing. We need to setup a browser because the web testing rules for TypeScript need
# a reference to a registered browser (ideally that's a hermetic version of a browser)
load("@io_bazel_rules_webtesting//web:repositories.bzl", "browser_repositories",
    "web_test_repositories")

web_test_repositories()
browser_repositories(
  chromium = True,
)