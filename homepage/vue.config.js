module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      overrideEndpoint: true,
      endpoint: 'http://191-Gamechanger.s3-website.us-west-2.amazonaws.com',
      region: 'us-west-2',
      bucket: 'Gamechanger',
      createBucket: false,
      staticHosting: true,
      staticIndexPage: '(index.html)',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: true,
      pwaFiles: 'index.html,service-worker.js,manifest.json',
      enableCloudfront: false,
      pluginVersion: '4.0.0-rc3',
      uploadConcurrency: 5
    }
  }
}
