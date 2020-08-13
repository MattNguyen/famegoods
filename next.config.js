const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    /*
    if (!isServer) {
      config.resolve.mainFields = config.resolve.mainFields || [];
      config.resolve.mainFields.push("browser");

      config.mainFields = config.mainFields || [];
      config.mainFields.push("browser");
    }*/
    // config.externals = config.externals || [];
    // config.externals.push("browser");
    // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    // if (config.resolve.mainFields.indexOf("browser") === -1) {
    config.resolve.alias["https"] = false; // "https-browserify";
    config.resolve.alias["http"] = false; // "http-browserify";
    // } else {

    // }
    // config.resolve.mainFields = config.resolve.mainFields || [];
    // config.resolve.mainFields = ["browser", ...config.resolve.mainFields];
    config.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader",
        // Compiles Sass to CSS
        "sass-loader",
      ],
    });

    config.module.rules.push({
      test: /\.svg$/,
      loader: "svg-inline-loader",
    });

    // config.plugins.push("inline-react-svg");

    console.log("config", config);
    // console.log(JSON.stringify(config.resolve));

    config.resolve.alias.string_decoder = false; // "string_decoder";
    config.resolve.alias["geturl"] = "browser-geturl";
    //}

    // Important: return the modified config
    return config;
  },
});
