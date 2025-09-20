import TerserPlugin from 'terser-webpack-plugin'
import RemarkHtml from 'remark-html'


export default  {

  resolve: {
    extensions: ['.ts', '.js', 'wasm'],
  },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
              })
            ]
      },
      experiments: {
        outputModule: true
      },

      entry:{
        "bundle":"./src/index.js",
        "debrief":"./src/debrief.js",
        "block":"./src/block.js",
        "funnel":"./src/funnel.js",
        "consent":"./src/consent.js"

      }
      ,
      output: {
        filename: "[name].js",
        path: "/Users/ed/metacognition/wpck-test/dist/",
    library: {
      type: "module",
    },
        
      },
      module:{
        rules: [
            {
              test: /\.(png|jpe?g|gif|mov|mp3)$/i,
              use: [
                {
                  loader: 'file-loader',
                },
              ],
            },
            {
              test: /\.css$/i,
              use: ["style-loader", "css-loader"],
            },
            {
              test: /\.md$/,
              use: [
                {
                  loader: "html-loader",
                },
                {
                  loader: "remark-loader",
                  options: {
                    remarkOptions: {
                      plugins: [RemarkHtml],
                    },
                  },
                
                },
              ]
              }
          ],
      }
  };
  