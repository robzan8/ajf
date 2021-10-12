load("//src/core:config.bzl", "CORE_ENTRYPOINTS")
load("//src/ionic:config.bzl", "IONIC_ENTRYPOINTS", "IONIC_TESTING_ENTRYPOINTS")
load("//src/material:config.bzl", "MATERIAL_ENTRYPOINTS", "MATERIAL_TESTING_ENTRYPOINTS")

# Base list of externals which should not be bundled into the APF package output.
# Note that we want to disable sorting of the externals as we manually group entries.
# buildifier: disable=unsorted-list-items
PKG_EXTERNALS = [
    # Framework packages.
    "@angular/animations",
    "@angular/cdk/coercion",
    "@angular/cdk/collections",
    "@angular/cdk/drag-drop",
    "@angular/cdk/keycodes",
    "@angular/cdk/text-field",
    "@angular/common",
    "@angular/common/http",
    "@angular/common/http/testing",
    "@angular/common/testing",
    "@angular/core",
    "@angular/core/testing",
    "@angular/forms",
    "@angular/material/autocomplete",
    "@angular/material/button",
    "@angular/material/button-toggle",
    "@angular/material/card",
    "@angular/material/checkbox",
    "@angular/material/chips",
    "@angular/material/core",
    "@angular/material/dialog",
    "@angular/material/expansion",
    "@angular/material/form-field",
    "@angular/material/grid-list",
    "@angular/material/icon",
    "@angular/material/input",
    "@angular/material/list",
    "@angular/material/menu",
    "@angular/material/radio",
    "@angular/material/select",
    "@angular/material/sidenav",
    "@angular/material/slide-toggle",
    "@angular/material/slider",
    "@angular/material/table",
    "@angular/material/tabs",
    "@angular/material/toolbar",
    "@angular/material/tooltip",
    "@angular/platform-browser",
    "@angular/platform-browser-dynamic",
    "@angular/platform-browser-dynamic/testing",
    "@angular/platform-browser/animations",
    "@angular/platform-server",
    "@angular/router",

    # Primary entry-points in the project.
    "@ajf/calendars",
    "@ajf/core",
    "@ajf/ionic",
    "@ajf/material",

    # Third-party libraries.
    "@gic/angular",
    "@gnucoop/ngx-color-picker",
    "@ionic/angular",
    "@ionic/core",
    "@ngneat/transloco",
    "@zxing/browser",
    "@zxing/library",
    "chart.js",
    "date-fns",
    "esprima",
    "leaflet",
    "numbro",
    "pdfmake/build/pdfmake",
    "pdfmake/interfaces",
    "protractor",
    "quill",
    "rxjs",
    "rxjs/operators",
    "selenium-webdriver",
    "xlsx",
]

# Creates externals for a given package and its entry-points.
def setup_entry_point_externals(packageName, entryPoints):
    PKG_EXTERNALS.extend(["@ajf/%s/%s" % (packageName, ep) for ep in entryPoints])

setup_entry_point_externals("core", CORE_ENTRYPOINTS)
setup_entry_point_externals("ionic", IONIC_ENTRYPOINTS + IONIC_TESTING_ENTRYPOINTS)
setup_entry_point_externals("material", MATERIAL_ENTRYPOINTS + MATERIAL_TESTING_ENTRYPOINTS)

# External module names in the examples package. Individual examples are grouped
# by package and component, so we add configure such entry-points as external.
setup_entry_point_externals("ajf-examples/ionic", ["calendar"])
setup_entry_point_externals("ajf-examples/material", ["calendar"])