module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")

    uglify:
      build:
        src: "dist/dom.js"
        dest: "dist/dom.min.js"

    coffee:
      specs:
        src: "spec/dom_spec.coffee"
        dest: "spec/js/dom_spec.js"

    browserify:
      build:
        src: "src/**/*.coffee"
        dest: "dist/dom.js"
        options:
          transform: ["coffeeify"]

    jasmine:
      build:
        src: "dist/dom.js"
        options:
          specs: "spec/js/dom_spec.js"
          vendor: [
            "node_modules/jasmine-jquery/vendor/jquery/jquery.js"
            "node_modules/jasmine-jquery/lib/jasmine-jquery.js"
          ]

    compare_size:
      files: [
        "dist/dom.js"
        "dist/dom.min.js"
      ]
      options:
        compress:
          gz: (contents) ->
            require("gzip-js").zip(contents, {}).length

    concat:
      options:
        stripBanners: true
        banner: "// <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy.mm.dd') %>\n\n\n"
        separator: "\n\n\n// -----\n\n\n"

    watch:
      options:
        livereload: true

      core:
        files: "src/**/*.coffee"
        tasks: [
          "browserify"
          "uglify"
        ]
        options:
          spawn: false

      specs:
        files: "spec/**/*.coffee"
        tasks: [
          "coffee:specs"
          "jasmine"
        ]
        options:
          spawn: false

  # 2. TASKS
  require("load-grunt-tasks")(grunt)

  # 3. PERFORM
  grunt.registerTask "default", [
    "browserify"
    "coffee"
    "uglify"
    "compare_size"
  ]

  grunt.registerTask "scripts", [
    "browserify"
    "coffee"
    "uglify"
    "jasmine"
    "compare_size"
  ]

  grunt.registerTask "spec", [
    "browserify"
    "coffee"
    "jasmine"
  ]
