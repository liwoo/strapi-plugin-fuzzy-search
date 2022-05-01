# Strapi plugin strapi-fuzzy-search

A plugin for Strapi Headless CMS that provides the ability to add a weighted fuzzy search to any content type.

Uses [fuzzysort](https://github.com/farzher/fuzzysort) under the hood: Simple, quick and easy. No need to worry about setting up an instance for a complex search engine.

Roadmap:

- Include more fuzzysort options

## How to use

Enable the fuzzy-search plugin in the `./config/plugins.js` of your Strapi project.  

Make sure to set the appropriate permissions in the `Permissions` tab of the `Users & Permission Plugin` for the Role you want to give access to the search feature.

## Options/Config

Mandatory settings are marked with `*`.

### General Options

The plugin requires several configurations to be set in the `.config/plugins.js` file of your Strapi project to work.  

| Key            | Type             | Notes                                                |
|----------------|------------------|------------------------------------------------------|
| contentTypes*   | Array of Objects | List the content types you want to register for fuzzysort. Each object requires the `uid: string` and `modelName: string` to be set for a content type |
| whereConstraints | Object    | Manipulate the db query that queries for the entries of a model, e.g. as to only select articles that have been published. These constraints are built with the [logical operators](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/filtering.html#logical-operators) of [Strapis Query Engine API](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine-api.html)  |

### Fuzzysort Options

The `fuzzysortOptions` allow for some finetuning of fuzzysorts searching algorithm to your needs.

| Key            | Type            | Notes                                                                                                      |
|----------------|-----------------|--------------------------------------------------------------------------------------------------------------|
| characterLimit* | int (positive)  | Limits the length of characters the algorithm is searching through for any string of the content type        |
| threshold*      | int (negative)  | Sets the threshold for the score of the entries that will be returned. The lower, the "fuzzier" the results. |
| limit*          | int (positive)  | Limits the amount of entries returned from the search                                                        |
| allowTypo*      | boolean         | Whether the search algorithm should be exact (false) or not (true)                                           |
| keys*           | array of objects| Lists the fields of the models the algorithm should search `(name: string)` and a factor to weight them by `weight: int`. The higher the weight, the higher a match for a given field will be evaluated for a content type. |  


### Full Example config

```
module.exports = ({ env }) => ({
  // ...

  "fuzzy-search": {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: "api::author.author",
          modelName: "author",
          whereConstraints: {
             $and: [
               {
                 featured: true',
               },
               {
                 createdAt: { $gt: '2002-11-17T14:28:25.843Z' },
               },
             ],
           },
          fuzzysortOptions: {
            characterLimit: 300,
            threshold: -600,
            limit: 10,
            allowTypo: true,
            keys: [
              {
                name: "name",
                weight: 100,
              },
              {
                name: "description",
                weight: -100,
              },
            ],
          },
        },
        {
          uid: "api::article.article",
          modelName: "article",
          fuzzysortOptions: {
            characterLimit: 500,
            threshold: -800,
            limit: 15,
            allowTypo: false,
            keys: [
              {
                name: "title",
                weight: 200,
              },
              {
                name: "intro",
                weight: -200,
              },
            ],
          },
        },
      ],
    },
  },

  // ...
});
```

## A note on performance:

A high `characterCount`, `threshold`, `limit` and `allowTypo: true` all hamper the performance of the search algorithm. We recommend that you start out with a `characterCount: 500`, `threshold: -1000`, `limit: 15` and work your way from there. The characterCount especially can be quite delicate, so make sure to test every scenario when dialing in it's value.

